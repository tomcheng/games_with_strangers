defmodule GWS.Room do
  use Agent, restart: :temporary

  def start_link(_opts) do
    Agent.start_link(fn ->
      %{players: %{}, game: nil, minimum_players: nil, game_state: nil, moderator: nil}
    end)
  end

  def set_game(room, game) do
    Agent.update(room, fn state ->
      state
      |> Map.put(:game, game)
      |> Map.put(:minimum_players, game |> get_module |> apply(:minimum_players, []))
    end)

    room
  end

  defp get_module(game), do: String.to_atom("Elixir." <> Macro.camelize(game))

  def add_player(room, player_id, name, channel) do
    game_state = Agent.get(room, &Map.get(&1, :game_state))

    if game_state && !game_state[:players][player_id] do
      {:error, "Game already started"}
    else
      Agent.update(room, fn state ->
        state
        |> Map.update!(:players, fn ps ->
          Map.put(ps, player_id, %{id: player_id, name: name, channel: channel})
        end)
        |> update_moderator
      end)

      room
    end
  end

  def remove_player_by_channel(room, channel) do
    Agent.update(room, fn state ->
      state
      |> Map.update!(:players, fn ps ->
        ps
        |> Enum.reject(fn {_, %{channel: c}} -> c == channel end)
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
        |> Map.values()
        |> List.first()
        |> Map.get(:id)

      Map.put(state, :moderator, new_moderator)
    end
  end

  defp moderator_exists?(players, moderator) do
    Enum.any?(players, fn {_, player} -> player[:id] == moderator end)
  end

  def get_state(room, channel \\ nil) do
    {:ok,
     Agent.get(room, fn state ->
       player_id = get_player_id_from_channel(state, channel)

       state
       |> sanitize_game_state(player_id)
       |> normalize_players
       |> split_players_between_you_and_others(player_id)
       |> Map.drop([:moderator])
     end)}
  end

  defp get_player_id_from_channel(_, nil), do: nil

  defp get_player_id_from_channel(state, channel) do
    state
    |> Map.get(:players)
    |> Enum.find({nil, nil}, fn {_, player} -> player[:channel] == channel end)
    |> elem(0)
  end

  defp normalize_players(%{players: players, moderator: moderator} = state) do
    new_players =
      players
      |> Enum.map(fn {id, player} ->
        {id,
         player
         |> Map.put(:is_moderator, id == moderator)
         |> Map.drop([:channel])}
      end)
      |> Enum.into(%{})

    Map.put(state, :players, new_players)
  end

  defp split_players_between_you_and_others(%{players: players} = state, player_id) do
    state
    |> Map.put(
      :you,
      players |> Enum.find({nil, nil}, fn {id, _} -> id == player_id end) |> elem(1)
    )
    |> Map.put(
      :others,
      players |> Enum.reject(fn {id, _} -> id == player_id end) |> Enum.map(&elem(&1, 1))
    )
    |> Map.drop([:players])
  end

  defp sanitize_game_state(%{game_state: game_state, game: game} = state, player_id) do
    if game_state do
      Map.update!(state, :game_state, &apply(get_module(game), :sanitize_state, [&1, player_id]))
    else
      state
    end
  end

  def start_game(room, options) do
    Agent.update(room, fn %{game: game} = state ->
      %{players: normal_players} = normalize_players(state)

      state
      |> Map.put(
        :players_in_game,
        normal_players
        |> Map.values()
        |> Enum.map(&Map.drop(&1, [:is_moderator]))
        |> Enum.sort_by(&Map.get(&1, :name))
      )
      |> Map.put(
        :game_state,
        game |> get_module |> apply(:initial_state, [normal_players, options])
      )
    end)

    room
  end

  def make_play(room, player_id, type, payload) do
    Agent.update(room, fn %{game: game, game_state: game_state} = state ->
      Map.put(
        state,
        :game_state,
        game |> get_module |> apply(:play, [game_state, player_id, type, payload])
      )
    end)

    room
  end

  def restart_game(room) do
    Agent.update(room, fn state ->
      state
      |> Map.put(:game_state, nil)
      |> Map.put(:players_in_game, nil)
    end)

    room
  end

  def destroy_room(room) do
    Agent.stop(room)
  end
end
