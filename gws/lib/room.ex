defmodule GWS.Room do
  use Agent, restart: :temporary

  def start_link(_opts) do
    Agent.start_link(fn -> %{ game: nil, game_state: nil } end)
  end

  def set_game(room, game) do
    Agent.update(room, fn state -> Map.put(state, :game, game) end)
  end

  def get_state(room) do
    {:ok, Agent.get(room, &(&1))}
  end

  def update_game_state(room, new_state) do
    Agent.update(room, fn state -> Map.put(state, :game_state, new_state) end)
  end
end