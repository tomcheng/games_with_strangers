defmodule GWSTest do
  use ExUnit.Case
  doctest GWS

  test "greets the world" do
    assert GWS.hello() == :world
  end
end
