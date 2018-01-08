defmodule FunPrompts do
  def minimum_players, do: 2

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
      match_ups: get_matchups(order, prompts, 1),
      current_matchup_id: nil,
      answers: get_empty_answers(Enum.count(players))
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
      current_matchup_id: match_up_id,
      match_ups: match_ups,
      answers: answers,
      players: players
    } = state, _player_id
  ) do
    %{id: match_up_id, player_ids: player_ids, prompt: prompt} =
      Enum.find(match_ups, &(&1[:id] == match_up_id))
    choices =
      player_ids
      |> Enum.map(fn id -> %{answer: answers[match_up_id][id], player: players[id]} end)

    state
    |> Map.put(:prompt, prompt)
    |> Map.put(:choices, choices)
    |> Map.take([:choices, :prompt, :round, :scores, :stage])
  end

  def play(state, player_id, "answer", %{"id" => match_up_id, "answer" => answer}) do
    state
    |> Map.update!(:answers, fn ans ->
      Map.update!(ans, match_up_id, &Map.put(&1, player_id, answer))
    end)
    |> change_to_voting_if_all_answers_in
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

  defp add_prompts_for_player(%{match_ups: match_ups, answers: answers} = state, player_id) do
    prompts =
      match_ups
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
    else
      state
    end
  end

  defp all_answers_in(answers) do
    Enum.all?(answers, fn {_, a} -> Enum.count(a) == 2 end)
  end
end
