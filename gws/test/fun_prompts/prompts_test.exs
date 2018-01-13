defmodule PromptsTest do
  use ExUnit.Case

  test "get random prompts" do
    prompts = FunPrompts.Prompts.get_random(5)
    assert Enum.count(prompts) == 5
  end
end
