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
    |> Map.drop([:answer, :players])
  end

  def sanitize_state(%{stage: :betting, players: players, guesses: guesses, bets: bets, odds: odds} = state, player_id) do
    state
    |> Map.put(:bet_options, get_bet_options(guesses, players, odds))
    |> Map.put(:your_bets, bets[player_id])
    |> Map.put(:awaiting_bet, get_awaiting(bets, players, player_id))
    |> Map.drop([:answer, :players, :odds])
  end

  def sanitize_state(%{stage: :reveal} = state, _) do
    state
    |> Map.drop([:players, :odds])
  end

  defp get_awaiting(actions, players, player_id) do
    actions
    |> Enum.reject(fn {id, a} -> !is_nil(a) || id == player_id end)
    |> Enum.map(fn {id, _} -> players[id] end)
  end

  def play(state, player_id, "guess", payload) do
    state
    |> Map.update!(:guesses, &Map.put(&1, player_id, elem(Integer.parse(payload), 0)))
    |> update_stage
  end

  def play(state, player_id, "finalize_bets", %{
    "bet1" => %{"guess" => guess1, "wager" => wager1},
    "bet2" => %{"guess" => guess2, "wager" => wager2}
  }) do
    state
    |> Map.update!(:bets, &Map.put(&1, player_id, [%{guess: guess1, wager: wager1}, %{guess: guess2, wager: wager2}]))
    |> update_stage
  end

  def play(state, _, _, _), do: state
  def play(state, _, _), do: state

  defp update_stage(%{stage: :guessing, guesses: guesses} = state) do
    if Enum.all?(guesses, fn {_, g} -> !is_nil(g) end) do
      state
      |> Map.put(:odds, get_odds(guesses))
      |> Map.put(:stage, :betting)
    else
      state
    end
  end

  defp update_stage(%{stage: :betting, bets: bets} = state) do
    if Enum.all?(bets, fn {_, b} -> !is_nil(b) end) do
      state
      |> update_scores
      |> Map.put(:stage, :reveal)
    else
      state
    end
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
