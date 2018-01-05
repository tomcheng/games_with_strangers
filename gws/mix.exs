defmodule GWS.Mixfile do
  use Mix.Project

  def project do
    [
      app: :gws,
      version: "0.1.0",
      elixir: "~> 1.5",
      start_permanent: Mix.env == :prod,
      deps: deps()
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger],
      mod: {GWS, []}
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      {:you_bet, path: "../you_bet"},
      {:fun_prompts, path: "../fun_prompts"}
    ]
  end
end
