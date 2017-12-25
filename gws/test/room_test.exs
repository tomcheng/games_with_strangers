defmodule GWS.RoomTest do
  use ExUnit.Case, async: true

  setup do
    {:ok, room} = start_supervised(GWS.Room)
    %{room: room}
  end

  test "sets game", %{room: room} do
    {:ok, state} = GWS.Room.get_state(room)

    assert state[:game] == nil

    GWS.Room.set_game(room, "you_bet")

    {:ok, state} = GWS.Room.get_state(room)

    assert state[:game] == "you_bet"
    assert state[:minimum_players] == YouBet.minimum_players
  end

  test "starts game", %{room: room} do
    {:ok, %{game_state: game_state}} =
      room
      |> GWS.Room.set_game("you_bet")
      |> GWS.Room.add_player("player-id-1", "Harold", 1)
      |> GWS.Room.add_player("player-id-2", "Bob", 2)
      |> GWS.Room.add_player("player-id-3", "Andy", 3)
      |> GWS.Room.start_game
      |> GWS.Room.get_state(1)

    assert game_state == %{
      "player-id-1" => %{id: "player-id-1", name: "Harold"},
      "player-id-2" => %{id: "player-id-2", name: "Bob"},
      "player-id-3" => %{id: "player-id-3", name: "Andy"}
    }
    |> YouBet.initial_state
    |> YouBet.sanitize_state("player-id-1")
  end

  test "makes play", %{room: room} do
    {:ok, %{game_state: game_state}} =
      room
      |> GWS.Room.set_game("you_bet")
      |> GWS.Room.add_player("player-id-1", "Harold", 1)
      |> GWS.Room.add_player("player-id-2", "Bob", 2)
      |> GWS.Room.add_player("player-id-3", "Andy", 3)
      |> GWS.Room.start_game
      |> GWS.Room.make_play("player-id-1", "guess", "20")
      |> GWS.Room.get_state(1)

    assert game_state == %{
      "player-id-1" => %{id: "player-id-1", name: "Harold"},
      "player-id-2" => %{id: "player-id-2", name: "Bob"},
      "player-id-3" => %{id: "player-id-3", name: "Andy"}
    }
    |> YouBet.initial_state
    |> YouBet.play("player-id-1", "guess", "20")
    |> YouBet.sanitize_state("player-id-1")
  end

  test "adds players", %{room: room} do
    {:ok, state} = GWS.Room.get_state(room)

    assert state[:you] == nil
    assert state[:others] == []

    {:ok, state} =
      room
      |> GWS.Room.add_player("player-id-1", "Harold", 1)
      |> GWS.Room.add_player("player-id-2", "Bob", 2)
      |> GWS.Room.get_state(1)

    assert state[:you] == %{id: "player-id-1", name: "Harold", is_moderator: true}
    assert state[:others] == [%{id: "player-id-2", name: "Bob", is_moderator: false}]
  end

  test "does not duplicate existing player", %{room: room} do
    {:ok, state} =
      room
      |> GWS.Room.add_player("player-id-1", "Harold", 1)
      |> GWS.Room.add_player("player-id-1", "Harold", 1)
      |> GWS.Room.get_state(1)

    assert state[:you] == %{id: "player-id-1", name: "Harold", is_moderator: true}
    assert state[:others] == []
  end

  test "removes a player", %{room: room} do
    {:ok, state} =
      room
      |> GWS.Room.add_player("player-id-1", "Harold", 1)
      |> GWS.Room.remove_player_by_channel(1)
      |> GWS.Room.get_state

    assert state[:you] == nil
    assert state[:others] == []
  end

  test "reassigns moderator when moderator leaves", %{room: room} do
    {:ok, state} =
      room
      |> GWS.Room.add_player("player-id-1", "Harold", 1)
      |> GWS.Room.add_player("player-id-2", "Bob", 2)
      |> GWS.Room.remove_player_by_channel(1)
      |> GWS.Room.get_state

    assert state[:others] == [%{id: "player-id-2", name: "Bob", is_moderator: true}]
  end

  test "removes a room", %{room: room} do
    GWS.Room.destroy_room(room)

    refute Process.alive?(room)
  end

  test "are temporary workers" do
    assert Supervisor.child_spec(GWS.Room, []).restart == :temporary
  end
end