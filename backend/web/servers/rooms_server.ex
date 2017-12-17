defmodule GamesWithStrangers.RoomsServer do
  use GenServer

  def start do
    GenServer.start_link(__MODULE__, %{})
  end

  def create(_pid) do
    {:ok, "foo"}
  end

  def handle_call(:pop, _from, [h | t]) do
    {:reply, h, t}
  end

  def handle_cast({:push, item}, state) do
    {:noreply, [item | state]}
  end
end
