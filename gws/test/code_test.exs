defmodule GWS.CodeTest do
  use ExUnit.Case

  test "generates random four letter codes" do
    codes = 1..100 |> Enum.map(fn _ -> GWS.Code.generate() end)

    assert Enum.all?(codes, &String.match?(&1, ~r/[A-Z]{4}/))
    assert codes |> Enum.uniq() |> Enum.count() == codes |> Enum.count()
  end
end
