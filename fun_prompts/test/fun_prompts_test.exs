defmodule FunPromptsTest do
  use ExUnit.Case
  doctest FunPrompts

  setup do
    players = %{
      "1" => %{id: "1", name: "foo"},
      "2" => %{id: "2", name: "bar"}
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
      %{player: %{id: "1", name: "foo"}, score: 0}
    ]
    assert Enum.count(state[:prompts]) == 2
    assert is_number(List.first(state[:prompts])[:id])
    assert is_binary(List.first(state[:prompts])[:prompt])
  end

  test "handles answering a prompt", %{players: players} do
    state =
      players
      |> FunPrompts.initial_state
      |> FunPrompts.play("1", "answer", %{"id" => 1, "answer" => "player 1, answer 1"})
      |> FunPrompts.play("1", "answer", %{"id" => 2, "answer" => "player 1, answer 2"})
      |> FunPrompts.play("2", "answer", %{"id" => 1, "answer" => "player 2, answer 1"})
      |> FunPrompts.play("2", "answer", %{"id" => 2, "answer" => "player 2, answer 2"})
      |> FunPrompts.sanitize_state("1")

    assert state[:round] == 1
    assert state[:stage] == :voting
    assert is_binary(state[:prompt])
    assert Enum.count(state[:choices]) == 2
  end
end
