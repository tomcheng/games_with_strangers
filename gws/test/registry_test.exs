defmodule GWS.RegistryTest do
  use ExUnit.Case, async: true

  setup do
    {:ok, registry} = start_supervised(GWS.Registry)
    %{registry: registry}
  end

  test "spawns rooms", %{registry: registry} do
    assert GWS.Registry.lookup(registry, "foo") == :error

    GWS.Registry.create(registry, "foo")
    assert {:ok, room} = GWS.Registry.lookup(registry, "foo")

    GWS.Room.update_state(room, &Map.put(&1, :foo, "bar"))
    assert GWS.Room.get_state(room) == %{foo: "bar"}
  end

  test "removes rooms on exit", %{registry: registry} do
    GWS.Registry.create(registry, "foo")
    {:ok, room} = GWS.Registry.lookup(registry, "foo")
    Agent.stop(room)

    assert GWS.Registry.lookup(registry, "foo") == :error
  end
end