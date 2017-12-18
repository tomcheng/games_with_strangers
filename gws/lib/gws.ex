defmodule GWS do
  use Application

  def start(_type, _args) do
    GWS.Supervisor.start_link(name: GWS.Supervisor)
  end
end
