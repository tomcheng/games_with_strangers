defmodule IdiomsTest do
  use ExUnit.Case

  setup do
    players = %{
      "1" => %{id: "1", name: "foo"},
      "2" => %{id: "2", name: "bar"},
      "3" => %{id: "3", name: "baz"}
    }

    %{players: players}
  end

  test "initial game state", %{players: players} do
    state =
      players
      |> Idioms.initial_state()
      |> Idioms.sanitize_state("1")

    assert state[:stage] == :set_order
    assert state[:scores] == [
      %{player: %{name: "Team A"}, score: 0},
      %{player: %{name: "Team B"}, score: 0}
    ]
  end
end
