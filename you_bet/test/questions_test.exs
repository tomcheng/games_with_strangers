defmodule QuestionsTest do
  use ExUnit.Case

  test "gets a random question and answer" do
    {question, answer} = YouBet.Questions.random()

    assert String.match?(question, ~r/.*\?$/)
    assert is_integer(answer)
  end

  test "does not repeat too often" do
    {question1, _} = YouBet.Questions.random()
    {question2, _} = YouBet.Questions.random()

    assert question1 != question2
  end
end