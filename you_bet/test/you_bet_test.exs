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
    assert state[:your_guess] == nil
    assert state[:awaiting_guess] == [%{id: "2", name: "bar"}, %{id: "3", name: "baz"}]
    assert state[:scores] == %{"1" => 200, "2" => 200, "3" => 200}
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

    your_state = YouBet.sanitize_state(state, "1")
    others_state = YouBet.sanitize_state(state, "2")

    assert your_state[:your_guess] == 20
    assert your_state[:awaiting_guess] == [%{id: "2", name: "bar"}, %{id: "3", name: "baz"}]
    assert others_state[:your_guess] == nil
    assert others_state[:awaiting_guess] == [%{id: "3", name: "baz"}]
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
    assert state[:your_guess] == nil
    assert state[:your_bets] == nil
    assert state[:bet_options] == [
      %{guess: 10, odds: 3, players: [%{id: "3", name: "baz"}]},
      %{guess: 20, odds: 2, players: [%{id: "2", name: "bar"}]},
      %{guess: 30, odds: 3, players: [%{id: "1", name: "foo"}]}
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

    assert state[:bet_options] == [
      %{guess: 10, odds: 3, players: [%{id: "3", name: "baz"}]},
      %{guess: 20, odds: 3, players: [%{id: "2", name: "bar"}, %{id: "1", name: "foo"}]},
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

    your_state = YouBet.sanitize_state(state, "1")

    others_state = YouBet.sanitize_state(state, "2")

    assert your_state[:your_bets] == [%{guess: 20, wager: 100}, %{guess: 30, wager: 100}]
    assert your_state[:awaiting_bet] == [%{id: "2", name: "bar"}, %{id: "3", name: "baz"}]

    assert others_state[:your_bets] == nil
    assert others_state[:awaiting_bet] == [%{id: "3", name: "baz"}]
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

    assert state[:round] == 1
    assert state[:stage] == :guessing
  end
end
