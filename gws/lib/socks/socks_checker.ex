defmodule SocksChecker do
  def is_set?(guess) do
    socks =
      guess
      |> MapSet.to_list()

    [:color, :length, :pattern, :smell]
    |> Enum.all?(fn prop ->
      uniques =
        socks
        |> Enum.uniq_by(&Map.get(&1, prop))
        |> Enum.count()

      uniques == 1 || uniques == 3
    end)
  end

  def has_match?(socks) do
    count = Enum.count(socks)

    cond do
      count < 3 ->
        false

      count == 3 ->
        is_set?(MapSet.new(socks))

      true ->
        0..(count - 3)
        |> Enum.any?(fn firstIndex ->
          first = Enum.at(socks, firstIndex)

          (firstIndex + 1)..(count - 2)
          |> Enum.any?(fn secondIndex ->
            second = Enum.at(socks, secondIndex)

            (secondIndex + 1)..(count - 1)
            |> Enum.any?(fn thirdIndex ->
              third = Enum.at(socks, thirdIndex)
              is_set?(MapSet.new([first, second, third]))
            end)
          end)
        end)
    end
  end
end
