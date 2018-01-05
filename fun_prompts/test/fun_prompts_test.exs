defmodule FunPromptsTest do
  use ExUnit.Case
  doctest FunPrompts

  setup do
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
end
