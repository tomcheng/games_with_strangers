defmodule YouBetTest do
  use ExUnit.Case
  doctest YouBet

  setup do
    players = %{
      "1" => %{id: "1", name: "foo"},
      "2" => %{id: "2", name: "bar"},
      "3" => %{id: "3", name: "baz"}
    }
    %{players: players}
  end

  test "minumum of 3 players" do
    assert YouBet.minimum_players() == 3
  end

  test "initial game state", %{players: players} do
    state =
      players
      |> YouBet.initial_state

    assert state == %{
      round: 1,
      stage: :guessing,
      question: "how much?",
      players: %{
        "1" => %{id: "1", score: 200},
        "2" => %{id: "2", score: 200},
        "3" => %{id: "3", score: 200}
      }
    }
  end

  test "makes an empty play", %{players: players} do
    state =
      players
      |> YouBet.initial_state
      |> YouBet.play(%{})

    assert state == %{
      round: 1,
      stage: :guessing,
      question: "how much?",
      players: %{
        "1" => %{id: "1", score: 200},
        "2" => %{id: "2", score: 200},
        "3" => %{id: "3", score: 200}
      }
    }
  end
end
