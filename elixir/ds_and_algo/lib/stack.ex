defmodule Stack do
  defstruct items: []

  def new() do
    %Stack{}
  end

  def pop(%Stack{items: [head | tail]}) do
    {head, %Stack{items: tail}}
  end

  def pop(%Stack{items: []}) do
    {:error, %Stack{}}
  end

  def insert(%Stack{items: items}, item) do
    %Stack{items: [item | items]}
  end
end
