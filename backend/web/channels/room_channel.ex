defmodule GamesWithStrangers.RoomChannel do
  use GamesWithStrangers.Web, :channel

  def join("room:" <> code, _payload, socket) do
    {:ok, socket}
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (room:lobby).
  def handle_in("shout", payload, socket) do
    broadcast socket, "shout", payload
    {:noreply, socket}
  end

  def handle_in("new_msg", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  def handle_in("set_game", %{"game" => game}, %{topic: "room:" <> room_code} = socket) do
    {:ok, room} = GWS.get_room(room_code)

    GWS.Room.set_game(room, game)

    {:ok, room_state} = GWS.Room.get_state(room)

    broadcast socket, "new_state", room_state

    {:noreply, socket}
  end

end
