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
  @all_socks_by_id Enum.reduce(@all_socks, %{}, fn sock, acc ->
                     Map.put(acc, sock[:id], sock)
                   end)

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
      used_sock_ids: socks |> Enum.map(& &1[:id]) |> MapSet.new(),
      socks: socks
    }
  end

  def sanitize_state(state, player_id) do
    state
    |> Map.update!(:selected_socks, fn selected ->
      selected
      |> Enum.map(fn {id, socks} ->
        {id, MapSet.to_list(socks)}
      end)
      |> Enum.into(%{})
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
        |> add_set_result(player_id, room_code)
    end
  end

  def play(state, player_id, "cancel_selection", _) do
    state
    |> Map.update!(:selected_socks, &Map.put(&1, player_id, MapSet.new()))
  end

  def play(state, player_id, "cancel_suspension", _) do
    state
    |> Map.update!(:player_states, &Map.put(&1, player_id, :guessing))
  end

  defp add_set_result(state, player_id, room_code) do
    if selected_count(state, player_id) === 3 do
      if is_set?(state[:selected_socks][player_id]) do
        state
        |> add_correct_result(player_id)
        |> replace_selected_socks(player_id)
        |> reset_selected_socks(player_id)
        |> increment_score(player_id)
      else
        state
        |> add_wrong_result(player_id)
        |> reset_selected_socks(player_id)
        |> suspend_player(player_id, @wrong_time_out, room_code)
      end
    else
      state
    end
  end

  defp add_wrong_result(state, player_id) do
    state
    |> Map.update!(
      :set_results,
      &Map.put(&1, player_id, %{is_set: false, socks: state[:selected_socks][player_id]})
    )
  end

  defp suspend_player(state, player_id, time, room_code) do
    if room_code do
      :timer.apply_after(time, Socks, :cancel_suspension, [player_id, room_code])
    end

    Map.update!(state, :player_states, &Map.put(&1, player_id, :suspended))
  end

  defp add_correct_result(state, player_id) do
    Map.update!(
      state,
      :set_results,
      &Map.put(&1, player_id, %{is_set: true, socks: state[:selected_socks][player_id]})
    )
  end

  defp replace_selected_socks(state, player_id) do
  end

  defp reset_selected_socks(state, player_id) do
    Map.update!(state, :selected_socks, &Map.put(&1, player_id, MapSet.new()))
  end

  defp increment_score(state, player_id) do
    Map.update!(state, :scores, &Map.update!(&1, player_id, fn score -> score + 1 end))
  end

  def cancel_selection(player_id, room_code) do
    {:ok, room} = GWS.get_room(room_code)
    GWS.Room.make_play(room, player_id, "cancel_selection", nil)
    GWS.broadcast_state(room_code, room)
  end

  def cancel_suspension(player_id, room_code) do
    {:ok, room} = GWS.get_room(room_code)
    GWS.Room.make_play(room, player_id, "cancel_suspension", nil)
    GWS.broadcast_state(room_code, room)
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

  defp is_set?(guess) do
    socks =
      guess
      |> MapSet.to_list()
      |> Enum.map(&Map.get(@all_socks_by_id, &1))

    [:color, :length, :pattern, :smell]
    |> Enum.all?(fn prop ->
      uniques =
        socks
        |> Enum.uniq_by(&Map.get(&1, prop))
        |> Enum.count()

      uniques == 1 || uniques == 3
    end)
  end
end
