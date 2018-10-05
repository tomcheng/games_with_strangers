defmodule GamesWithStrangers.RoomController do
  use GamesWithStrangers.Web, :controller

  def create(conn, %{"game" => game}) do
    {:ok, room_code} = GWS.create_room()
    {:ok, room} = GWS.get_room(room_code)

    case GWS.Room.set_game(room, game) do
      {:error, message} ->
        json(conn, %{error: message})
      _ ->
        json(conn, %{room_code: room_code})
    end
  end
end
