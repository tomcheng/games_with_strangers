defmodule GWS.RoomSupervisor do
  use Supervisor

  @name GWS.RoomSupervisor

  def start_link(_opts) do
    Supervisor.start_link(__MODULE__, :ok, name: @name)
  end

  def start_room do
    Supervisor.start_child(@name, [])
  end

  def init(:ok) do
    Supervisor.init([GWS.Room], strategy: :simple_one_for_one)
  end
end