defmodule ChooserTest do
  use ExUnit.Case

  test "chooses based on weights" do
    choice = YouBet.Chooser.choose([
      {1, fn -> "foo" end},
      {0, fn -> "bar" end}
    ])

    assert choice == "foo"
  end

  test "order doesn't matter" do
    choice = YouBet.Chooser.choose([
      {0, fn -> "bar" end},
      {1, fn -> "foo" end}
    ])

    assert choice == "foo"
  end

  test "roughly gives right probabilities" do
    choices =
      (1..1000)
      |> Enum.map(fn _ ->
        YouBet.Chooser.choose([
          {1, fn -> "bar" end},
          {3, fn -> "foo" end},
          {6, fn -> "baz" end}
        ])
      end)
      |> Enum.group_by(&(&1))


    assert abs(Enum.count(choices["bar"]) - 100) < 50
    assert abs(Enum.count(choices["foo"]) - 300) < 50
    assert abs(Enum.count(choices["baz"]) - 600) < 50
  end

end