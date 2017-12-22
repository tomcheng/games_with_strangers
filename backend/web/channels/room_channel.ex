defmodule GamesWithStrangers.RoomChannel do
  use GamesWithStrangers.Web, :channel

  def join(_, %{"player_name" => ""}, _socket) do
    {:error, "Name is required"}
  end
  def join(
    "room:" <> room_code,
    %{"player_id" => player_id_in, "player_name" => player_name},
    %{channel_pid: channel} = socket
  ) do
    case GWS.get_room(room_code) do
      {:ok, room} ->
        player_id = player_id_in || UUID.uuid4()

        GWS.Room.add_player(room, player_id, player_name, channel)

        send(self(), :after_join)

        {:ok, %{player_id: player_id}, socket}
      :error ->
        {:error, "Room not found"}
    end
  end

  def terminate(_reason, %{topic: "room:" <> room_code, channel_pid: channel} = socket) do
    {:ok, room} = GWS.get_room(room_code)

    GWS.Room.remove_player_by_channel(room, channel)

    {:ok, room_state} = GWS.Room.get_state(room)

    broadcast(socket, "new_state", room_state)

    if Enum.count(room_state[:players]) == 0 do
      GWS.Room.destroy_room(room)
    end
  end

  def handle_in("set_game", %{"game" => game}, %{topic: "room:" <> room_code} = socket) do
    {:ok, room} = GWS.get_room(room_code)

    GWS.Room.set_game(room, game)

    {:ok, room_state} = GWS.Room.get_state(room)

    broadcast(socket, "new_state", room_state)

    {:noreply, socket}
  end

  def handle_in("game_play", game_play, %{topic: "room:" <> room_code} = socket) do
    {:ok, room} = GWS.get_room(room_code)

    GWS.Room.run_game_play(room, game_play)

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
