defmodule YouBet.Scores do
  def update(scores, players, guesses, odds, bets, answer) do
    payouts = get_payouts(players, guesses, odds, bets, answer)

    new_scores =
      Enum.reduce(payouts, scores, fn {id, %{delta: delta}}, s ->
        Map.update!(s, id, &(&1 + delta))
      end)

    {new_scores, payouts}
  end

  defp get_payouts(players, guesses, odds, bets, answer) do
    closest_guess = get_closest_guess(answer, guesses)

    players
    |> Enum.map(fn {id, _} ->
      {id,
       %{
         delta: get_delta_for_player(id, closest_guess, guesses, odds, bets),
         closest: guesses[id] == closest_guess
       }}
    end)
    |> Enum.into(%{})
  end

  def get_delta_for_player(id, closest_guess, guesses, odds, bets) do
    points_for_closest = if guesses[id] == closest_guess, do: 300, else: 0
    right_bet = Enum.find(bets[id], fn %{guess: guess} -> guess == closest_guess end)

    points_for_right_bet =
      if is_nil(right_bet),
        do: 0,
        else: (right_bet[:base_wager] + right_bet[:extra_wager]) * odds[closest_guess]

    points_for_wrong_bets =
      bets[id]
      |> Enum.reject(fn %{guess: guess} -> guess == closest_guess end)
      |> Enum.reduce(0, fn %{extra_wager: extra_wager}, acc -> acc - extra_wager end)

    points_for_closest + points_for_right_bet + points_for_wrong_bets
  end

  defp get_closest_guess(answer, guesses) do
    guesses
    |> Map.values()
    |> Enum.reject(&(&1 > answer))
    |> Enum.max(fn -> "less" end)
  end
end
