defmodule Socks do
  def minimum_players, do: 2

  def initial_state(players, %{}) do
    %{
      players: players,
      scores: Enum.reduce(players, %{}, fn {id, _}, acc -> Map.put(acc, id, 0) end),
      stage: :guessing,
      socks: [
        %{pattern: 1, color: 2, length: 3, smell: 2},
        %{pattern: 3, color: 1, length: 2, smell: 1}
      ]
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
  end
end
