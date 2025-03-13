defmodule Queue do
  defstruct items: [], size: 0

  def new() do
    %Queue{}
  end

  def pop(%Queue{items: []}) do
    {:error, %Queue{}}
  end

  def pop(%Queue{items: [head | tail], size: size}) do
    {last, rem} = List.pop_at([head | tail], size - 1)
    {last, %Queue{items: rem, size: size - 1}}
  end

  def insert(%Queue{items: items, size: size}, item) do
    %Queue{items: [item | items], size: size + 1}
  end
end
