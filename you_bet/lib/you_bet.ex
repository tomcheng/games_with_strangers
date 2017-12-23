defmodule YouBet do
  def minimum_players, do: 3

  def initial_state(players) do
    %{
      round: 1,
      stage: :guessing,
      question: "how much?",
      players: players
        |> Enum.map(fn {id, _} -> {id, %{id: id, guess: nil, score: 200}} end)
        |> Enum.into(%{})
    }
  end

  def sanitize_state(state) do
    state
    |> update_all_players(fn %{guess: guess} = player ->
      player
      |> Map.put(:guessed, !is_nil(guess))
      |> Map.drop([:guess])
    end)
  end

  def play(state, player_id, "guess", payload) do
    state
    |> update_player(player_id, &Map.put(&1, :guess, payload))
  end
  def play(state, _, _, _), do: state
  def play(state, _, _), do: state

  defp update_all_players(state, transformation) do
    state
    |> Map.update!(:players, fn players ->
      players
      |> Enum.map(fn {id, player} ->
        {id, transformation.(player)}
      end)
      |> Enum.into(%{})
    end)
  end

  defp update_player(state, player_id, transformation) do
    state
    |> Map.update!(:players, fn players ->
      players
      |> Enum.map(fn {id, player} ->
        if id == player_id do
          {id, transformation.(player)}
        else
          {id, player}
        end
      end)
      |> Enum.into(%{})
    end)
  end
end
