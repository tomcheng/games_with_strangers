defmodule Socks do
  @selection_time_limit 3000
  @wrong_time_out 5000
  @all_socks for c <- [1, 2, 3],
                 l <- [1, 2, 3],
                 p <- [1, 2, 3],
                 s <- [1, 2, 3],
                 do: %{
                   id:
                     Integer.to_string(c) <>
                       Integer.to_string(l) <> Integer.to_string(p) <> Integer.to_string(s),
                   color: c,
                   length: l,
                   pattern: p,
                   smell: s
                 }

  def minimum_players, do: 2

  def initial_state(players, %{}) do
    socks = select_socks(9)

    %{
      players: players,
      scores: Enum.reduce(players, %{}, fn {id, _}, acc -> Map.put(acc, id, 0) end),
      selected_socks:
        Enum.reduce(players, %{}, fn {id, _}, acc -> Map.put(acc, id, MapSet.new()) end),
      set_results: Enum.reduce(players, %{}, fn {id, _}, acc -> Map.put(acc, id, nil) end),
      player_states: Enum.reduce(players, %{}, fn {id, _}, acc -> Map.put(acc, id, :guessing) end),
      stage: :guessing,
      used_sock_ids: Enum.map(socks, & &1[:id]),
      socks: socks
    }
  end

  def sanitize_state(state, player_id) do
    %{players: players} = state

    state
    |> Map.update!(:scores, fn scores ->
      scores
      |> Enum.map(fn {id, score} -> %{score: score, player: players[id]} end)
      |> Enum.sort_by(fn s -> s[:player][:name] end)
      |> Enum.sort_by(fn s -> -s[:score] end)
    end)
    |> Map.take([:players, :scores, :stage, :socks, :selected_socks])
    |> Map.put(:set_result, state[:set_results][player_id])
    |> Map.put(:state, state[:player_states][player_id])
  end

  def play(state, player_id, "select_sock", %{"sock_id" => sock_id, room_code: room_code}) do
    if room_code && selected_count(state, player_id) == 0 do
      :timer.apply_after(@selection_time_limit, Socks, :cancel_selection, [player_id, room_code])
    end

    cond do
      state[:player_states][player_id] == :suspended ->
        state

      true ->
        state
        |> Map.update!(:selected_socks, fn selected ->
          selected
          |> Map.update!(player_id, &MapSet.put(&1, sock_id))
        end)
        |> check_set(player_id)
    end
  end

  def play(state, player_id, "cancel_selection", _) do
    state
    |> Map.update!(:selected_socks, &Map.put(&1, player_id, MapSet.new()))
  end

  def cancel_selection(player_id, room_code) do
    {:ok, room} = GWS.get_room(room_code)
    GWS.Room.make_play(room, player_id, "cancel_selection", nil)
    GWS.broadcast_state(room_code, room)
  end

  defp check_set(state, player_id) do
    if selected_count(state, player_id) === 3 do
      state
      |> Map.update!(
        :set_results,
        &Map.put(&1, player_id, %{is_set: false, socks: state[:selected_socks][player_id]})
      )
      |> Map.update!(:selected_socks, &Map.put(&1, player_id, MapSet.new()))
      |> Map.update!(:player_states, &Map.put(&1, player_id, :suspended))
    else
      state
    end
  end

  defp select_socks(num) do
    @all_socks
    |> Enum.shuffle()
    |> Enum.take(num)
  end

  defp selected_count(state, player_id) do
    state
    |> Map.get(:selected_socks)
    |> Map.get(player_id)
    |> MapSet.size()
  end
end
