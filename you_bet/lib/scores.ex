defmodule YouBet.Scores do
  def update(scores, players, guesses, odds, bets, answer) do
    payouts = get_payouts(players, guesses, odds, bets, answer)

    new_scores = Enum.reduce(payouts, scores, fn %{player: %{id: id}, amount: amount}, s ->
      Map.update!(s, id, &(&1 + amount))
    end)

    {new_scores, payouts}
  end

  defp get_payouts(players, guesses, odds, bets, answer) do
    closest_guess = get_closest_guess(answer, guesses)

    closest_payouts =
      guesses
      |> Enum.filter(fn {_, guess} -> guess == closest_guess end)
      |> Enum.map(fn {id, _} -> %{player: players[id], amount: 300, closest: true} end)

    bet_payouts =
      bets
      |> Enum.map(fn {player_id, bs} ->
        {player_id, Enum.reduce(bs, 0, fn %{guess: guess, base_wager: wager}, sum ->
          if guess == closest_guess do
            sum + wager
          else
            sum
          end
        end)}
      end)
      |> Enum.reject(fn {_, wager} -> wager == 0 end)
      |> Enum.map(fn {id, wager} ->
        %{
          player: players[id],
          amount: wager * odds[closest_guess],
          closest: false,
          wager: wager,
          odds: odds[closest_guess]
        }
      end)

    closest_payouts ++ bet_payouts
  end

  defp get_closest_guess(answer, guesses) do
    guesses
    |> Map.values
    |> Enum.reject(&(&1 > answer))
    |> Enum.max(fn -> nil end)
  end
end