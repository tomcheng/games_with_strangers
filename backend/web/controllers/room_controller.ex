defmodule GamesWithStrangers.RoomController do
  use GamesWithStrangers.Web, :controller

  def create(conn, _params) do
    conn
    |> json(%{ foo: "bar" })
  end
end