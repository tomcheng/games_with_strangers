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
      scores: initial_map(players, 200),
      guesses: initial_map(players),
      bets: initial_map(players)
    }
  end

  def sanitize_state(%{stage: :guessing, players: players, guesses: guesses} = state, player_id) do
    state
    |> Map.put(:your_guess, guesses[player_id])
    |> Map.put(:awaiting_guess, get_awaiting(guesses, players, player_id))
    |> format_scores
    |> Map.take([:awaiting_guess, :question, :round, :scores, :stage, :your_guess])
  end

  def sanitize_state(%{stage: :betting, players: players, bets: bets, scores: scores} = state, player_id) do
    state
    |> Map.put(:your_bets, bets[player_id])
    |> Map.put(:awaiting_bet, get_awaiting(bets, players, player_id))
    |> Map.put(:your_score, scores[player_id])
    |> format_scores
    |> Map.take([:awaiting_bet, :bet_options, :question, :round, :scores, :stage, :your_bets, :your_score])
  end

  def sanitize_state(%{stage: :reveal} = state, _) do
    state
    |> format_scores
    |> Map.take([:answer, :payouts, :question, :round, :scores, :stage])
  end

  defp format_scores(%{scores: scores, players: players} = state) do
    state
    |> Map.put(
      :scores,
      scores
      |> Enum.map(fn {id, score} -> %{player: players[id], score: score} end)
      |> Enum.sort_by(fn %{player: %{name: name}} -> name end)
      |> Enum.sort_by(fn %{score: score} -> -score end)
    )
  end

  defp get_awaiting(actions, players, player_id) do
    actions
    |> Enum.reject(fn {id, a} -> !is_nil(a) || id == player_id end)
    |> Enum.map(fn {id, _} -> players[id] end)
  end

  def play(state, player_id, "guess", payload) do
    case Integer.parse(payload) do
      :error ->
        state
      {guess, _} ->
        state
        |> Map.update!(:guesses, &Map.put(&1, player_id, guess))
        |> transition_to_betting_if_done
    end
  end

  def play(state, player_id, "finalize_bets", bets) do
    state
    |> Map.update!(:bets, &Map.put(&1, player_id, Enum.map(bets, fn bet ->
      %{guess: bet["guess"], base_wager: bet["base_wager"], extra_wager: bet["extra_wager"]}
    end)))
    |> transition_to_reveal_if_done
  end

  def play(%{players: players} = state, _player_id, "advance_round", _) do
    {question, answer} = YouBet.Questions.random()

    state
    |> Map.update!(:round, &(&1 + 1))
    |> Map.put(:stage, :guessing)
    |> Map.put(:question, question)
    |> Map.put(:answer, answer)
    |> Map.put(:guesses, initial_map(players))
    |> Map.put(:bets, initial_map(players))
  end

  def play(state, _, _, _), do: state
  def play(state, _, _), do: state

  defp transition_to_betting_if_done(%{guesses: guesses, players: players} = state) do
    if all_populated?(guesses) do
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
    if all_populated?(bets) do
      state
      |> update_scores
      |> Map.put(:stage, :reveal)
    else
      state
    end
  end

  defp all_populated?(items) do
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

  defp initial_map(players, initial_value \\ nil) do
    Enum.reduce(players, %{}, fn {id, _}, acc -> Map.put(acc, id, initial_value) end)
  end
end
