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
      |> (fn new_state ->
        if Enum.count(new_state[:players]) == 1 do
          Map.put(new_state, :moderator, player_id)
        else
          new_state
        end
      end).()
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
      |> (fn new_state ->
        %{players: ps, moderator: m} = new_state

        if !moderator_exists?(ps, m) && Enum.count(ps) > 0 do
          %{id: next_player_id} = ps
            |> Map.values
            |> List.first
          Map.put(new_state, :moderator, next_player_id)
        else
          new_state
        end
      end).()
    end)
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
      |> Map.update!(:players, fn ps ->
        ps
        |> Enum.map(fn {k, v} ->
          {
            k,
            v
            |> Map.drop([:channel])
            |> Map.put(:is_moderator, k == state[:moderator])
          }
        end)
        |> Enum.into(%{})
      end)
      |> Map.drop([:moderator])
    end)}
  end

  def destroy_room(room) do
    Agent.stop(room)
  end
end