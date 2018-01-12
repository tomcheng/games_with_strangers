defmodule YouBet do
  def minimum_players, do: 3

  def initial_state(players, %{"rounds" => rounds}) do
    {question, answer} = YouBet.Questions.random()

    %{
      round: 1,
      total_rounds: rounds,
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
      bets: initial_map(players),
      final_bets: initial_map(players)
    }
  end

  def sanitize_state(%{stage: :guessing} = state, player_id) do
    %{players: players, guesses: guesses} = state

    state
    |> Map.put(:your_guess, guesses[player_id])
    |> Map.put(:awaiting_guess, get_awaiting(guesses, players, player_id))
    |> format_scores
    |> add_final_round
    |> Map.take([:awaiting_guess, :final_round, :question, :round, :scores, :stage, :your_guess])
  end
  def sanitize_state(%{stage: :betting} = state, player_id) do
    %{players: players, final_bets: final_bets, scores: scores} = state

    state
    |> Map.put(:your_bets, final_bets[player_id])
    |> Map.put(:awaiting_bet, get_awaiting(final_bets, players, player_id))
    |> Map.put(:your_score, scores[player_id])
    |> add_bets_to_bet_options
    |> format_scores
    |> add_final_round
    |> Map.take([:awaiting_bet, :bet_options, :final_round, :question, :round, :scores, :stage, :your_bets, :your_score])
  end
  def sanitize_state(%{stage: :reveal} = state, _) do
    state
    |> add_closest_guess
    |> format_payouts
    |> format_scores
    |> add_final_round
    |> Map.take([:answer, :closest_guess, :final_round, :payouts, :question, :round, :scores, :stage])
  end
  def sanitize_state(%{stage: :end} = state, _) do
    state
    |> format_scores
    |> Map.take([:stage, :scores])
  end

  defp add_bets_to_bet_options(state) do
    %{bets: bets, bet_options: bet_options} = state

    new_bet_options = Enum.map(bet_options, fn %{guess: guess} = option ->
      Map.put(
        option,
        :bets,
        bets
        |> Enum.flat_map(fn {_, bs} ->
          if is_nil(bs) do
            []
          else
            Enum.map(bs, fn b -> %{guess: b[:guess], total: b[:base_wager] + b[:extra_wager]} end)
          end
        end)
        |> Enum.filter(fn b -> b[:guess] == guess end)
        |> Enum.reduce(0, fn b, sum -> sum + b[:total] end)
      )
    end)

    Map.put(state, :bet_options, new_bet_options)
  end

  defp add_closest_guess(state) do
    %{guesses: guesses, answer: answer} = state

    valid_guesses =
      guesses
      |> Map.values
      |> Enum.reject(fn g -> g > answer end)
      |> Enum.sort_by(fn g -> -g end)

    closest_guess = if Enum.count(valid_guesses) > 0, do: hd(valid_guesses), else: nil

    Map.put(state, :closest_guess, closest_guess)
  end

  defp format_payouts(state) do
    %{payouts: payouts, players: players} = state

    state
    |> Map.put(
      :payouts,
      payouts
      |> Enum.map(fn {id, payout} -> Map.put(payout, :player, players[id]) end)
      |> Enum.sort_by(fn %{player: %{name: name}} -> name end)
      |> Enum.sort_by(fn %{delta: delta} -> -delta end)
      |> Enum.sort_by(fn %{closest: closest} -> if closest, do: 0, else: 1 end)
    )
  end

  defp format_scores(state) do
    %{scores: scores, players: players} = state

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

  def play(state, player_id, "bet", bets) do
    state
    |> Map.update!(:bets, &Map.put(&1, player_id, Enum.map(bets, fn bet ->
      %{guess: bet["guess"], base_wager: bet["base_wager"], extra_wager: bet["extra_wager"]}
    end)))
  end

  def play(state, player_id, "finalize_bets", bets) do
    state
    |> Map.update!(:final_bets, &Map.put(&1, player_id, Enum.map(bets, fn bet ->
      %{guess: bet["guess"], base_wager: bet["base_wager"], extra_wager: bet["extra_wager"]}
    end)))
    |> transition_to_reveal_if_done
  end

  def play(%{round: a, total_rounds: a} = state, _, "advance_round", _) do
    state
    |> Map.put(:round, nil)
    |> Map.put(:stage, :end)
    |> Map.put(:question, nil)
    |> Map.put(:answer, nil)
    |> Map.put(:guesses, nil)
    |> Map.put(:bets, nil)
    |> Map.put(:final_bets, nil)
  end
  def play(state, _, "advance_round", _) do
    %{players: players} = state

    {question, answer} = YouBet.Questions.random()

    state
    |> Map.update!(:round, &(&1 + 1))
    |> Map.put(:stage, :guessing)
    |> Map.put(:question, question)
    |> Map.put(:answer, answer)
    |> Map.put(:guesses, initial_map(players))
    |> Map.put(:bets, initial_map(players))
    |> Map.put(:final_bets, initial_map(players))
  end
  def play(state, _player_id, "restart", _) do
    initial_state(state[:players], %{"rounds" => state[:total_rounds]})
  end

  def play(state, _, _, _), do: state
  def play(state, _, _), do: state

  defp transition_to_betting_if_done(state) do
    %{guesses: guesses, players: players} = state

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

  defp transition_to_reveal_if_done(state) do
    %{final_bets: final_bets} = state

    if all_populated?(final_bets) do
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

  defp update_scores(state) do
    %{scores: scores, players: players, guesses: guesses, odds: odds, final_bets: final_bets, answer: answer} = state
    {new_scores, payouts} = YouBet.Scores.update(scores, players, guesses, odds, final_bets, answer)

    state
    |> Map.put(:payouts, payouts)
    |> Map.put(:scores, new_scores)
  end

  defp get_bet_options(guesses_by_player_id, players, odds) do
    bet_options =
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

    [%{guess: "less", odds: odds["less"]}|bet_options]
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

    odds =
      guesses
      |> Enum.with_index
      |> Enum.reduce(%{}, fn {guess, index}, acc ->
        Map.put(acc, guess, Float.round(abs(index - mid_point) + base))
      end)

    {_, max_odds} = Enum.max_by(odds, fn {_, o} -> o end)

    Map.put(odds, "less", max_odds + 1)
  end

  defp add_final_round(state) do
    Map.put(state, :final_round, state[:round] == state[:total_rounds])
  end

  defp initial_map(players, initial_value \\ nil) do
    Enum.reduce(players, %{}, fn {id, _}, acc -> Map.put(acc, id, initial_value) end)
  end
end
