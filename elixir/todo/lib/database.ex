defmodule Todo.Database do
  use GenServer

  @db_folder "./persist"

  def start do
    GenServer.start(__MODULE__, nil, name: __MODULE__)
  end

  def store(key, data) do
    pid = choose_worker(key)
    Todo.DatabaseWorker.store(pid, key, data)
  end

  def get(key) do
    pid = choose_worker(key)
    IO.inspect(pid, label: "found!")
    Todo.DatabaseWorker.get(pid, key)
  end

  defp choose_worker(key) do
    GenServer.call(__MODULE__, {:choose_worker, key})
  end

  @impl GenServer
  def handle_call({:choose_worker, key}, _, workers) do
    worker_key = :erlang.phash2(key, 3)
    {:reply, Map.get(workers, worker_key), workers}
  end

  @impl GenServer
  def init(_) do
    File.mkdir_p!(@db_folder)
    {:ok, start_workers()}
  end

  defp start_workers() do
    for index <- 1..3, into: %{} do
      {:ok, pid} = Todo.DatabaseWorker.start(@db_folder)
      {index - 1, pid}
    end
  end
end
