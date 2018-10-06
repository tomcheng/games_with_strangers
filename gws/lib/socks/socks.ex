defmodule Socks do
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

  def play(state, player_id, "select_sock", %{"sock_id" => sock_id}) do
    state
    |> Map.update!(:selected_socks, fn selected ->
      Map.update!(selected, player_id, &MapSet.put(&1, sock_id))
    end)
  end

  defp select_socks(num) do
    @all_socks
    |> Enum.shuffle()
    |> Enum.take(num)
  end
end
