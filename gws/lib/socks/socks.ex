defmodule Socks do
  @selection_time_limit 3000
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
      stage: :guessing,
      used_sock_ids: Enum.map(socks, & &1[:id]),
      socks: socks
    }
  end

  def sanitize_state(state, _player_id) do
    %{players: players} = state

    state
    |> Map.update!(:scores, fn scores ->
      scores
      |> Enum.map(fn {id, score} -> %{score: score, player: players[id]} end)
      |> Enum.sort_by(fn s -> s[:player][:name] end)
      |> Enum.sort_by(fn s -> -s[:score] end)
    end)
    |> Map.take([:players, :scores, :stage, :socks, :selected_socks])
  end

  def play(state, player_id, "select_sock", %{"sock_id" => sock_id, room_code: room_code}) do
    if room_code && first_selection?(state, player_id) do
      :timer.apply_after(@selection_time_limit, Socks, :cancel_selection, [player_id, room_code])
    end

    state
    |> Map.update!(:selected_socks, fn selected ->
      Map.update!(selected, player_id, &MapSet.put(&1, sock_id))
    end)
  end

  def play(state, player_id, "cancel_selection", _) do
    state
    |> Map.update!(:selected_socks, fn selected ->
      Map.put(selected, player_id, MapSet.new())
    end)
  end

  def cancel_selection(player_id, room_code) do
    {:ok, room} = GWS.get_room(room_code)
    GWS.Room.make_play(room, player_id, "cancel_selection", nil)
    GamesWithStrangers.Endpoint.broadcast!("room:" <> room_code, "new_state", %{room: room})
  end

  defp select_socks(num) do
    @all_socks
    |> Enum.shuffle()
    |> Enum.take(num)
  end

  defp first_selection?(state, player_id) do
    state
    |> Map.get(:selected_socks)
    |> Map.get(player_id)
    |> MapSet.size() == 0
  end
end
