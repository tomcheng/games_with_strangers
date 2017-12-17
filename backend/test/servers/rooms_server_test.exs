defmodule GamesWithStrangers.RoomsServerTest do
  use ExUnit.Case

  alias GamesWithStrangers.RoomsServer

  setup do
    {:ok, pid} = RoomsServer.start()

    {:ok, pid: pid}
  end

  test "creates a new room", %{pid: pid} do
    {:ok, room_id} = RoomsServer.create(pid)
    assert room_id == "foo"
  end
end
