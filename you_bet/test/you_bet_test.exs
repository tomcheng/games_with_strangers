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
    assert state[:scores] == [
      %{player: %{id: "2", name: "bar"}, score: 200},
      %{player: %{id: "3", name: "baz"}, score: 200},
      %{player: %{id: "1", name: "foo"}, score: 200}
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

    your_state = YouBet.sanitize_state(state, "1")
    others_state = YouBet.sanitize_state(state, "2")

    assert your_state[:your_guess] == 20
    assert your_state[:awaiting_guess] == [%{id: "2", name: "bar"}, %{id: "3", name: "baz"}]
    assert others_state[:your_guess] == nil
    assert others_state[:awaiting_guess] == [%{id: "3", name: "baz"}]
  end

  test "handles an invalid guess", %{players: players} do
    state =
      players
      |> YouBet.initial_state
      |> YouBet.play("1", "guess", "")

    your_state = YouBet.sanitize_state(state, "1")
    others_state = YouBet.sanitize_state(state, "2")

    assert your_state[:your_guess] == nil
    assert your_state[:awaiting_guess] == [%{id: "2", name: "bar"}, %{id: "3", name: "baz"}]
    assert others_state[:your_guess] == nil
    assert others_state[:awaiting_guess] == [%{id: "1", name: "foo"}, %{id: "3", name: "baz"}]
  end

  test "sets stage to betting when all guesses are in", %{players: players} do
    state =
      players
      |> YouBet.initial_state
      |> YouBet.play("1", "guess", "30")
      |> YouBet.play("2", "guess", "20")
      |> YouBet.play("3", "guess", "10")
      |> YouBet.sanitize_state("1")

    assert state[:round] == 1
    assert state[:stage] == :betting
    assert String.match?(state[:question], ~r/.*\?$/)
    assert state[:your_guess] == nil
    assert state[:your_bets] == nil
    assert state[:bet_options] == [
      %{guess: 10, odds: 3, players: [%{id: "3", name: "baz"}], bets: 0},
      %{guess: 20, odds: 2, players: [%{id: "2", name: "bar"}], bets: 0},
      %{guess: 30, odds: 3, players: [%{id: "1", name: "foo"}], bets: 0}
    ]
    assert state[:scores] == [
      %{player: %{id: "2", name: "bar"}, score: 200},
      %{player: %{id: "3", name: "baz"}, score: 200},
      %{player: %{id: "1", name: "foo"}, score: 200}
    ]
    assert state[:your_score] == 200
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
      %{guess: 10, odds: 3, players: [%{id: "3", name: "baz"}], bets: 0},
      %{guess: 20, odds: 3, players: [%{id: "2", name: "bar"}, %{id: "1", name: "foo"}], bets: 0},
    ]
  end

  test "handles bets", %{players: players} do
    state =
      players
      |> YouBet.initial_state
      |> YouBet.play("1", "guess", "30")
      |> YouBet.play("2", "guess", "20")
      |> YouBet.play("3", "guess", "10")
      |> YouBet.play("1", "bet", [
        %{"guess" => 20, "base_wager" => 100, "extra_wager" => 0},
        %{"guess" => 30, "base_wager" => 100, "extra_wager" => 0},
      ])
      |> YouBet.sanitize_state("1")

    assert state[:bet_options] == [
      %{guess: 10, odds: 3, players: [%{id: "3", name: "baz"}], bets: 0},
      %{guess: 20, odds: 2, players: [%{id: "2", name: "bar"}], bets: 100},
      %{guess: 30, odds: 3, players: [%{id: "1", name: "foo"}], bets: 100}
    ]
  end

  test "handles finalizing bets", %{players: players} do
    state =
      players
      |> YouBet.initial_state
      |> YouBet.play("1", "guess", "30")
      |> YouBet.play("2", "guess", "20")
      |> YouBet.play("3", "guess", "10")
      |> YouBet.play("1", "finalize_bets", [
        %{"guess" => 20, "base_wager" => 100, "extra_wager" => 0},
        %{"guess" => 30, "base_wager" => 100, "extra_wager" => 0},
      ])

    your_state = YouBet.sanitize_state(state, "1")

    others_state = YouBet.sanitize_state(state, "2")

    assert your_state[:your_bets] == [
      %{guess: 20, base_wager: 100, extra_wager: 0},
      %{guess: 30, base_wager: 100, extra_wager: 0}
    ]
    assert your_state[:awaiting_bet] == [%{id: "2", name: "bar"}, %{id: "3", name: "baz"}]

    assert others_state[:your_bets] == nil
    assert others_state[:awaiting_bet] == [%{id: "3", name: "baz"}]
  end

  test "changes to reveal stage when all bets are in and updates scores", %{players: players} do
    state =
      players
      |> YouBet.initial_state
      |> YouBet.play("1", "guess", "1")
      |> YouBet.play("2", "guess", "1")
      |> YouBet.play("3", "guess", "999999999999")
      |> YouBet.play("1", "finalize_bets", [
        %{"guess" => 1, "base_wager" => 100, "extra_wager" => 0},
        %{"guess" => 999_999_999_999, "base_wager" => 100, "extra_wager" => 0}
      ])
      |> YouBet.play("2", "finalize_bets", [
        %{"guess" => 1, "base_wager" => 200, "extra_wager" => 0}
      ])
      |> YouBet.play("3", "finalize_bets", [
        %{"guess" => 999_999_999_999, "base_wager" => 200, "extra_wager" => 0}
      ])
      |> YouBet.sanitize_state("1")

    assert state[:round] == 1
    assert state[:stage] == :reveal
    assert String.match?(state[:question], ~r/.*\?$/)
    assert is_integer(state[:answer])
    assert state[:closest_guess] == 1
    assert state[:payouts] == [
      %{player: %{id: "2", name: "bar"}, delta: 900, closest: true},
      %{player: %{id: "1", name: "foo"}, delta: 600, closest: true},
      %{player: %{id: "3", name: "baz"}, delta: 0, closest: false}
    ]

    assert state[:scores] == [
      %{player: %{id: "2", name: "bar"}, score: 1100},
      %{player: %{id: "1", name: "foo"}, score: 800},
      %{player: %{id: "3", name: "baz"}, score: 200}
    ]
  end

  test "advances to next round", %{players: players} do
    state =
      players
      |> YouBet.initial_state
      |> YouBet.play("1", "guess", "1")
      |> YouBet.play("2", "guess", "1")
      |> YouBet.play("3", "guess", "999999999999")
      |> YouBet.play("1", "finalize_bets", [
        %{"guess" => 1, "base_wager" => 100, "extra_wager" => 0},
        %{"guess" => 999_999_999_999, "base_wager" => 100, "extra_wager" => 0}
      ])
      |> YouBet.play("2", "finalize_bets", [
        %{"guess" => 1, "base_wager" => 100, "extra_wager" => 0},
        %{"guess" => 1, "base_wager" => 100, "extra_wager" => 0}
      ])
      |> YouBet.play("3", "finalize_bets", [
        %{"guess" => 999_999_999_999, "base_wager" => 100, "extra_wager" => 0},
        %{"guess" => 999_999_999_999, "base_wager" => 100, "extra_wager" => 0}
      ])
      |> YouBet.play("1", "advance_round", nil)
      |> YouBet.sanitize_state("1")

    assert state[:round] == 2
    assert state[:stage] == :guessing
    assert String.match?(state[:question], ~r/.*\?$/)
    assert state[:answer] == nil
    assert state[:your_guess] == nil
    assert state[:awaiting_guess] == [%{id: "2", name: "bar"}, %{id: "3", name: "baz"}]
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
