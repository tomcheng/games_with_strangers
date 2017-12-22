defmodule GWS.Room do
  use Agent, restart: :temporary

  def start_link(_opts) do
    Agent.start_link(fn -> %{game: nil, game_state: nil, players: %{}} end)
  end

  def get_state(room) do
    {:ok, Agent.get(room, fn state ->
      state
      |> Map.update!(:players, fn ps ->
        ps
        |> Enum.map(fn {k, v} -> {k, Map.drop(v, [:channel])} end)
        |> Enum.into(%{})
      end)
    end)}
  end

  def set_game(room, game) do
    Agent.update(room, &Map.put(&1, :game, game))
  end

  def add_player(room, player_id, name, channel) do
    Agent.update(room, &Map.update!(&1, :players, fn ps ->
      Map.put(ps, player_id, %{ id: player_id, name: name, channel: channel })
    end))
  end

  def remove_player_by_channel(room, channel) do
    Agent.update(room, &Map.update!(&1, :players, fn ps ->
      ps
      |> Enum.reject(fn {_k, %{channel: c}} -> c == channel end)
      |> Enum.into(%{})
    end))
  end

  def update_game_state(room, new_state) do
    Agent.update(room, fn state -> Map.put(state, :game_state, new_state) end)
  end

  def destroy_room(room) do
    Agent.stop(room)
  end
end