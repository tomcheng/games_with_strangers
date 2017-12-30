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
      bets: Enum.reduce(players, %{}, fn {id, _}, bets -> Map.put(bets, id, nil) end)
    }
  end

  def sanitize_state(%{stage: :guessing, players: players, guesses: guesses} = state, player_id) do
    state
    |> Map.put(:your_guess, guesses[player_id])
    |> Map.put(:awaiting_guess, get_awaiting(guesses, players, player_id))
    |> Map.drop([:answer, :players])
  end

  def sanitize_state(%{stage: :betting, players: players, guesses: guesses, bets: bets} = state, player_id) do
    state
    |> Map.put(:bet_options, get_bet_options(guesses, players))
    |> Map.put(:your_bets, bets[player_id])
    |> Map.put(:awaiting_bet, get_awaiting(bets, players, player_id))
    |> Map.drop([:answer, :players])
  end

  def sanitize_state(%{stage: :reveal} = state, _) do
    Map.drop(state, [:players])
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
      Map.put(state, :stage, :betting)
    else
      state
    end
  end

  defp update_stage(%{stage: :betting, bets: bets} = state) do
    if Enum.all?(bets, fn {_, b} -> !is_nil(b) end) do
      Map.put(state, :stage, :reveal)
    else
      state
    end
  end

  defp get_bet_options(guesses, players) do
    guesses
    |> Enum.group_by(fn {_, guess} -> guess end, fn {id, _} -> id end)
    |> Enum.sort_by(fn {guess, _} -> guess end)
    |> Enum.map(fn {guess, player_ids} ->
      %{
        guess: guess,
        players:
          player_ids
          |> Enum.map(fn id -> players[id] end)
          |> Enum.sort_by(&Map.get(&1, :name))
      }
    end)
    |> add_odds
  end

  defp add_odds(guesses) do
    num_guesses = Enum.count(guesses)
    mid_point = num_guesses / 2 - 0.5
    base = if rem(num_guesses, 2) == 0, do: 2.5, else: 2

    guesses
    |> Enum.with_index
    |> Enum.map(fn {guess, index} ->
      Map.put(guess, :odds, Float.round(abs(index - mid_point) + base))
    end)
  end
end
