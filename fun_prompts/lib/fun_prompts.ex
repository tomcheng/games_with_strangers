defmodule FunPrompts do
  def minimum_players, do: 3

  def initial_state(players) do
    prompts = FunPrompts.Prompts.get_random(Enum.count(players))
    order =
      players
      |> Enum.map(fn {id, _} -> id end)
      |> Enum.shuffle

    %{
      round: 1,
      stage: :writing,
      players: players,
      scores:
        players
        |> Enum.map(fn {_, p} -> %{player: p, score: 0} end)
        |> Enum.sort_by(fn %{player: p} -> p[:name] end),
      order: order,
      all_prompts: prompts,
      matchups: get_matchups(order, prompts, 1),
      current_matchup_id: nil,
      answers: get_empty_answers(Enum.count(players)),
      votes: nil
    }
  end

  def sanitize_state(%{stage: :writing} = state, player_id) do
    state
    |> add_prompts_for_player(player_id)
    |> add_awaiting_answer(player_id)
    |> Map.take([:awaiting_answer, :prompts, :round, :scores, :stage])
  end

  def sanitize_state(
    %{
      stage: :voting,
      current_matchup_id: matchup_id,
      matchups: matchups,
      answers: answers,
      players: players
    } = state, player_id
  ) do
    %{id: matchup_id, player_ids: player_ids, prompt: prompt} =
      Enum.find(matchups, &(&1[:id] == matchup_id))

    choices =
      player_ids
      |> Enum.map(fn id ->
        %{
          answer: answers[matchup_id][id],
          player: players[id],
          your_choice: id == player_id
        }
      end)

    state
    |> Map.take([:round, :scores, :stage])
    |> Map.put(:prompt, prompt)
    |> Map.put(:choices, choices)
    |> Map.put(:you_answered, Enum.any?(choices, &Map.get(&1, :your_choice)))
  end

  def sanitize_state(
    %{
      stage: :voting_reveal,
      current_matchup_id: matchup_id,
      matchups: matchups,
      answers: answers,
      players: players,
      votes: votes
    } = state, _player_id
  ) do
    %{id: matchup_id, player_ids: player_ids, prompt: prompt} =
      Enum.find(matchups, &(&1[:id] == matchup_id))

    choices =
      player_ids
      |> Enum.map(fn id ->
        %{
          answer: answers[matchup_id][id],
          player: players[id],
          votes:
            votes
            |> Enum.filter(fn v -> v[:votee_id] == id end)
            |> Enum.map(fn %{voter_id: id} -> players[id] end)
        }
      end)

    state
    |> Map.take([:round, :scores, :stage])
    |> Map.put(:prompt, prompt)
    |> Map.put(:choices, choices)
  end

  def play(state, player_id, "answer", %{"id" => matchup_id, "answer" => answer}) do
    state
    |> Map.update!(:answers, fn ans ->
      Map.update!(ans, matchup_id, &Map.put(&1, player_id, answer))
    end)
    |> change_to_voting_if_all_answers_in
  end

  def play(state, player_id, "vote", %{"player_id" => votee_id}) do
    state
    |> Map.update!(:votes, fn votes ->
      [%{voter_id: player_id, votee_id: votee_id}|votes]
    end)
    |> change_to_voting_reveal_if_all_votes_in
  end

  defp get_matchups(order, prompts, offset) do
    order
    |> Enum.with_index
    |> Enum.map(fn {id, index} ->
      %{
        id: index + 1,
        player_ids: [id, Enum.at(order, rem(index + offset, Enum.count(order)))],
        prompt: Enum.at(prompts, index)
      }
    end)
  end

  defp get_empty_answers(num) do
    Enum.reduce((1..num), %{}, fn id, acc -> Map.put(acc, id, %{}) end)
  end

  defp add_prompts_for_player(%{matchups: matchups, answers: answers} = state, player_id) do
    prompts =
      matchups
      |> Enum.filter(fn %{id: id, player_ids: player_ids} ->
        Enum.member?(player_ids, player_id) && is_nil(answers[id][player_id])
      end)
      |> Enum.map(fn m -> Map.take(m, [:prompt, :id]) end)

    Map.put(state, :prompts, prompts)
  end

  defp add_awaiting_answer(%{players: players, answers: answers} = state, player_id) do
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

  defp change_to_voting_reveal_if_all_votes_in(%{players: players, votes: votes} = state) do
    if Enum.count(votes) == Enum.count(players) - 2 do
      Map.put(state, :stage, :voting_reveal)
    else
      state
    end
  end

  defp all_answers_in(answers) do
    Enum.all?(answers, fn {_, a} -> Enum.count(a) == 2 end)
  end
end
