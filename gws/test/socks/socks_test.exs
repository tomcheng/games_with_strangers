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

  test "selects a sock", %{players: players} do
    initial_state = Socks.initial_state(players, %{})
    sock_to_select = hd(initial_state[:socks])

    state =
      initial_state
      |> Socks.play("1", "select_sock", %{"sock_id" => sock_to_select[:id]})
      |> Socks.sanitize_state("1")

    assert state[:selected_socks] == %{
             "1" => MapSet.new([sock_to_select[:id]]),
             "2" => MapSet.new()
           }
  end
end
