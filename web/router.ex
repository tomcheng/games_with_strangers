defmodule GamesWithStrangers.Router do
  use GamesWithStrangers.Web, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", GamesWithStrangers do
    pipe_through :api
  end
end
