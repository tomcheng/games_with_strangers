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
      |> FunPrompts.initial_state
      |> FunPrompts.sanitize_state("1")

    assert state[:round] == 1
    assert state[:stage] == :writing
    assert state[:scores] == [
      %{player: %{id: "2", name: "bar"}, score: 0},
      %{player: %{id: "3", name: "baz"}, score: 0},
      %{player: %{id: "1", name: "foo"}, score: 0}
    ]
    assert Enum.count(state[:prompts]) == 2
    assert is_number(List.first(state[:prompts])[:id])
    assert is_binary(List.first(state[:prompts])[:prompt])
  end

  test "removes prompts as you answer", %{players: players} do
    state =
      players
      |> FunPrompts.initial_state
      |> FunPrompts.play("1", "answer", %{"id" => 1, "answer" => "player 1, answer 1"})
      |> FunPrompts.sanitize_state("1")

    assert Enum.count(state[:prompts]) == 1
  end

  test "shows players who haven't answered", %{players: players} do
    state =
      players
      |> FunPrompts.initial_state
      |> FunPrompts.play("1", "answer", %{"id" => 1, "answer" => "player 1, answer 1"})
      |> FunPrompts.play("1", "answer", %{"id" => 2, "answer" => "player 1, answer 2"})
    your_state = FunPrompts.sanitize_state(state, "1")
    others_state = FunPrompts.sanitize_state(state, "2")

    assert your_state[:awaiting_answer] == [%{id: "2", name: "bar"}, %{id: "3", name: "baz"}]
    assert others_state[:awaiting_answer] == [%{id: "3", name: "baz"}]
  end

  test "handles answering a prompt", %{players: players} do
    state =
      players
      |> FunPrompts.initial_state
      |> FunPrompts.play("1", "answer", %{"id" => 1, "answer" => "player 1, answer 1"})
      |> FunPrompts.play("1", "answer", %{"id" => 2, "answer" => "player 1, answer 2"})
      |> FunPrompts.play("2", "answer", %{"id" => 2, "answer" => "player 2, answer 2"})
      |> FunPrompts.play("2", "answer", %{"id" => 3, "answer" => "player 2, answer 3"})
      |> FunPrompts.play("3", "answer", %{"id" => 3, "answer" => "player 3, answer 3"})
      |> FunPrompts.play("3", "answer", %{"id" => 1, "answer" => "player 3, answer 1"})
      |> FunPrompts.sanitize_state("1")

    assert state[:round] == 1
    assert state[:stage] == :voting
    assert is_binary(state[:prompt])
    assert state[:you_answered] == true
    assert state[:you_voted] == false
    assert state[:awaiting_vote] == [%{id: "2", name: "bar"}]

    [choice_1, choice_2] = state[:choices]

    assert choice_1[:player][:id] == "3"
    assert choice_1[:your_answer] == false
    assert choice_2[:player][:id] == "1"
    assert choice_2[:your_answer] == true
  end

  test "handles a vote", %{players: players} do
    state =
      players
      |> FunPrompts.initial_state
      |> FunPrompts.play("1", "answer", %{"id" => 1, "answer" => "player 1, answer 1"})
      |> FunPrompts.play("1", "answer", %{"id" => 2, "answer" => "player 1, answer 2"})
      |> FunPrompts.play("2", "answer", %{"id" => 2, "answer" => "player 2, answer 2"})
      |> FunPrompts.play("2", "answer", %{"id" => 3, "answer" => "player 2, answer 3"})
      |> FunPrompts.play("3", "answer", %{"id" => 3, "answer" => "player 3, answer 3"})
      |> FunPrompts.play("3", "answer", %{"id" => 1, "answer" => "player 3, answer 1"})
      |> FunPrompts.play("2", "vote", %{"player_id" => "1"})

    player_1_state = FunPrompts.sanitize_state(state, "1")
    player_2_state = FunPrompts.sanitize_state(state, "2")

    assert player_1_state[:round] == 1
    assert player_1_state[:stage] == :voting
    assert is_binary(player_1_state[:prompt])
    assert player_1_state[:you_voted] == false

    [choice_1, choice_2] = player_1_state[:choices]

    assert choice_1[:player][:id] == "3"
    assert choice_1[:votes] == []

    assert choice_2[:player][:id] == "1"
    assert choice_2[:votes] == [%{id: "2", name: "bar"}]

    assert player_2_state[:you_voted] == true
  end

  test "cannot vote twice", %{players: players} do
    state =
      players
      |> FunPrompts.initial_state
      |> FunPrompts.play("1", "answer", %{"id" => 1, "answer" => "player 1, answer 1"})
      |> FunPrompts.play("1", "answer", %{"id" => 2, "answer" => "player 1, answer 2"})
      |> FunPrompts.play("2", "answer", %{"id" => 2, "answer" => "player 2, answer 2"})
      |> FunPrompts.play("2", "answer", %{"id" => 3, "answer" => "player 2, answer 3"})
      |> FunPrompts.play("3", "answer", %{"id" => 3, "answer" => "player 3, answer 3"})
      |> FunPrompts.play("3", "answer", %{"id" => 1, "answer" => "player 3, answer 1"})
      |> FunPrompts.play("2", "vote", %{"player_id" => "1"})
      |> FunPrompts.play("2", "vote", %{"player_id" => "1"})
      |> FunPrompts.sanitize_state("1")

    [choice_1, choice_2] = state[:choices]

    assert choice_1[:player][:id] == "3"
    assert choice_1[:votes] == []

    assert choice_2[:player][:id] == "1"
    assert choice_2[:votes] == [%{id: "2", name: "bar"}]
  end

  test "goes to next vote", %{players: players} do
    state =
      players
      |> FunPrompts.initial_state
      |> FunPrompts.play("1", "answer", %{"id" => 1, "answer" => "player 1, answer 1"})
      |> FunPrompts.play("1", "answer", %{"id" => 2, "answer" => "player 1, answer 2"})
      |> FunPrompts.play("2", "answer", %{"id" => 2, "answer" => "player 2, answer 2"})
      |> FunPrompts.play("2", "answer", %{"id" => 3, "answer" => "player 2, answer 3"})
      |> FunPrompts.play("3", "answer", %{"id" => 3, "answer" => "player 3, answer 3"})
      |> FunPrompts.play("3", "answer", %{"id" => 1, "answer" => "player 3, answer 1"})
      |> FunPrompts.play("2", "vote", %{"player_id" => "1"})
      |> FunPrompts.play("1", "advance", nil)
      |> FunPrompts.sanitize_state("1")

    assert state[:round] == 1
    assert state[:stage] == :voting
    assert is_binary(state[:prompt])
    assert state[:you_voted] == false

    [choice_1, choice_2] = state[:choices]

    assert choice_1[:player][:id] == "1"
    assert choice_1[:votes] == []

    assert choice_2[:player][:id] == "2"
    assert choice_2[:votes] == []
  end
end
