defmodule GamesWithStrangers.RoomController do
  use GamesWithStrangers.Web, :controller

  def create(conn, %{"game" => game}) do
    {:ok, room_code} = GWS.create_room()
    {:ok, room} = GWS.get_room(room_code)

    GWS.Room.set_game(room, game)

    conn
    |> json(%{ room_code: room_code })
  end
end