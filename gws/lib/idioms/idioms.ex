defmodule Idioms do
  def minimum_players, do: 2

  def initial_state(players, _options \\ nil) do
    %{
      players: players,
      stage: :set_order,
      scores: [
        %{player: %{name: "Team A"}, score: 0},
        %{player: %{name: "Team B"}, score: 0}
      ]
    }
  end

  def sanitize_state(state, _player_id) do
    state
  end
end
