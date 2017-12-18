defmodule GWS.Room do
  use Agent

  def start_link(_opts) do
    Agent.start_link(fn -> %{} end)
  end

  def get_state(room) do
    Agent.get(room, &(&1))
  end

  def update_state(room, transformation) do
    Agent.update(room, fn state -> transformation.(state) end)
  end
end