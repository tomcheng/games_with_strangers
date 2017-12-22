defmodule YouBetTest do
  use ExUnit.Case
  doctest YouBet

  test "minumum of 3 playres" do
    assert YouBet.minimum_players() == 3
  end

  test "initial game state" do
    players = %{
      "1": %{id: "1", name: "foo"},
      "2": %{id: "2", name: "bar"},
      "3": %{id: "3", name: "baz"}
    }
    assert YouBet.initial_state(players) == %{round: 1}
  end
end
