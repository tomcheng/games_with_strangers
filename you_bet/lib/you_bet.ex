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
          {id, %{id: id, name: name, guess: nil, score: 200}}
        end)
        |> Enum.into(%{})
    }
  end

  def sanitize_state(%{stage: stage} = state, player_id) do
    state
    |> apply_if(&add_guesses/1, stage == :betting)
    |> split_you_and_others(player_id)
    |> apply_if(&hide_others_guesses/1, stage == :guessing)
    |> apply_if(&hide_answer/1, stage !== :reveal)
  end

  defp add_guesses(%{players: players} = state), do: Map.put(state, :guesses, get_guesses(players))

  defp split_you_and_others(%{players: players} = state, player_id) do
    state
    |> Map.put(:you, players |> Enum.find({nil, nil}, fn {id, _} -> id == player_id end) |> elem(1))
    |> Map.put(:others, players |> Enum.reject(fn {id, _} -> id == player_id end) |> Enum.map(&elem(&1, 1)))
    |> Map.drop([:players])
  end

  defp hide_others_guesses(state) do
    update_others(state, fn %{guess: guess} = player ->
      player
      |> Map.put(:guessed, !is_nil(guess))
      |> Map.drop([:guess])
    end)
  end

  defp hide_answer(state), do: Map.drop(state, [:answer])

  def play(state, player_id, "guess", payload) do
    state
    |> update_player(player_id, &Map.put(&1, :guess, elem(Integer.parse(payload), 0)))
    |> update_stage
  end

  def play(state, player_id, "finalize_bets", %{
    "bet1" => %{"guess" => guess1, "wager" => wager1},
    "bet2" => %{"guess" => guess2, "wager" => wager2}
  }) do
    state
    |> update_player(player_id, fn player ->
      player
      |> Map.put(:bets, [%{guess: guess1, wager: wager1}, %{guess: guess2, wager: wager2}])
      |> Map.put(:bets_finalized, true)
    end)
    |> update_stage
  end

  def play(state, _, _, _), do: state
  def play(state, _, _), do: state

  defp update_stage(%{stage: stage} = state) do
    state
    |> apply_if(&Map.put(&1, :stage, :betting), stage == :guessing && all_players?(state, &(!is_nil(&1[:guess]))))
    |> apply_if(&Map.put(&1, :stage, :reveal), stage == :betting && all_players?(state, &(&1[:bets_finalized])))
  end

  defp get_guesses(players) do
    players
    |> Enum.group_by(fn {_, %{guess: guess}} -> guess end, fn {id, _} -> id end)
    |> Enum.sort_by(fn {guess, _} -> guess end)
    |> Enum.map(fn {guess, player_ids} ->
      %{
        guess: guess,
        players:
          player_ids
          |> Enum.map(fn id -> Map.get(players[id], :name) end)
          |> Enum.sort
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

  defp update_others(state, transformation) do
    state
    |> Map.update!(:others, fn players ->
      Enum.map(players, &transformation.(&1))
    end)
  end

  defp all_players?(%{players: players}, pred) do
    Enum.all?(players, fn {_, p} -> pred.(p) end)
  end

  defp apply_if(subject, _, false), do: subject
  defp apply_if(subject, func, _), do: func.(subject)
end
