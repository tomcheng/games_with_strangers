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
      scores:
        players
        |> Enum.map(fn {_, p} -> %{player: p, score: 0} end)
        |> Enum.sort_by(fn %{player: p} -> p[:name] end),
      order: order,
      all_prompts: prompts,
      match_ups: get_matchups(order, prompts, 1)
    }
  end

  def sanitize_state(state, player_id) do
    state
    |> add_prompts_for_player(player_id)
    |> Map.take([:prompts, :round, :scores, :stage])
  end

  defp get_matchups(order, prompts, offset) do
    order
    |> Enum.with_index
    |> Enum.map(fn {id, index} ->
      %{
        id: index + 1,
        players: [id, Enum.at(order, rem(index + offset, Enum.count(order)))],
        prompt: Enum.at(prompts, index)
      }
    end)
  end

  defp add_prompts_for_player(%{match_ups: match_ups} = state, player_id) do
    prompts =
      match_ups
      |> Enum.filter(fn %{players: players} ->
        Enum.member?(players, player_id)
      end)
      |> Enum.map(fn m -> Map.take(m, [:prompt, :id]) end)

    Map.put(state, :prompts, prompts)
  end
end
