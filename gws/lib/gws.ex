defmodule GWS do
  use Application

  def start(_type, _args) do
    GWS.Supervisor.start_link(name: GWS.Supervisor)
  end

  def create_room do
    GWS.Registry.create(GWS.Registry)
  end

  def get_room(code) do
    GWS.Registry.get_room(GWS.Registry, code)
  end
end
