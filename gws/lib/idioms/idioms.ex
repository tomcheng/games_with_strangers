defmodule Idioms do
  def minimum_players, do: 2

  def initial_state(players, _options \\ nil) do
    %{
      players: players
    }
  end

  def sanitize_state(state, _player_id) do
    state
  end
end
