defmodule GWSTest do
  use ExUnit.Case
  doctest GWS

  test "creates a room and returns a room code" do
    {:ok, code} = GWS.create_room
    assert String.match?(code, ~r/[A-Z]{4}/)
  end
end
