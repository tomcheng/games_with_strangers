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
          {id, %{id: id, name: name, guess: nil, bet: nil, score: 200}}
        end)
        |> Enum.into(%{})
    }
  end

  def sanitize_state(%{stage: stage} = state, player_id) do
    state
    |> add_guesses_if_betting
    |> split_between_you_and_others(player_id)
    |> update_you(fn player ->
      if stage == :guessing do
        Map.drop(player, [:bet])
      else
        Map.drop(player, [:guess])
      end
    end)
    |> update_others(fn %{guess: guess} = player ->
      if stage == :guessing do
        player
        |> Map.put(:guessed, !is_nil(guess))
        |> Map.drop([:guess, :bet])
      else
        Map.drop(player, [:guess])
      end
    end)
    |> Map.drop([:answer])
  end

  def play(state, player_id, "guess", payload) do
    state
    |> update_player(player_id, &Map.put(&1, :guess, elem(Integer.parse(payload), 0)))
    |> update_if_all_guesses_in
  end
  def play(state, player_id, "bet", payload) do
    state
    |> update_player(player_id, &Map.put(&1, :bet, payload))
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
  end
  def play(state, _, _, _), do: state
  def play(state, _, _), do: state

  defp update_if_all_guesses_in(%{players: players} = state) do
    if Enum.all?(players, fn {_, %{guess: guess}} -> !is_nil(guess) end) do
      Map.put(state, :stage, :betting)
    else
      state
    end
  end

  defp add_guesses_if_betting(%{stage: stage, players: players} = state) do
    if stage == :betting do
      state
      |> Map.put(:guesses, process_guesses(players))
    else
      state
    end
  end

  defp split_between_you_and_others(%{players: players} = state, player_id) do
    state
    |> Map.put(:you, players |> Enum.find({nil, nil}, fn {id, _} -> id == player_id end) |> elem(1))
    |> Map.put(:others, players |> Enum.reject(fn {id, _} -> id == player_id end) |> Enum.map(&elem(&1, 1)))
    |> Map.drop([:players])
  end

  defp process_guesses(players) do
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

  defp update_you(state, transformation) do
    new_you = if state[:you], do: transformation.(state[:you]), else: nil

    Map.put(state, :you, new_you)
  end

  defp update_others(state, transformation) do
    state
    |> Map.update!(:others, fn players ->
      Enum.map(players, &transformation.(&1))
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
