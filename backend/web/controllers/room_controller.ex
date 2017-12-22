defmodule GamesWithStrangers.RoomController do
  use GamesWithStrangers.Web, :controller

  def create(conn, _params) do
    {:ok, room_code} = GWS.create_room()

    conn
    |> json(%{ room_code: room_code })
  end
end