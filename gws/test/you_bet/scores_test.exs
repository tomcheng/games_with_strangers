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
      "1" => [%{guess: 100, base_wager: 200, extra_wager: 0}],
      "2" => [%{guess: 100, base_wager: 200, extra_wager: 0}],
      "3" => [%{guess: 100, base_wager: 200, extra_wager: 0}]
    }
    answer = 50
    {new_scores, payouts} = YouBet.Scores.update(scores, players, guesses, odds, bets, answer)

    assert new_scores == %{"1" => 200, "2" => 200, "3" => 200}
    assert payouts == %{
      "1" => %{delta: 0, closest: false},
      "2" => %{delta: 0, closest: false},
      "3" => %{delta: 0, closest: false}
    }
  end

  test "one got closest without over", %{players: players} do
    scores = %{"1" => 200, "2" => 200, "3" => 200}
    guesses = %{"1" => 100, "2" => 200, "3" => 300}
    odds = %{100 => 3, 200 => 2, 300 => 3}
    bets = %{
      "1" => [%{guess: 200, base_wager: 200, extra_wager: 0}],
      "2" => [%{guess: 200, base_wager: 200, extra_wager: 0}],
      "3" => [%{guess: 200, base_wager: 200, extra_wager: 0}]
    }
    answer = 150
    {new_scores, payouts} = YouBet.Scores.update(scores, players, guesses, odds, bets, answer)

    assert new_scores == %{"1" => 500, "2" => 200, "3" => 200}
    assert payouts == %{
      "1" => %{delta: 300, closest: true},
      "2" => %{delta: 0, closest: false},
      "3" => %{delta: 0, closest: false}
    }
  end

  test "two got closest without over", %{players: players} do
    scores = %{"1" => 200, "2" => 200, "3" => 200}
    guesses = %{"1" => 100, "2" => 100, "3" => 300}
    odds = %{100 => 3, 200 => 2, 300 => 3}
    bets = %{
      "1" => [%{guess: 200, base_wager: 200, extra_wager: 0}],
      "2" => [%{guess: 200, base_wager: 200, extra_wager: 0}],
      "3" => [%{guess: 200, base_wager: 200, extra_wager: 0}]
    }
    answer = 150
    {new_scores, payouts} = YouBet.Scores.update(scores, players, guesses, odds, bets, answer)

    assert new_scores == %{"1" => 500, "2" => 500, "3" => 200}
    assert payouts == %{
      "1" => %{delta: 300, closest: true},
      "2" => %{delta: 300, closest: true},
      "3" => %{delta: 0, closest: false}
    }
  end

  test "payouts for one correct bet", %{players: players} do
    scores = %{"1" => 200, "2" => 200, "3" => 200}
    guesses = %{"1" => 100, "2" => 200, "3" => 300}
    odds = %{100 => 3, 200 => 2, 300 => 3}
    bets = %{
      "1" => [%{guess: 100, base_wager: 100, extra_wager: 0}, %{guess: 200, base_wager: 100, extra_wager: 0}],
      "2" => [%{guess: 200, base_wager: 200, extra_wager: 0}],
      "3" => [%{guess: 200, base_wager: 200, extra_wager: 0}]
    }
    answer = 150
    {new_scores, payouts} = YouBet.Scores.update(scores, players, guesses, odds, bets, answer)

    assert new_scores == %{"1" => 800, "2" => 200, "3" => 200}
    assert payouts == %{
      "1" => %{delta: 600, closest: true},
      "2" => %{delta: 0, closest: false},
      "3" => %{delta: 0, closest: false}
    }
  end

  test "payouts for two correct bets", %{players: players} do
    scores = %{"1" => 200, "2" => 200, "3" => 200}
    guesses = %{"1" => 100, "2" => 200, "3" => 300}
    odds = %{100 => 3, 200 => 2, 300 => 3}
    bets = %{
      "1" => [%{guess: 200, base_wager: 200, extra_wager: 0}],
      "2" => [%{guess: 100, base_wager: 200, extra_wager: 0}],
      "3" => [%{guess: 200, base_wager: 200, extra_wager: 0}]
    }
    answer = 150
    {new_scores, payouts} = YouBet.Scores.update(scores, players, guesses, odds, bets, answer)

    assert new_scores == %{"1" => 500, "2" => 800, "3" => 200}
    assert payouts == %{
      "1" => %{delta: 300, closest: true},
      "2" => %{delta: 600, closest: false},
      "3" => %{delta: 0, closest: false}
    }
  end

  test "handles extra wagers properly", %{players: players} do
    scores = %{"1" => 500, "2" => 500, "3" => 500}
    guesses = %{"1" => 100, "2" => 200, "3" => 300}
    odds = %{100 => 3, 200 => 2, 300 => 3}
    bets = %{
      "1" => [%{guess: 100, base_wager: 100, extra_wager: 300}, %{guess: 200, base_wager: 100, extra_wager: 0}],
      "2" => [%{guess: 200, base_wager: 200, extra_wager: 300}],
      "3" => [%{guess: 200, base_wager: 200, extra_wager: 300}]
    }
    answer = 150
    {new_scores, payouts} = YouBet.Scores.update(scores, players, guesses, odds, bets, answer)

    assert new_scores == %{"1" => 2000, "2" => 200, "3" => 200}
    assert payouts == %{
      "1" => %{delta: 1500, closest: true},
      "2" => %{delta: -300, closest: false},
      "3" => %{delta: -300, closest: false}
    }
  end

  test "handles betting on less properly", %{players: players} do
    scores = %{"1" => 200, "2" => 200, "3" => 200}
    guesses = %{"1" => 100, "2" => 200, "3" => 300}
    odds = %{"less" => 4, 100 => 3, 200 => 2, 300 => 3}
    bets = %{
      "1" => [%{guess: "less", base_wager: 100, extra_wager: 0}, %{guess: 100, base_wager: 100, extra_wager: 0}],
      "2" => [%{guess: 100, base_wager: 200, extra_wager: 0}],
      "3" => [%{guess: 100, base_wager: 200, extra_wager: 0}]
    }
    answer = 50
    {new_scores, payouts} = YouBet.Scores.update(scores, players, guesses, odds, bets, answer)

    assert new_scores == %{"1" => 600, "2" => 200, "3" => 200}
    assert payouts == %{
      "1" => %{delta: 400, closest: false},
      "2" => %{delta: 0, closest: false},
      "3" => %{delta: 0, closest: false}
    }
  end
end