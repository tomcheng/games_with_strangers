defmodule FunPromptsTest do
  use ExUnit.Case
  doctest FunPrompts

  setup do
    :rand.seed(:exsplus, {1, 2, 3})

    players = %{
      "1" => %{id: "1", name: "foo"},
      "2" => %{id: "2", name: "bar"},
      "3" => %{id: "3", name: "baz"}
    }

    %{players: players}
  end

  test "minimum of 4 players" do
    # assert FunPrompts.minimum_players() == 4
  end

  test "gets initial state", %{players: players} do
    state =
      players
      |> FunPrompts.initial_state(%{"rounds" => 3})
      |> FunPrompts.sanitize_state("1")

    assert state[:round] == 1
    assert state[:stage] == :writing
    assert Enum.count(state[:prompts]) == 2
    assert is_number(List.first(state[:prompts])[:id])
    assert is_binary(List.first(state[:prompts])[:prompt])
  end

  test "removes prompts as you answer", %{players: players} do
    state =
      players
      |> FunPrompts.initial_state(%{"rounds" => 3})
      |> FunPrompts.play("1", "answer", %{"id" => 2, "answer" => "player 1, answer 2"}, "AAAA")
      |> FunPrompts.sanitize_state("1")

    assert Enum.count(state[:prompts]) == 1
  end

  test "shows players who haven't answered", %{players: players} do
    state =
      players
      |> FunPrompts.initial_state(%{"rounds" => 3})
      |> FunPrompts.play("1", "answer", %{"id" => 1, "answer" => "player 1, answer 1"}, "AAAA")
      |> FunPrompts.play("1", "answer", %{"id" => 2, "answer" => "player 1, answer 2"}, "AAAA")

    your_state = FunPrompts.sanitize_state(state, "1")
    others_state = FunPrompts.sanitize_state(state, "2")

    assert your_state[:awaiting_answer] == [%{id: "2", name: "bar"}, %{id: "3", name: "baz"}]
    assert others_state[:awaiting_answer] == [%{id: "3", name: "baz"}]
  end

  test "handles answering a prompt", %{players: players} do
    state =
      players
      |> FunPrompts.initial_state(%{"rounds" => 3})
      |> everyone_answer
      |> FunPrompts.sanitize_state("1")

    assert state[:round] == 1
    assert state[:stage] == :voting
    assert is_binary(state[:prompt])
    assert state[:you_answered] == false
    assert state[:you_voted] == false
    assert state[:awaiting_vote] == [%{id: "1", name: "foo"}]

    [choice_1, choice_2] = state[:choices]

    assert choice_1[:player][:id] == "2"
    assert choice_1[:your_answer] == false
    assert choice_2[:player][:id] == "3"
    assert choice_2[:your_answer] == false
  end

  test "handles a vote", %{players: players} do
    state =
      players
      |> FunPrompts.initial_state(%{"rounds" => 3})
      |> everyone_answer
      |> FunPrompts.play("1", "vote", %{"player_id" => "2"}, "AAAA")

    player_1_state = FunPrompts.sanitize_state(state, "1")
    player_2_state = FunPrompts.sanitize_state(state, "2")

    assert player_1_state[:round] == 1
    assert player_1_state[:stage] == :voting
    assert is_binary(player_1_state[:prompt])
    assert player_1_state[:you_voted] == true

    [choice_1, choice_2] = player_1_state[:choices]

    assert choice_1[:player][:id] == "2"
    assert choice_1[:votes] == [%{id: "1", name: "foo"}]

    assert choice_2[:player][:id] == "3"
    assert choice_2[:votes] == []

    assert player_2_state[:you_voted] == false
  end

  test "cannot vote twice", %{players: players} do
    state =
      players
      |> FunPrompts.initial_state(%{"rounds" => 3})
      |> everyone_answer
      |> FunPrompts.play("2", "vote", %{"player_id" => "1"}, "AAAA")
      |> FunPrompts.play("2", "vote", %{"player_id" => "1"}, "AAAA")
      |> FunPrompts.sanitize_state("1")

    [choice_1, choice_2] = state[:choices]

    assert choice_1[:player][:id] == "2"
    assert choice_1[:votes] == []

    assert choice_2[:player][:id] == "3"
    assert choice_2[:votes] == []
  end

  test "goes to next vote", %{players: players} do
    state =
      players
      |> FunPrompts.initial_state(%{"rounds" => 3})
      |> everyone_answer
      |> FunPrompts.play("2", "vote", %{"player_id" => "1"}, "AAAA")
      |> FunPrompts.play("1", "advance", nil, "AAAA")
      |> FunPrompts.sanitize_state("1")

    assert state[:round] == 1
    assert state[:stage] == :voting
    assert is_binary(state[:prompt])
    assert state[:you_voted] == false

    [choice_1, choice_2] = state[:choices]

    assert choice_1[:player][:id] == "3"
    assert choice_1[:votes] == []

    assert choice_2[:player][:id] == "1"
    assert choice_2[:votes] == []
  end

  test "shows scores after all votes are in", %{players: players} do
    state =
      players
      |> FunPrompts.initial_state(%{"rounds" => 3})
      |> everyone_answer
      |> everyone_vote
      |> FunPrompts.sanitize_state("1")

    assert state[:round] == 1
    assert state[:stage] == :show_scores

    assert state[:scores] == [
             %{player: %{id: "1", name: "foo"}, score: 200},
             %{player: %{id: "2", name: "bar"}, score: 100},
             %{player: %{id: "3", name: "baz"}, score: 0}
           ]
  end

  test "goes to next round after advancing from showing scores", %{players: players} do
    state =
      players
      |> FunPrompts.initial_state(%{"rounds" => 3})
      |> everyone_answer
      |> everyone_vote
      |> FunPrompts.play("1", "advance", nil, "AAAA")
      |> FunPrompts.sanitize_state("1")

    assert state[:round] == 2
    assert state[:stage] == :writing
    assert Enum.count(state[:prompts]) == 2
    assert is_number(List.first(state[:prompts])[:id])
    assert is_binary(List.first(state[:prompts])[:prompt])
  end

  test "scores increase in later rounds", %{players: players} do
    state =
      players
      |> FunPrompts.initial_state(%{"rounds" => 3})
      |> everyone_answer
      |> everyone_vote
      |> FunPrompts.play("1", "advance", nil, "AAAA")
      |> everyone_answer
      |> everyone_vote
      |> FunPrompts.sanitize_state("1")

    assert state[:round] == 2
    assert state[:stage] == :show_scores

    assert state[:scores] == [
             %{player: %{id: "1", name: "foo"}, score: 600},
             %{player: %{id: "2", name: "bar"}, score: 300},
             %{player: %{id: "3", name: "baz"}, score: 0}
           ]
  end

  test "ends game after 3 rounds", %{players: players} do
    state =
      players
      |> FunPrompts.initial_state(%{"rounds" => 3})
      |> everyone_answer
      |> everyone_vote
      |> FunPrompts.play("1", "advance", nil, "AAAA")
      |> everyone_answer
      |> everyone_vote
      |> FunPrompts.play("1", "advance", nil, "AAAA")
      |> everyone_answer
      |> everyone_vote
      |> FunPrompts.sanitize_state("1")

    assert state[:stage] == :end
    refute is_nil(state[:scores])
  end

  test "sets number of rounds", %{players: players} do
    state =
      players
      |> FunPrompts.initial_state(%{"rounds" => 2})
      |> everyone_answer
      |> everyone_vote
      |> FunPrompts.play("1", "advance", nil, "AAAA")
      |> everyone_answer
      |> everyone_vote
      |> FunPrompts.sanitize_state("1")

    assert state[:stage] == :end
    refute is_nil(state[:scores])
  end

  defp everyone_answer(state) do
    state
    |> FunPrompts.play("1", "answer", %{"id" => 1, "answer" => "player 1, answer 1"}, "AAAA")
    |> FunPrompts.play("1", "answer", %{"id" => 2, "answer" => "player 1, answer 2"}, "AAAA")
    |> FunPrompts.play("2", "answer", %{"id" => 2, "answer" => "player 2, answer 2"}, "AAAA")
    |> FunPrompts.play("2", "answer", %{"id" => 3, "answer" => "player 2, answer 3"}, "AAAA")
    |> FunPrompts.play("3", "answer", %{"id" => 3, "answer" => "player 3, answer 3"}, "AAAA")
    |> FunPrompts.play("3", "answer", %{"id" => 1, "answer" => "player 3, answer 1"}, "AAAA")
  end

  defp everyone_vote(state) do
    state
    |> FunPrompts.play("1", "vote", %{"player_id" => "2"}, "AAAA")
    |> FunPrompts.play("1", "advance", nil, "AAAA")
    |> FunPrompts.play("2", "vote", %{"player_id" => "1"}, "AAAA")
    |> FunPrompts.play("1", "advance", nil, "AAAA")
    |> FunPrompts.play("3", "vote", %{"player_id" => "1"}, "AAAA")
    |> FunPrompts.play("1", "advance", nil, "AAAA")
  end
end
