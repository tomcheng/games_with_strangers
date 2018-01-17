defmodule GWS.Registry do
  use GenServer

  def start_link(opts) do
    GenServer.start_link(__MODULE__, :ok, opts)
  end

  def create(server) do
    GenServer.call(server, {:create})
  end

  def get_room(server, code) do
    GenServer.call(server, {:get_room, code})
  end

  def get_room_count(server) do
    GenServer.call(server, {:get_room_count})
  end

  def init(:ok) do
    codes = %{}
    refs = %{}
    {:ok, {codes, refs}}
  end

  def handle_call({:create}, _from, {codes, refs}) do
    {:ok, room} = GWS.RoomSupervisor.start_room()
    ref = Process.monitor(room)
    code = unique_code(codes)
    {:reply, {:ok, code}, {Map.put(codes, code, room), Map.put(refs, ref, code)}}
  end

  def handle_call({:get_room, code}, _from, {codes, _} = state) do
    case Map.fetch(codes, code) do
      :error -> {:reply, {:error, "Room not found"}, state}
      pid -> {:reply, pid, state}
    end
  end

  def handle_call({:get_room_count}, _from, {codes, _} = state) do
    {:reply, Enum.count(codes), state}
  end

  def handle_info({:DOWN, ref, :process, _pid, _reason}, {codes, refs}) do
    {name, refs} = Map.pop(refs, ref)
    codes = Map.delete(codes, name)
    {:noreply, {codes, refs}}
  end

  def handle_info(_msg, state) do
    {:noreply, state}
  end

  defp unique_code(codes) do
    code = GWS.Code.generate()

    if Map.has_key?(codes, code) do
      unique_code(codes)
    else
      code
    end
  end
end
