defmodule YouBetTest do
  use ExUnit.Case
  doctest YouBet

  test "minumum of 3 playres" do
    assert YouBet.minimum_players() == 3
  end
end
