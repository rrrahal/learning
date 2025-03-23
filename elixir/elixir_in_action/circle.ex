defmodule Circle do
  @pi 3.1415

  @spec area(number) :: number
  def area(r) do
    r * r * @pi
  end

  @spec circumference(number) :: number
  def circumference(r) do
    2 * r * @pi
  end
end
