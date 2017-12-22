defmodule YouBet do
  def minimum_players do
    3
  end

  def initial_state(_players) do
    %{round: 1}
  end
end
