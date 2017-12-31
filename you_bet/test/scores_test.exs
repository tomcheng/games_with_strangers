defmodule ScoresTest do
  use ExUnit.Case

  setup do
    players = %{
      "1" => %{id: "1", name: "foo"},
      "2" => %{id: "2", name: "bar"},
      "3" => %{id: "3", name: "baz"}
    }
    %{players: players}
  end

  test "no winners", %{players: players} do
    scores = %{"1" => 200, "2" => 200, "3" => 200}
    guesses = %{"1" => 100, "2" => 200, "3" => 300}
    odds = %{100 => 3, 200 => 2, 300 => 3}
    bets = %{
      "1" => [%{guess: 100, base_wager: 100, extra_wager: 0}, %{guess: 100, base_wager: 100, extra_wager: 0}],
      "2" => [%{guess: 100, base_wager: 100, extra_wager: 0}, %{guess: 100, base_wager: 100, extra_wager: 0}],
      "3" => [%{guess: 100, base_wager: 100, extra_wager: 0}, %{guess: 100, base_wager: 100, extra_wager: 0}]
    }
    answer = 50
    {new_scores, payouts} = YouBet.Scores.update(scores, players, guesses, odds, bets, answer)

    assert new_scores == %{"1" => 200, "2" => 200, "3" => 200}
    assert payouts == []
  end

  test "one got closest without over", %{players: players} do
    scores = %{"1" => 200, "2" => 200, "3" => 200}
    guesses = %{"1" => 100, "2" => 200, "3" => 300}
    odds = %{100 => 3, 200 => 2, 300 => 3}
    bets = %{
      "1" => [%{guess: 200, base_wager: 100, extra_wager: 0}, %{guess: 200, base_wager: 100, extra_wager: 0}],
      "2" => [%{guess: 200, base_wager: 100, extra_wager: 0}, %{guess: 200, base_wager: 100, extra_wager: 0}],
      "3" => [%{guess: 200, base_wager: 100, extra_wager: 0}, %{guess: 200, base_wager: 100, extra_wager: 0}]
    }
    answer = 150
    {new_scores, payouts} = YouBet.Scores.update(scores, players, guesses, odds, bets, answer)

    assert new_scores == %{"1" => 500, "2" => 200, "3" => 200}
    assert payouts == [%{player: %{id: "1", name: "foo"}, amount: 300, closest: true}]
  end

  test "two got closest without over", %{players: players} do
    scores = %{"1" => 200, "2" => 200, "3" => 200}
    guesses = %{"1" => 100, "2" => 100, "3" => 300}
    odds = %{100 => 3, 200 => 2, 300 => 3}
    bets = %{
      "1" => [%{guess: 200, base_wager: 100, extra_wager: 0}, %{guess: 200, base_wager: 100, extra_wager: 0}],
      "2" => [%{guess: 200, base_wager: 100, extra_wager: 0}, %{guess: 200, base_wager: 100, extra_wager: 0}],
      "3" => [%{guess: 200, base_wager: 100, extra_wager: 0}, %{guess: 200, base_wager: 100, extra_wager: 0}]
    }
    answer = 150
    {new_scores, payouts} = YouBet.Scores.update(scores, players, guesses, odds, bets, answer)

    assert new_scores == %{"1" => 500, "2" => 500, "3" => 200}
    assert payouts == [
      %{player: %{id: "1", name: "foo"}, amount: 300, closest: true},
      %{player: %{id: "2", name: "bar"}, amount: 300, closest: true}
    ]
  end

  test "payouts for one correct bet", %{players: players} do
    scores = %{"1" => 200, "2" => 200, "3" => 200}
    guesses = %{"1" => 100, "2" => 200, "3" => 300}
    odds = %{100 => 3, 200 => 2, 300 => 3}
    bets = %{
      "1" => [%{guess: 100, base_wager: 100, extra_wager: 0}, %{guess: 200, base_wager: 100, extra_wager: 0}],
      "2" => [%{guess: 200, base_wager: 100, extra_wager: 0}, %{guess: 200, base_wager: 100, extra_wager: 0}],
      "3" => [%{guess: 200, base_wager: 100, extra_wager: 0}, %{guess: 200, base_wager: 100, extra_wager: 0}]
    }
    answer = 150
    {new_scores, payouts} = YouBet.Scores.update(scores, players, guesses, odds, bets, answer)

    assert new_scores == %{"1" => 800, "2" => 200, "3" => 200}
    assert payouts == [
      %{player: %{id: "1", name: "foo"}, amount: 300, closest: true},
      %{player: %{id: "1", name: "foo"}, amount: 300, closest: false, wager: 100, odds: 3}
    ]
  end

  test "payouts for two correct bets", %{players: players} do
    scores = %{"1" => 200, "2" => 200, "3" => 200}
    guesses = %{"1" => 100, "2" => 200, "3" => 300}
    odds = %{100 => 3, 200 => 2, 300 => 3}
    bets = %{
      "1" => [%{guess: 200, base_wager: 100, extra_wager: 0}, %{guess: 200, base_wager: 100, extra_wager: 0}],
      "2" => [%{guess: 100, base_wager: 100, extra_wager: 0}, %{guess: 100, base_wager: 100, extra_wager: 0}],
      "3" => [%{guess: 200, base_wager: 100, extra_wager: 0}, %{guess: 200, base_wager: 100, extra_wager: 0}]
    }
    answer = 150
    {new_scores, payouts} = YouBet.Scores.update(scores, players, guesses, odds, bets, answer)

    assert new_scores == %{"1" => 500, "2" => 800, "3" => 200}
    assert payouts == [
      %{player: %{id: "1", name: "foo"}, amount: 300, closest: true},
      %{player: %{id: "2", name: "bar"}, amount: 600, closest: false, wager: 200, odds: 3}
    ]
  end
end