defmodule GWSTest do
  use ExUnit.Case
  doctest GWS

  test "creates a room and returns a room code" do
    {:ok, code} = GWS.create_room()

    assert String.match?(code, ~r/[A-Z]{4}/)

    {:ok, room} = GWS.get_room(code)

    assert is_pid(room)
  end

  test "returns error when room not found" do
    assert GWS.get_room("foo") == {:error, "Room not found"}
  end
end
