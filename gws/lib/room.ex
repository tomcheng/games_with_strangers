defmodule GWS.Room do
  use Agent, restart: :temporary

  def start_link(_opts) do
    Agent.start_link(fn ->
      %{players: %{}, game: nil, minimum_players: nil, game_state: nil, moderator: nil}
    end)
  end

  def set_game(room, game) do
    Agent.update(room, fn state ->
      game_module = game_module(game)

      state
      |> Map.put(:game, game)
      |> Map.put(:minimum_players, apply(game_module, :minimum_players, []))
    end)
    room
  end

  defp game_module(game), do: String.to_atom("Elixir." <> Macro.camelize(game))

  def add_player(room, player_id, name, channel) do
    Agent.update(room, fn state ->
      state
      |> Map.update!(:players, fn ps ->
        Map.put(ps, player_id, %{ id: player_id, name: name, channel: channel })
      end)
      |> update_moderator
    end)
    room
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
    room
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
    Enum.any?(players, fn {_, player} -> player[:id] == moderator end)
  end

  def get_state(room) do
    {:ok, Agent.get(room, fn state ->
      state
      |> normalize_players
      |> Map.drop([:moderator])
    end)}
  end

  defp normalize_players(%{players: players, moderator: moderator} = state) do
    new_players =
      players
      |> Enum.map(fn {id, player} ->
        {id, player
          |> Map.put(:is_moderator, id == moderator)
          |> Map.drop([:channel])}
      end)
      |> Enum.into(%{})
    Map.put(state, :players, new_players)
  end

  def start_game(room) do
    Agent.update(room, fn %{game: game} = state ->
      %{players: normal_players} = normalize_players(state)
      game_module = game_module(game)

      Map.put(state, :game_state, apply(game_module, :initial_state, [normal_players]))
    end)
    room
  end

  def make_play(room, play) do
    Agent.update(room, fn %{game: game, game_state: game_state} = state ->
      game_module = game_module(game)

      Map.put(state, :game_state, apply(game_module, :play, [game_state, play]))
    end)
    room
  end

  def destroy_room(room) do
    Agent.stop(room)
  end
end