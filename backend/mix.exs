defmodule GamesWithStrangers.Mixfile do
  use Mix.Project

  def project do
    [
      app: :games_with_strangers,
      version: "0.0.3",
      elixir: "~> 1.5",
      elixirc_paths: elixirc_paths(Mix.env()),
      compilers: [:phoenix, :gettext] ++ Mix.compilers(),
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  # Configuration for the OTP application.
  #
  # Type `mix help compile.app` for more information.
  def application do
    [
      mod: {GamesWithStrangers, []},
      extra_applications: [:logger, :gws, :edeliver]
    ]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "web", "test/support"]
  defp elixirc_paths(_), do: ["lib", "web"]

  # Specifies your project dependencies.
  #
  # Type `mix help deps` for examples and options.
  defp deps do
    [
      {:phoenix, "~> 1.3.0-rc"},
      {:phoenix_pubsub, "~> 1.0"},
      {:gettext, "~> 0.11"},
      {:cowboy, "~> 1.0"},
      {:cors_plug, "~> 1.1"},
      {:uuid, "~> 1.1"},
      {:gws, path: "../gws"},
      {:edeliver, "~> 1.4.2"},
      {:distillery, "~> 1.4"}
    ]
  end
end
