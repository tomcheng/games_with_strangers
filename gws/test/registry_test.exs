defmodule GWS.RegistryTest do
  use ExUnit.Case

  setup do
    {:ok, registry} = start_supervised(GWS.Registry)
    %{registry: registry}
  end

  test "returns error if room code not found", %{registry: registry} do
    assert GWS.Registry.get_room(registry, "ZZZZ") == :error
  end

  test "spawns rooms", %{registry: registry} do
    {:ok, code} = GWS.Registry.create(registry)

    assert String.match?(code, ~r/[A-Z]{4}/)

    {:ok, room} = GWS.Registry.get_room(registry, code)

    GWS.Room.set_game(room, "futbol")
    {:ok, state} = GWS.Room.get_state(room)
    assert state[:game] == "futbol"
  end

  test "removes rooms on exit", %{registry: registry} do
    {:ok, code} = GWS.Registry.create(registry)
    {:ok, room} = GWS.Registry.get_room(registry, code)
    Agent.stop(room)

    assert GWS.Registry.get_room(registry, code) == :error
  end

  test "removes room on crash", %{registry: registry} do
    {:ok, code} = GWS.Registry.create(registry)
    {:ok, room} = GWS.Registry.get_room(registry, code)

    Agent.stop(room, :shutdown)
    assert GWS.Registry.get_room(registry, code) == :error
  end

  test "gets room count", %{registry: registry} do
    (1..10)
    |> Enum.each(fn _ ->
      GWS.Registry.create(registry)
    end)

    assert GWS.Registry.get_room_count(registry) == 10
  end

  test "ensures no room code collisions", %{registry: registry} do
    (1..2000)
    |> Enum.each(fn _ ->
      GWS.Registry.create(registry)
    end)

    assert GWS.Registry.get_room_count(registry) == 2000
  end
end