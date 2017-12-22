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

  test "updates game state", %{room: room} do
    {:ok, state} = GWS.Room.get_state(room)

    assert state[:game_state] == nil

    GWS.Room.update_game_state(room, %{foo: "bar"})

    {:ok, state} = GWS.Room.get_state(room)

    assert state[:game_state] == %{foo: "bar"}
  end

  test "adds a player", %{room: room} do
    {:ok, state} = GWS.Room.get_state(room)

    assert state[:players] == %{}

    GWS.Room.add_player(room, "player-id-1", "Harold", 1)
    GWS.Room.add_player(room, "player-id-2", "Bob", 2)
    {:ok, state} = GWS.Room.get_state(room)

    assert state[:players] == %{
      "player-id-1" => %{id: "player-id-1", name: "Harold", is_moderator: true},
      "player-id-2" => %{id: "player-id-2", name: "Bob", is_moderator: false}
    }
  end

  test "does not duplicate existing player", %{room: room} do
    GWS.Room.add_player(room, "player-id-1", "Harold", 1)
    GWS.Room.add_player(room, "player-id-1", "Harold", 1)
    {:ok, state} = GWS.Room.get_state(room)

    assert state[:players] == %{
      "player-id-1" => %{id: "player-id-1", name: "Harold", is_moderator: true}
    }
  end

  test "removes a player", %{room: room} do
    GWS.Room.add_player(room, "player-id-1", "Harold", 1)
    GWS.Room.remove_player_by_channel(room, 1)

    {:ok, state} = GWS.Room.get_state(room)

    assert state[:players] == %{}
  end

  test "reassigns moderator when moderator leaves", %{room: room} do
    GWS.Room.add_player(room, "player-id-1", "Harold", 1)
    GWS.Room.add_player(room, "player-id-2", "Bob", 2)
    GWS.Room.remove_player_by_channel(room, 1)

    {:ok, state} = GWS.Room.get_state(room)

    assert state[:players] == %{
      "player-id-2" => %{id: "player-id-2", name: "Bob", is_moderator: true}
    }
  end

  test "removes a room", %{room: room} do
    GWS.Room.destroy_room(room)

    refute Process.alive?(room)
  end

  test "are temporary workers" do
    assert Supervisor.child_spec(GWS.Room, []).restart == :temporary
  end
end