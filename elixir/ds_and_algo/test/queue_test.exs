defmodule QueueTest do
  use ExUnit.Case
  doctest Queue

  test "new queue" do
    queue = Queue.new()
    assert queue.items == []
  end

  test "insert into queue" do
    queue = Queue.new()
    queue = Queue.insert(queue, 1)
    assert queue.items == [1]
  end

  test "pop from queue" do
    queue = Queue.new()
    queue = Queue.insert(queue, 1)
    {item, queue} = Queue.pop(queue)
    assert item == 1
    assert queue.items == []
  end

  test "insert into queue complex" do
    queue = Queue.new()
    queue = Queue.insert(queue, 1)
    queue = Queue.insert(queue, 2)
    queue = Queue.insert(queue, 3)
    {item, queue} = Queue.pop(queue)
    assert item == 1
    assert queue.items == [3, 2]
  end

  test "pop from empty queue" do
    queue = Queue.new()
    {:error, queue} = Queue.pop(queue)
    assert queue.items == []
  end
end
