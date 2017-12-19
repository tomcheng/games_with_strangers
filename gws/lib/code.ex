defmodule GWS.Code do

  def generate do
    (1..4)
    |> Enum.map(fn _ ->
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
      |> String.split("", trim: true)
      |> Enum.random
    end)
    |> Enum.join("")
  end
end