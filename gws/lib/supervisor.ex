defmodule GWS.Supervisor do
  use Supervisor

  def start_link(opts) do
    Supervisor.start_link(__MODULE__, :ok, opts)
  end

  def init(:ok) do
    children = [
      GWS.RoomSupervisor,
      {GWS.Registry, name: GWS.Registry}
    ]

    Supervisor.init(children, strategy: :one_for_all)
  end
end