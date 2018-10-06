defmodule SocksTest do
  use ExUnit.Case
  doctest Socks

  setup do
    :rand.seed(:exsplus, {1, 2, 3})

    players = %{
      "1" => %{id: "1", name: "foo"},
      "2" => %{id: "2", name: "bar"}
    }

    %{players: players}
  end

  test "minimum of 2 players" do
    assert Socks.minimum_players() == 2
  end

  test "gets initial state", %{players: players} do
    state =
      players
      |> Socks.initial_state(%{})
      |> Socks.sanitize_state("1")

    assert state[:stage] == :guessing
    assert Enum.count(state[:socks]) == 9
  end
end
