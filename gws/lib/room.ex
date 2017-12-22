defmodule GWS.Room do
  use Agent, restart: :temporary

  def start_link(_opts) do
    Agent.start_link(fn -> %{game: nil, game_state: nil, players: %{}, moderator: nil} end)
  end

  def set_game(room, game) do
    Agent.update(room, &Map.put(&1, :game, game))
  end

  def add_player(room, player_id, name, channel) do
    Agent.update(room, fn state ->
      state
      |> Map.update!(:players, fn ps ->
        Map.put(ps, player_id, %{ id: player_id, name: name, channel: channel })
      end)
      |> update_moderator
    end)
  end

  def remove_player_by_channel(room, channel) do
    Agent.update(room, fn state ->
      state
      |> Map.update!(:players, fn ps ->
        ps
        |> Enum.reject(fn {_k, %{channel: c}} -> c == channel end)
        |> Enum.into(%{})
      end)
      |> update_moderator
    end)
  end

  defp update_moderator(%{players: players, moderator: moderator} = state) do
    if Enum.count(players) == 0 || moderator_exists?(players, moderator) do
      state
    else
      new_moderator =
        players
        |> Map.values
        |> List.first
        |> Map.get(:id)
      Map.put(state, :moderator, new_moderator)
    end
  end

  defp moderator_exists?(players, moderator) do
    Enum.any?(players, fn {_, p} -> p[:id] == moderator end)
  end

  def update_game_state(room, new_state) do
    Agent.update(room, fn state -> Map.put(state, :game_state, new_state) end)
  end

  def get_state(room) do
    {:ok, Agent.get(room, fn state ->
      state
      |> normalize_players
      |> Map.drop([:moderator])
    end)}
  end

  defp normalize_players(state) do
    state
    |> Map.update!(:players, fn players ->
      players
      |> Enum.map(fn {id, player} ->
        {id, player
          |> Map.drop([:channel])
          |> Map.put(:is_moderator, id == state[:moderator])}
      end)
      |> Enum.into(%{})
    end)
  end

  def destroy_room(room) do
    Agent.stop(room)
  end
end