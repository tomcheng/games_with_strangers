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

  def broadcast_state(room_code, room) do
    GamesWithStrangers.Endpoint.broadcast!("room:" <> room_code, "new_state", %{room: room})
  end
end
