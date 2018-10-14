defmodule Socks do
  @selection_time_limit 3000
  @wrong_time_out 7000

  def minimum_players, do: 1

  def initial_state(players, %{}) do
    socks = SocksChecker.get_initial_socks()

    %{
      players: players,
      scores: Enum.reduce(players, %{}, fn {id, _}, acc -> Map.put(acc, id, 0) end),
      selected_sock_ids:
        Enum.reduce(players, %{}, fn {id, _}, acc -> Map.put(acc, id, MapSet.new()) end),
      set_results: Enum.reduce(players, %{}, fn {id, _}, acc -> Map.put(acc, id, nil) end),
      player_states: Enum.reduce(players, %{}, fn {id, _}, acc -> Map.put(acc, id, :guessing) end),
      stage: :guessing,
      used_sock_ids: socks |> Enum.map(& &1[:id]) |> MapSet.new(),
      socks: socks
    }
  end

  def add_player(state, player) do
    state
    |> Map.update!(:players, &Map.put(&1, player[:id], player))
    |> Map.update!(:scores, &Map.put(&1, player[:id], 0))
    |> Map.update!(:selected_sock_ids, &Map.put(&1, player[:id], MapSet.new()))
    |> Map.update!(:player_states, &Map.put(&1, player[:id], :guessing))
  end

  def sanitize_state(state, player_id) do
    state
    |> Map.update!(:selected_sock_ids, fn selected ->
      selected
      |> Enum.map(fn {id, sock_ids} ->
        {id, MapSet.to_list(sock_ids)}
      end)
      |> Enum.into(%{})
    end)
    |> Map.take([:players, :scores, :stage, :socks, :selected_sock_ids])
    |> Map.put(
      :set_result,
      if(
        state[:set_results][player_id],
        do: Map.update!(state[:set_results][player_id], :sock_ids, &MapSet.to_list/1),
        else: nil
      )
    )
    |> Map.put(:state, state[:player_states][player_id])
  end

  def play(state, player_id, "select_sock", %{"sock_id" => sock_id}, room_code) do
    if room_code && selected_count(state, player_id) == 0 do
      :timer.apply_after(@selection_time_limit, Socks, :cancel_selection, [player_id, room_code])
    end

    cond do
      state[:player_states][player_id] == :suspended ->
        state

      Enum.member?(Enum.map(state[:socks], & &1[:id]), sock_id) ->
        state
        |> Map.update!(:selected_sock_ids, fn selected ->
          selected
          |> Map.update!(player_id, &MapSet.put(&1, sock_id))
        end)
        |> add_set_result(player_id, room_code)

      true ->
        state
    end
  end

  def play(state, player_id, "cancel_selection", _payload, _room_code) do
    state
    |> Map.update!(:selected_sock_ids, &Map.put(&1, player_id, MapSet.new()))
  end

  def play(state, player_id, "cancel_suspension", _payload, _room_code) do
    state
    |> Map.update!(:player_states, &Map.put(&1, player_id, :guessing))
  end

  defp add_set_result(state, player_id, room_code) do
    if selected_count(state, player_id) === 3 do
      if SocksChecker.is_set?(state[:selected_sock_ids][player_id]) do
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

  defp add_correct_result(state, player_id) do
    Map.update!(
      state,
      :set_results,
      &Map.put(&1, player_id, %{is_set: true, sock_ids: state[:selected_sock_ids][player_id]})
    )
  end

  defp add_wrong_result(state, player_id) do
    state
    |> Map.update!(
      :set_results,
      &Map.put(&1, player_id, %{is_set: false, sock_ids: state[:selected_sock_ids][player_id]})
    )
  end

  defp suspend_player(state, player_id, time, room_code) do
    if room_code do
      :timer.apply_after(time, Socks, :cancel_suspension, [player_id, room_code])
    end

    Map.update!(state, :player_states, &Map.put(&1, player_id, :suspended))
  end

  defp replace_selected_socks(state, player_id) do
    selected_sock_ids =
      state[:selected_sock_ids]
      |> Map.get(player_id)
      |> MapSet.to_list()

    current_sock_ids =
      state[:socks]
      |> Enum.map(& &1[:id])
      |> Enum.reject(&Enum.member?(selected_sock_ids, &1))
      |> MapSet.new()

    new_socks = SocksChecker.select_socks(state[:used_sock_ids], current_sock_ids)

    cond do
      Enum.count(new_socks) == 0 ->
        Map.put(state, :stage, :end)

      true ->
        state
        |> Map.update!(:socks, fn socks ->
          Enum.reduce(new_socks, socks, fn new_sock, ss ->
            new_sock_index = Enum.find_index(new_socks, &(&1 == new_sock))
            sock_id_to_replace = Enum.at(selected_sock_ids, new_sock_index)
            sock_index = Enum.find_index(ss, &(&1[:id] == sock_id_to_replace))
            List.replace_at(ss, sock_index, new_sock)
          end)
        end)
        |> Map.update!(:used_sock_ids, fn used ->
          MapSet.union(used, MapSet.new(Enum.map(new_socks, & &1[:id])))
        end)
    end
  end

  defp reset_selected_socks(state, player_id) do
    ids_to_remove = Map.get(state[:selected_sock_ids], player_id)

    Map.update!(state, :selected_sock_ids, fn selected ->
      ids_to_remove
      |> Enum.reduce(selected, fn id_to_remove, s ->
        s
        |> Enum.map(fn {player_id, sock_ids} ->
          {player_id, MapSet.delete(sock_ids, id_to_remove)}
        end)
        |> Enum.into(%{})
      end)
    end)
  end

  defp increment_score(state, player_id) do
    Map.update!(state, :scores, &Map.update!(&1, player_id, fn score -> score + 1 end))
  end

  def cancel_selection(player_id, room_code) do
    {:ok, room} = GWS.get_room(room_code)
    GWS.Room.make_play(room, player_id, "cancel_selection", %{payload: nil, room_code: nil})
    GWS.broadcast_state(room_code, room)
  end

  def cancel_suspension(player_id, room_code) do
    {:ok, room} = GWS.get_room(room_code)
    GWS.Room.make_play(room, player_id, "cancel_suspension", %{payload: nil, room_code: nil})
    GWS.broadcast_state(room_code, room)
  end

  defp selected_count(state, player_id) do
    state
    |> Map.get(:selected_sock_ids)
    |> Map.get(player_id)
    |> MapSet.size()
  end
end
