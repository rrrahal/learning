defmodule ListHelper do
  def sum(list), do: do_sum(list)

  defp do_sum(list) do
    do_sum(0, list)
  end

  defp do_sum(current_sum, [head | tail]) do
    new_sum = current_sum + head
    do_sum(new_sum, tail)
  end

  defp do_sum(current_sum, []) do
    current_sum
  end
  
  def list_length(list) do
    get_length(0,list)
  end

  defp get_length(l, [head | tail]) do
    get_length(1+ l, tail)
  end

  defp get_length(l, []) do
    l
  end
end
