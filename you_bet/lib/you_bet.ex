defmodule YouBet do
  def minimum_players, do: 3

  def initial_state(players) do
    %{
      round: 1,
      stage: :guessing,
      question: "how much?",
      players: players
        |> Enum.map(fn {id, _} -> {id, %{id: id, score: 200}} end)
        |> Enum.into(%{})
    }
  end

  def play(state, _) do
    state
  end
end
