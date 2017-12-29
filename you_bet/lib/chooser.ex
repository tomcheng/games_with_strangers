defmodule YouBet.Chooser do
  def choose(choices) do
    total_weights =
      choices
      |> Enum.reduce(0, fn {w, _}, sum -> sum + w end)

    random = :rand.uniform(total_weights)

    do_choose(choices, random)
  end

  defp do_choose([{_, last}], _) do
    last.()
  end
  defp do_choose([{w, func}|tail], random) do
    if random <= w do
      func.()
    else
      do_choose(tail, random - w)
    end
  end
end