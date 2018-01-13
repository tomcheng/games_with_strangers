defmodule FunPrompts do
  def minimum_players, do: 3

  def initial_state(players, %{"rounds" => rounds}) do
    %{
      round: 1,
      stage: :writing,
      total_rounds: rounds,
      players: players,
      scores: Enum.reduce(players, %{}, fn {id, _}, acc -> Map.put(acc, id, 0) end),
      matchups: get_matchups(players),
      answers: get_empty_answers(Enum.count(players))
    }
  end

  def sanitize_state(%{stage: :writing} = state, player_id) do
    state
    |> add_prompts_for_player(player_id)
    |> add_awaiting_answer(player_id)
    |> Map.take([:awaiting_answer, :prompts, :round, :stage])
  end
  def sanitize_state(%{stage: :voting} = state, player_id) do
    %{current_matchup_id: matchup_id, matchups: matchups, answers: answers, players: players, votes: votes} = state
    %{id: matchup_id, player_ids: player_ids, prompt: prompt} = Enum.find(matchups, &(&1[:id] == matchup_id))

    choices = Enum.map(player_ids, fn id ->
      %{
        answer: answers[matchup_id][id],
        player: players[id],
        your_answer: id == player_id,
        votes:
          votes
          |> Enum.filter(fn v -> v[:votee_id] == id end)
          |> Enum.map(fn %{voter_id: id} -> players[id] end)
      }
    end)

    state
    |> Map.take([:round, :stage])
    |> Map.put(:prompt, prompt)
    |> Map.put(:choices, choices)
    |> Map.put(
      :awaiting_vote,
      players
      |> Map.values
      |> Enum.reject(fn p -> Enum.any?(choices, fn c -> c[:player][:id] == p[:id] end) end)
      |> Enum.reject(fn p -> Enum.any?(votes, fn v -> v[:voter_id] == p[:id] end) end)
    )
    |> Map.put(:you_answered, Enum.any?(choices, &Map.get(&1, :your_answer)))
    |> Map.put(:you_voted, Enum.any?(votes, fn v -> v[:voter_id] == player_id end))
  end
  def sanitize_state(%{stage: :show_scores} = state, _) do
    %{players: players} = state

    state
    |> Map.update!(:scores, fn scores ->
      scores
      |> Enum.map(fn {id, score} -> %{score: score, player: players[id]} end)
      |> Enum.sort_by(fn s -> s[:player][:name] end)
      |> Enum.sort_by(fn s -> -s[:score] end)
    end)
    |> Map.take([:round, :scores, :stage])
  end
  def sanitize_state(%{stage: :end} = state, _) do
    %{players: players} = state

    state
    |> Map.update!(:scores, fn scores ->
      scores
      |> Enum.map(fn {id, score} -> %{score: score, player: players[id]} end)
      |> Enum.sort_by(fn s -> s[:player][:name] end)
      |> Enum.sort_by(fn s -> -s[:score] end)
    end)
    |> Map.take([:round, :scores, :stage])
  end

  def play(state, player_id, "answer", payload) do
    %{"id" => matchup_id, "answer" => answer} = payload

    state
    |> Map.update!(:answers, fn ans ->
      Map.update!(ans, matchup_id, &Map.put(&1, player_id, answer))
    end)
    |> change_to_voting_if_all_answers_in
  end
  def play(state, player_id, "vote", payload) do
    %{votes: votes} = state
    %{"player_id" => votee_id} = payload

    if Enum.any?(votes, fn v -> v[:voter_id] == player_id end) do
      state
    else
      Map.put(state, :votes, [%{voter_id: player_id, votee_id: votee_id}|votes])
    end
  end
  def play(%{stage: :voting} = state, _, "advance", _) do
    %{current_matchup_id: current_matchup_id, players: players, round: round, total_rounds: total_rounds} = state

    if current_matchup_id === Enum.count(players) do
      state
      |> update_scores
      |> Map.put(:stage, (if round == total_rounds, do: :end, else: :show_scores))
    else
      state
      |> update_scores
      |> Map.put(:current_matchup_id, current_matchup_id + 1)
      |> Map.put(:votes, [])
    end
  end
  def play(%{stage: :show_scores} = state, _, "advance", _) do
    %{players: players} = state

    state
    |> Map.update!(:round, &(&1 + 1))
    |> Map.put(:stage, :writing)
    |> Map.put(:matchups, get_matchups(players))
    |> Map.put(:answers, get_empty_answers(Enum.count(players)))
  end
  def play(state, _, "restart", _) do
    %{players: players, total_rounds: total_rounds} = state

    initial_state(players, %{"rounds" => total_rounds})
  end

  defp update_scores(state) do
    %{votes: votes, round: round} = state

    Map.update!(state, :scores, fn scores ->
      Enum.reduce(votes, scores, fn v, s ->
        Map.update!(s, v[:votee_id], &(&1 + 100 * round))
      end)
    end)
  end

  defp get_matchups(players) do
    prompts =
      players
      |> Enum.count
      |> FunPrompts.Prompts.get_random
    player_ids =
      players
      |> Enum.map(fn {id, _} -> id end)
      |> Enum.shuffle

    player_ids
    |> Enum.with_index
    |> Enum.map(fn {id, index} ->
      %{
        id: index + 1,
        player_ids: [id, Enum.at(player_ids, rem(index + 1, Enum.count(players)))],
        prompt: Enum.at(prompts, index)
      }
    end)
  end

  defp get_empty_answers(num) do
    Enum.reduce((1..num), %{}, fn id, acc -> Map.put(acc, id, %{}) end)
  end

  defp add_prompts_for_player(state, player_id) do
    %{matchups: matchups, answers: answers} = state

    prompts =
      matchups
      |> Enum.filter(fn %{id: id, player_ids: player_ids} ->
        Enum.member?(player_ids, player_id) && is_nil(answers[id][player_id])
      end)
      |> Enum.map(fn m -> Map.take(m, [:prompt, :id]) end)

    Map.put(state, :prompts, prompts)
  end

  defp add_awaiting_answer(state, player_id) do
    %{players: players, answers: answers} = state

    answered_id =
      answers
      |> Enum.flat_map(fn {_, ans} -> Enum.map(ans, fn {id, _} -> id end) end)
      |> Enum.group_by(&(&1))
      |> Enum.reject(fn {_, ids} -> Enum.count(ids) < 2 end)
      |> Enum.map(fn {id, _} -> id end)

    awaiting =
      players
      |> Map.drop([player_id])
      |> Enum.map(fn {_, p} -> p end)
      |> Enum.reject(fn p -> Enum.member?(answered_id, p[:id]) end)
      |> Enum.sort_by(&Map.get(&1, :name))

    Map.put(state, :awaiting_answer, awaiting)
  end

  defp change_to_voting_if_all_answers_in(state) do
    if all_answers_in(state[:answers]) do
      state
      |> Map.put(:stage, :voting)
      |> Map.put(:current_matchup_id, 1)
      |> Map.put(:votes, [])
    else
      state
    end
  end

  defp all_answers_in(answers) do
    Enum.all?(answers, fn {_, a} -> Enum.count(a) == 2 end)
  end
end
