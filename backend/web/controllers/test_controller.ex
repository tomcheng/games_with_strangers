defmodule GamesWithStrangers.TestController do
  use GamesWithStrangers.Web, :controller

  def test(conn, _params) do
    conn
    |> json(%{ foo: "bar" })
  end
end