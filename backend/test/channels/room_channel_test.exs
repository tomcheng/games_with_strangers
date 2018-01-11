defmodule GamesWithStrangers.RoomChannelTest do
  use GamesWithStrangers.ChannelCase

  alias GamesWithStrangers.RoomChannel

  setup do
    {:ok, _, socket} =
      socket("user_id", %{some: :assign})
      |> subscribe_and_join(RoomChannel, "room:lobby")

    {:ok, socket: socket}
  end
end
