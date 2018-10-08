defmodule SocksChecker do
  @all_socks for c <- [1, 2, 3],
                 l <- [1, 2, 3],
                 p <- [1, 2, 3],
                 s <- [1, 2, 3],
                 do: %{
                   id:
                     Integer.to_string(c) <>
                       Integer.to_string(l) <> Integer.to_string(p) <> Integer.to_string(s),
                   color: c,
                   length: l,
                   pattern: p,
                   smell: s
                 }

  @all_socks_by_id Enum.reduce(@all_socks, %{}, fn sock, acc ->
                     Map.put(acc, sock[:id], sock)
                   end)

  def get_initial_socks() do
    socks =
      @all_socks
      |> Enum.shuffle()
      |> Enum.take(9)

    if has_match?(socks) do
      socks
    else
      get_initial_socks()
    end
  end

  def select_socks(used_sock_ids, current_sock_ids, tries \\ 0)

  def select_socks(_, _, 12) do
    []
  end

  def select_socks(used_sock_ids, current_sock_ids, tries) do
    current_socks =
      current_sock_ids
      |> MapSet.to_list()
      |> Enum.map(&Map.get(@all_socks_by_id, &1))

    new_socks =
      @all_socks
      |> Enum.reject(fn sock -> Enum.member?(used_sock_ids, sock[:id]) end)
      |> Enum.shuffle()
      |> Enum.take(3)

    cond do
      has_match?(Enum.concat(current_socks, new_socks)) -> new_socks
      true -> select_socks(used_sock_ids, current_sock_ids, tries + 1)
    end
  end

  def has_match?(socks) do
    count = Enum.count(socks)
    sock_ids = Enum.map(socks, & &1[:id])

    cond do
      count < 3 ->
        false

      count == 3 ->
        is_set?(MapSet.new(sock_ids))

      true ->
        0..(count - 3)
        |> Enum.any?(fn firstIndex ->
          first = Enum.at(sock_ids, firstIndex)

          (firstIndex + 1)..(count - 2)
          |> Enum.any?(fn secondIndex ->
            second = Enum.at(sock_ids, secondIndex)

            (secondIndex + 1)..(count - 1)
            |> Enum.any?(fn thirdIndex ->
              third = Enum.at(sock_ids, thirdIndex)
              is_set?(MapSet.new([first, second, third]))
            end)
          end)
        end)
    end
  end

  def is_set?(guess) do
    sock_ids = MapSet.to_list(guess)

    [:color, :length, :pattern, :smell]
    |> Enum.all?(fn prop ->
      uniques =
        sock_ids
        |> Enum.map(&Map.get(@all_socks_by_id, &1))
        |> Enum.uniq_by(&Map.get(&1, prop))
        |> Enum.count()

      uniques == 1 || uniques == 3
    end)
  end
end
