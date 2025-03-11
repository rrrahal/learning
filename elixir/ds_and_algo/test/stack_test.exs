defmodule StackTest do
  use ExUnit.Case
  doctest Stack

  test "new stack" do
    stack = Stack.new()
    assert stack.items == []
  end

  test "insert into stack" do
    stack = Stack.new()
    stack = Stack.insert(stack, 1)
    assert stack.items == [1]
  end

  test "pop from stack" do
    stack = Stack.new()
    stack = Stack.insert(stack, 1)
    {item, stack} = Stack.pop(stack)
    assert item == 1
    assert stack.items == []
  end

  test "pop from empty stack" do
    stack = Stack.new()
    {:error, stack} = Stack.pop(stack)
    assert stack.items == []
  end
end
