defmodule GamesWithStrangers.RoomChannel do
  use GamesWithStrangers.Web, :channel

  def join(_, %{"player_name" => ""}, socket) do
    {:error, "Name is required"}
  end
  def join(
    "room:" <> room_code,
    %{"player_id" => player_id_in, "player_name" => player_name},
    socket
  ) do
    case GWS.get_room(room_code) do
      {:ok, room} ->
        player_id = player_id_in || UUID.uuid4()

        GWS.Room.add_player(room, player_id, player_name)

        {:ok, room_state} = GWS.Room.get_state(room)

        send(self(), :after_join)

        {:ok, Map.put(room_state, :player_id, player_id), socket}
      :error ->
        {:error, "Room not found"}
    end
  end

  def handle_in("set_game", %{"game" => game}, %{topic: "room:" <> room_code} = socket) do
    {:ok, room} = GWS.get_room(room_code)

    GWS.Room.set_game(room, game)

    {:ok, room_state} = GWS.Room.get_state(room)

    broadcast(socket, "new_state", room_state)

    {:noreply, socket}
  end

  def handle_info(:after_join, %{topic: "room:" <> room_code} = socket) do
    {:ok, room} = GWS.get_room(room_code)
    {:ok, room_state} = GWS.Room.get_state(room)

    broadcast(socket, "new_state", room_state)

    {:noreply, socket}
  end
end
