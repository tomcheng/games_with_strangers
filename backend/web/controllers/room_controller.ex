defmodule GamesWithStrangers.RoomController do
  use GamesWithStrangers.Web, :controller

  def create(conn, _params) do
    {:ok, code} = GWS.create_room()

    conn
    |> json(%{ code: code })
  end
end