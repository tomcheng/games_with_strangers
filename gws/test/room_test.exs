defmodule GWS.RoomTest do
  use ExUnit.Case, async: true

  setup do
    {:ok, room} = start_supervised(GWS.Room)
    %{room: room}
  end

  test "stores values by key", %{room: room} do
    assert GWS.Room.get_state(room) == %{}

    GWS.Room.update_state(room, fn state -> Map.put(state, :foo, "bar") end)
    assert GWS.Room.get_state(room) == %{foo: "bar"}
  end

  test "are temporary workers" do
    assert Supervisor.child_spec(GWS.Room, []).restart == :temporary
  end
end