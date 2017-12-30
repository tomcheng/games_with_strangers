defmodule YouBet do
  def minimum_players, do: 3

  def initial_state(players) do
    {question, answer} = YouBet.Questions.random()

    %{
      round: 1,
      stage: :guessing,
      question: question,
      answer: answer,
      players: players
        |> Enum.map(fn {id, %{name: name}} ->
          {id, %{id: id, name: name}}
        end)
        |> Enum.into(%{}),
      scores: Enum.reduce(players, %{}, fn {id, _}, scores -> Map.put(scores, id, 200) end),
      guesses: Enum.reduce(players, %{}, fn {id, _}, guesses -> Map.put(guesses, id, nil) end),
      bets: Enum.reduce(players, %{}, fn {id, _}, bets -> Map.put(bets, id, nil) end),
      odds: nil
    }
  end

  def sanitize_state(%{stage: :guessing, players: players, guesses: guesses} = state, player_id) do
    state
    |> Map.put(:your_guess, guesses[player_id])
    |> Map.put(:awaiting_guess, get_awaiting(guesses, players, player_id))
    |> Map.take([:awaiting_guess, :question, :round, :scores, :stage, :your_guess])
  end

  def sanitize_state(%{stage: :betting, players: players, bets: bets} = state, player_id) do
    state
    |> Map.put(:your_bets, bets[player_id])
    |> Map.put(:awaiting_bet, get_awaiting(bets, players, player_id))
    |> Map.take([:awaiting_bet, :bet_options, :question, :round, :scores, :stage, :your_bets])
  end

  def sanitize_state(%{stage: :reveal} = state, _) do
    Map.take(state, [:answer, :payouts, :question, :round, :scores, :stage])
  end

  defp get_awaiting(actions, players, player_id) do
    actions
    |> Enum.reject(fn {id, a} -> !is_nil(a) || id == player_id end)
    |> Enum.map(fn {id, _} -> players[id] end)
  end

  def play(state, player_id, "guess", payload) do
    state
    |> Map.update!(:guesses, &Map.put(&1, player_id, elem(Integer.parse(payload), 0)))
    |> transition_to_betting_if_done
  end

  def play(state, player_id, "finalize_bets", %{"bet1" => %{"guess" => g1, "wager" => w1}, "bet2" => %{"guess" => g2, "wager" => w2}}) do
    state
    |> Map.update!(:bets, &Map.put(&1, player_id, [%{guess: g1, wager: w1}, %{guess: g2, wager: w2}]))
    |> transition_to_reveal_if_done
  end

  def play(state, _, _, _), do: state
  def play(state, _, _), do: state

  defp transition_to_betting_if_done(%{guesses: guesses, players: players} = state) do
    if all_done?(guesses) do
      odds = get_odds(guesses)
      bet_options = get_bet_options(guesses, players, odds)

      state
      |> Map.put(:odds, odds)
      |> Map.put(:bet_options, bet_options)
      |> Map.put(:stage, :betting)
    else
      state
    end
  end

  defp transition_to_reveal_if_done(%{bets: bets} = state) do
    if all_done?(bets) do
      state
      |> update_scores
      |> Map.put(:stage, :reveal)
    else
      state
    end
  end

  defp all_done?(items) do
    items
    |> Map.values
    |> Enum.all?(&(!is_nil(&1)))
  end

  defp update_scores(%{
    scores: scores,
    players: players,
    guesses: guesses,
    odds: odds,
    bets: bets,
    answer: answer
  } = state) do
    {new_scores, payouts} = YouBet.Scores.update(scores, players, guesses, odds, bets, answer)
    state
    |> Map.put(:payouts, payouts)
    |> Map.put(:scores, new_scores)
  end

  defp get_bet_options(guesses_by_player_id, players, odds) do
    guesses_by_player_id
    |> Map.values
    |> Enum.uniq
    |> Enum.sort
    |> Enum.map(fn guess ->
      %{
        guess: guess,
        players: guesses_by_player_id
          |> Enum.filter(fn {_, g} -> g == guess end)
          |> Enum.map(fn {id, _} -> players[id] end)
          |> Enum.sort_by(fn p -> p[:name] end),
        odds: odds[guess]
      }
    end)
  end

  defp get_odds(guesses_by_player_id) do
    guesses =
      guesses_by_player_id
      |> Map.values
      |> Enum.uniq
      |> Enum.sort
    num_guesses = Enum.count(guesses)
    mid_point = num_guesses / 2 - 0.5
    base = if rem(num_guesses, 2) == 0, do: 2.5, else: 2

    guesses
    |> Enum.with_index
    |> Enum.reduce(%{}, fn {guess, index}, odds ->
      Map.put(odds, guess, Float.round(abs(index - mid_point) + base))
    end)
  end
end
