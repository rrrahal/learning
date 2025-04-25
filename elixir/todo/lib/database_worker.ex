defmodule Todo.DatabaseWorker do
  use GenServer

  def start(folder_name) do
    GenServer.start(__MODULE__, folder_name)
  end

  def store(worker_pid, key, data) do
    GenServer.cast(worker_pid, {:store, key, data})
  end

  def get(worker_pid, key) do
    GenServer.call(worker_pid, {:get, key})
  end

  def init(folder) do
    {:ok, {folder}}
  end

  def handle_cast({:store, key, data}, {folder}) do
    file_name(folder, key) |> File.write!(:erlang.term_to_binary(data))

    {:noreply, {folder}}
  end

  def handle_call({:get, key}, _, {folder}) do
    data =
      case File.read(file_name(folder, key)) do
        {:ok, contents} -> :erlang.binary_to_term(contents)
        _ -> nil
      end

    {:reply, data, {folder}}
  end

  defp file_name(folder, key) do
    Path.join(folder, to_string(key))
  end
end
