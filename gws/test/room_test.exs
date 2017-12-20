defmodule GWS.RoomTest do
  use ExUnit.Case, async: true

  setup do
    {:ok, room} = start_supervised(GWS.Room)
    %{room: room}
  end

  test "sets game", %{room: room} do
    {:ok, state} = GWS.Room.get_state(room)

    assert state[:game] == nil

    GWS.Room.set_game(room, "futbol")

    {:ok, state} = GWS.Room.get_state(room)

    assert state[:game] == "futbol"
  end

  test "stores values by key", %{room: room} do
    {:ok, state} = GWS.Room.get_state(room)

    assert state[:game_state] == nil

    GWS.Room.update_game_state(room, %{foo: "bar"})

    {:ok, state} = GWS.Room.get_state(room)

    assert state[:game_state] == %{foo: "bar"}
  end

  test "are temporary workers" do
    assert Supervisor.child_spec(GWS.Room, []).restart == :temporary
  end
end