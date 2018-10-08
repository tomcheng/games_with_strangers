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
      |> Socks.play("1", "select_sock", %{"sock_id" => sock_to_select[:id], room_code: nil})
      |> Socks.sanitize_state("1")

    assert state[:selected_socks] == %{
             "1" => [sock_to_select[:id]],
             "2" => []
           }
  end

  test "cancels a selection", %{players: players} do
    initial_state = Socks.initial_state(players, %{})
    sock_to_select = hd(initial_state[:socks])

    state =
      initial_state
      |> Socks.play("1", "select_sock", %{"sock_id" => sock_to_select[:id], room_code: nil})
      |> Socks.play("1", "cancel_selection", nil)
      |> Socks.sanitize_state("1")

    assert state[:selected_socks] == %{
             "1" => [],
             "2" => []
           }
  end

  test "getting set wrong", %{players: players} do
    initial_state = Socks.initial_state(players, %{})
    socks_to_select = Enum.take(initial_state[:socks], 3) |> Enum.map(&Map.get(&1, :id))

    state =
      initial_state
      |> Socks.play("1", "select_sock", %{
        "sock_id" => Enum.at(socks_to_select, 0),
        room_code: nil
      })
      |> Socks.play("1", "select_sock", %{
        "sock_id" => Enum.at(socks_to_select, 1),
        room_code: nil
      })
      |> Socks.play("1", "select_sock", %{
        "sock_id" => Enum.at(socks_to_select, 2),
        room_code: nil
      })
      |> Socks.sanitize_state("1")

    assert state[:set_result][:is_set] == false
    assert state[:set_result][:socks] == ["1232", "1233", "2133"]
    assert state[:selected_socks]["1"] == []
    assert state[:state] === :suspended
  end

  test "can't select when suspended", %{players: players} do
    initial_state = Socks.initial_state(players, %{})
    socks_to_select = Enum.take(initial_state[:socks], 3)

    state =
      initial_state
      |> Socks.play("1", "select_sock", %{
        "sock_id" => Enum.at(socks_to_select, 0)[:id],
        room_code: nil
      })
      |> Socks.play("1", "select_sock", %{
        "sock_id" => Enum.at(socks_to_select, 1)[:id],
        room_code: nil
      })
      |> Socks.play("1", "select_sock", %{
        "sock_id" => Enum.at(socks_to_select, 2)[:id],
        room_code: nil
      })
      |> Socks.play("1", "select_sock", %{
        "sock_id" => Enum.at(socks_to_select, 0)[:id],
        room_code: nil
      })
      |> Socks.sanitize_state("1")

    assert state[:state] === :suspended
    assert state[:selected_socks]["1"] == []
  end

  test "cancels suspension", %{players: players} do
    initial_state = Socks.initial_state(players, %{})
    socks_to_select = Enum.take(initial_state[:socks], 3)

    state =
      initial_state
      |> Socks.play("1", "select_sock", %{
        "sock_id" => Enum.at(socks_to_select, 0)[:id],
        room_code: nil
      })
      |> Socks.play("1", "select_sock", %{
        "sock_id" => Enum.at(socks_to_select, 1)[:id],
        room_code: nil
      })
      |> Socks.play("1", "select_sock", %{
        "sock_id" => Enum.at(socks_to_select, 2)[:id],
        room_code: nil
      })
      |> Socks.play("1", "cancel_suspension", nil)
      |> Socks.sanitize_state("1")

    assert state[:state] === :guessing
  end

  test "getting set right", %{players: players} do
    initial_state = Socks.initial_state(players, %{})
    %{socks: socks} = initial_state

    state =
      initial_state
      |> Socks.play("1", "select_sock", %{
        "sock_id" => Enum.at(socks, 1)[:id],
        room_code: nil
      })
      |> Socks.play("1", "select_sock", %{
        "sock_id" => Enum.at(socks, 4)[:id],
        room_code: nil
      })
      |> Socks.play("1", "select_sock", %{
        "sock_id" => Enum.at(socks, 8)[:id],
        room_code: nil
      })
      |> Socks.sanitize_state("1")

    assert state[:set_result][:is_set] == true
    assert state[:scores] == %{"1" => 1, "2" => 0}
    assert Enum.at(state[:socks], 1) !== Enum.at(socks, 1)
  end

#  test "guarantees a set to start", %{players: players} do
#  end
end
