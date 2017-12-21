defmodule GWS.Room do
  use Agent, restart: :temporary

  def start_link(_opts) do
    Agent.start_link(fn -> %{game: nil, game_state: nil, players: %{}} end)
  end

  def get_state(room) do
    {:ok, Agent.get(room, &(&1))}
  end

  def set_game(room, game) do
    Agent.update(room, &Map.put(&1, :game, game))
  end

  def add_player(room, player_id, name) do
    Agent.update(room, &Map.update!(&1, :players, fn ps ->
      Map.put(ps, player_id, %{ id: player_id, name: name })
    end))
  end

  def update_game_state(room, new_state) do
    Agent.update(room, fn state -> Map.put(state, :game_state, new_state) end)
  end
end