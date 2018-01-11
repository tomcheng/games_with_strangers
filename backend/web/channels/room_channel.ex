defmodule GamesWithStrangers.RoomChannel do
  use GamesWithStrangers.Web, :channel

  intercept ["new_state"]

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
      {:error, msg} ->
        {:error, msg}
    end
  end

  def terminate(_reason, %{topic: "room:" <> room_code, channel_pid: channel} = socket) do
    {:ok, room} = GWS.get_room(room_code)

    {:ok, %{others: others, you: you}} =
      room
      |> GWS.Room.remove_player_by_channel(channel)
      |> GWS.Room.get_state(channel)

    broadcast(socket, "new_state", %{room: room})

    if Enum.count(others) == 0 && is_nil(you) do
      GWS.Room.destroy_room(room)
    end
  end

  def handle_in("start_game", _, %{topic: "room:" <> room_code} = socket) do
    {:ok, room} = GWS.get_room(room_code)

     GWS.Room.start_game(room)

    broadcast(socket, "new_state", %{room: room})

    {:noreply, socket}
  end

  def handle_in("make_play", %{"player_id" => player_id, "type" => type} = params, %{topic: "room:" <> room_code} = socket) do
    {:ok, room} = GWS.get_room(room_code)

    GWS.Room.make_play(room, player_id, type, params["payload"])

    broadcast(socket, "new_state", %{room: room})

    {:noreply, socket}
  end

  def handle_out("new_state", %{room: room}, %{channel_pid: channel} = socket) do
    {:ok, room_state} = GWS.Room.get_state(room, channel)

    push(socket, "new_state", room_state)

    {:noreply, socket}
  end

  def handle_info(:after_join, %{topic: "room:" <> room_code} = socket) do
    {:ok, room} = GWS.get_room(room_code)

    broadcast(socket, "new_state", %{room: room})

    {:noreply, socket}
  end
end
