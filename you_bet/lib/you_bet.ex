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

  def sanitize_state(%{stage: stage} = state, player_id) do
    state
    |> apply_if(&add_your_guess(&1, player_id), stage == :guessing)
    |> apply_if(&add_awaiting_guess(&1, player_id), stage == :guessing)
    |> apply_if(&add_bet_options/1, stage == :betting)
    |> apply_if(&add_your_bet(&1, player_id), stage == :betting)
    |> apply_if(&add_awaiting_bet(&1, player_id), stage == :betting)
    |> apply_if(&hide_answer/1, stage !== :reveal)
    |> split_you_and_others(player_id)
  end

  defp add_bet_options(%{guesses: guesses, players: players} = state) do
    Map.put(state, :bet_options, get_bet_options(guesses, players))
  end

  defp split_you_and_others(%{players: players} = state, player_id) do
    state
    |> Map.put(:you, players |> Enum.find({nil, nil}, fn {id, _} -> id == player_id end) |> elem(1))
    |> Map.put(:others, players |> Enum.reject(fn {id, _} -> id == player_id end) |> Enum.map(&elem(&1, 1)))
    |> Map.drop([:players])
  end

  defp add_your_guess(%{guesses: guesses} = state, player_id), do: Map.put(state, :your_guess, guesses[player_id])

  defp add_awaiting_guess(%{guesses: guesses, players: players} = state, player_id) do
    state
    |> Map.put(
      :awaiting_guess,
      guesses
      |> Enum.reject(fn {id, g} -> !is_nil(g) || id == player_id end)
      |> Enum.map(fn {id, _} -> players[id] end)
    )
  end

  defp add_your_bet(%{bets: bets} = state, player_id), do: Map.put(state, :your_bets, bets[player_id])

  defp add_awaiting_bet(%{bets: bets, players: players} = state, player_id) do
    state
    |> Map.put(
      :awaiting_bet,
      bets
      |> Enum.reject(fn {id, b} -> !is_nil(b) || id == player_id end)
      |> Enum.map(fn {id, _} -> players[id] end)
    )
  end

  defp hide_answer(state), do: Map.drop(state, [:answer])

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

  defp update_stage(%{stage: stage, guesses: guesses, bets: bets} = state) do
    state
    |> apply_if(&Map.put(&1, :stage, :betting), stage == :guessing && Enum.all?(guesses, fn {_, g} -> !is_nil(g) end))
    |> apply_if(&Map.put(&1, :stage, :reveal), stage == :betting && Enum.all?(bets, fn {_, b} -> !is_nil(b) end))
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

  defp apply_if(subject, _, false), do: subject
  defp apply_if(subject, func, _), do: func.(subject)
end
