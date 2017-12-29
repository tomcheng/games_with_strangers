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
      |> YouBet.sanitize_state("1")

    assert state[:round] == 1
    assert state[:stage] == :guessing
    assert String.match?(state[:question], ~r/.*\?$/)
    assert state[:answer] == nil
    assert state[:you] == %{id: "1", name: "foo", score: 200, guess: nil}
    assert state[:others] == [
      %{id: "2", name: "bar", score: 200, guessed: false},
      %{id: "3", name: "baz", score: 200, guessed: false}
    ]
  end

  test "makes an empty play", %{players: players} do
    state =
      players
      |> YouBet.initial_state
      |> YouBet.play("1", "foo")
      |> YouBet.sanitize_state("1")

    assert state[:round] == 1
    assert state[:stage] == :guessing
  end

  test "handles a guess", %{players: players} do
    state =
      players
      |> YouBet.initial_state
      |> YouBet.play("1", "guess", "20")
      |> YouBet.sanitize_state("1")

    assert state[:you] == %{id: "1", name: "foo", score: 200, guess: 20}
  end

  test "sets stage to betting when all guesses are in", %{players: players} do
    state =
      players
      |> YouBet.initial_state
      |> YouBet.play("1", "guess", "30")
      |> YouBet.play("2", "guess", "20")
      |> YouBet.play("3", "guess", "10")
      |> YouBet.sanitize_state("1")

    assert state[:stage] == :betting
    assert state[:you] == %{id: "1", name: "foo", score: 200, guess: 30}
    assert state[:others] == [
      %{id: "2", name: "bar", score: 200, guess: 20},
      %{id: "3", name: "baz", score: 200, guess: 10}
    ]
    assert state[:guesses] == [
      %{guess: 10, odds: 3, players: ["baz"]},
      %{guess: 20, odds: 2, players: ["bar"]},
      %{guess: 30, odds: 3, players: ["foo"]}
    ]
  end

  test "sets correct odds for even number of guesses", %{players: players} do
    state =
      players
      |> YouBet.initial_state
      |> YouBet.play("1", "guess", "20")
      |> YouBet.play("2", "guess", "20")
      |> YouBet.play("3", "guess", "10")
      |> YouBet.sanitize_state("1")

    assert state[:guesses] == [
      %{guess: 10, odds: 3, players: ["baz"]},
      %{guess: 20, odds: 3, players: ["bar", "foo"]},
    ]
  end

  test "handles finalizing bets", %{players: players} do
    state =
      players
      |> YouBet.initial_state
      |> YouBet.play("1", "guess", "30")
      |> YouBet.play("2", "guess", "20")
      |> YouBet.play("3", "guess", "10")
      |> YouBet.play("1", "finalize_bets", %{
        "bet1" => %{"guess" => 20, "wager" => 100},
        "bet2" => %{"guess" => 30, "wager" => 100}
      })

    you =
      state
      |> YouBet.sanitize_state("1")
      |> Map.get(:you)

    others_view_of_you =
      state
      |> YouBet.sanitize_state("2")
      |> Map.get(:others)
      |> Enum.find(fn p -> p[:id] == "1" end)

    assert you[:bets] == [%{guess: 20, wager: 100}, %{guess: 30, wager: 100}]
    assert you[:bets_finalized] == true

    assert others_view_of_you[:bets_finalized] == true
  end

  test "shows answer when all bets are in", %{players: players} do
    state =
      players
      |> YouBet.initial_state
      |> YouBet.play("1", "guess", "30")
      |> YouBet.play("2", "guess", "20")
      |> YouBet.play("3", "guess", "10")
      |> YouBet.play("1", "finalize_bets", %{
        "bet1" => %{"guess" => 20, "wager" => 100},
        "bet2" => %{"guess" => 30, "wager" => 100}
      })
      |> YouBet.play("2", "finalize_bets", %{
        "bet1" => %{"guess" => 20, "wager" => 100},
        "bet2" => %{"guess" => 30, "wager" => 100}
      })
      |> YouBet.play("3", "finalize_bets", %{
        "bet1" => %{"guess" => 20, "wager" => 100},
        "bet2" => %{"guess" => 30, "wager" => 100}
      })
      |> YouBet.sanitize_state("1")

    assert state[:stage] == :reveal
    assert is_integer(state[:answer])
  end

  test "handles missing player", %{players: players} do
    state =
      players
      |> YouBet.initial_state
      |> YouBet.sanitize_state(nil)

    assert state[:you] == nil
    assert state[:others] == [
      %{id: "1", name: "foo", score: 200, guessed: false},
      %{id: "2", name: "bar", score: 200, guessed: false},
      %{id: "3", name: "baz", score: 200, guessed: false}
    ]
  end
end
