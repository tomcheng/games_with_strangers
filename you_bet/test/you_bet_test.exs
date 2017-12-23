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
      |> YouBet.sanitize_state

    assert state == %{
      round: 1,
      stage: :guessing,
      question: "how much?",
      players: %{
        "1" => %{id: "1", score: 200, guessed: false},
        "2" => %{id: "2", score: 200, guessed: false},
        "3" => %{id: "3", score: 200, guessed: false}
      }
    }
  end

  test "makes an empty play", %{players: players} do
    state =
      players
      |> YouBet.initial_state
      |> YouBet.play("1", "foo")
      |> YouBet.sanitize_state

    assert state == %{
      round: 1,
      stage: :guessing,
      question: "how much?",
      players: %{
        "1" => %{id: "1", score: 200, guessed: false},
        "2" => %{id: "2", score: 200, guessed: false},
        "3" => %{id: "3", score: 200, guessed: false}
      }
    }
  end

  test "handles a guess", %{players: players} do
    state =
      players
      |> YouBet.initial_state
      |> YouBet.play("1", "guess", "20")
      |> YouBet.sanitize_state

    assert state == %{
      round: 1,
      stage: :guessing,
      question: "how much?",
      players: %{
        "1" => %{id: "1", score: 200, guessed: true},
        "2" => %{id: "2", score: 200, guessed: false},
        "3" => %{id: "3", score: 200, guessed: false}
      }
    }
  end

  test "sets stage to betting when all guesses are in", %{players: players} do
    state =
      players
      |> YouBet.initial_state
      |> YouBet.play("1", "guess", "30")
      |> YouBet.play("2", "guess", "20")
      |> YouBet.play("3", "guess", "10")
      |> YouBet.sanitize_state

    assert state == %{
      round: 1,
      stage: :betting,
      question: "how much?",
      players: %{
        "1" => %{id: "1", score: 200, bet: false},
        "2" => %{id: "2", score: 200, bet: false},
        "3" => %{id: "3", score: 200, bet: false}
      },
      guesses: [
        %{guess: 10, odds: 3, players: ["3"]},
        %{guess: 20, odds: 2, players: ["2"]},
        %{guess: 30, odds: 3, players: ["1"]}
      ]
    }
  end

  test "sets correct odds for even number of guesses", %{players: players} do
    state =
      players
      |> YouBet.initial_state
      |> YouBet.play("1", "guess", "20")
      |> YouBet.play("2", "guess", "20")
      |> YouBet.play("3", "guess", "10")
      |> YouBet.sanitize_state

    assert state == %{
      round: 1,
      stage: :betting,
      question: "how much?",
      players: %{
        "1" => %{id: "1", score: 200, bet: false},
        "2" => %{id: "2", score: 200, bet: false},
        "3" => %{id: "3", score: 200, bet: false}
      },
      guesses: [
        %{guess: 10, odds: 3, players: ["3"]},
        %{guess: 20, odds: 3, players: ["1", "2"]},
      ]
    }
  end
end
