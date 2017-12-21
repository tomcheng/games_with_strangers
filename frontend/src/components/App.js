import React, { Component } from "react";
import { POST, getChannel } from "../utils/api";
import Lobby from "./Lobby";
import Room from "./Room";
import "./App.css";

const PLAYER_ID_KEY = "_gws_player_id";

const setPlayerId = id => {
  localStorage.setItem(PLAYER_ID_KEY, id);
};

const getPlayerId = () => localStorage.getItem(PLAYER_ID_KEY);

class App extends Component {
  static propTypes = {};

  state = {
    roomCode: null,
    channel: null,
    gameState: null,
    game: null,
    players: null
  };

  channel = null;

  handleCreateRoom = () => {
    POST("/rooms").then(({ code }) => {
      this.joinRoom({ code });
    });
  };

  handleJoinRoom = ({ code, onError }) => {
    this.joinRoom({ code, onError });
  };

  joinRoom = ({ code, onError }) => {
    this.channel = getChannel({
      topic: "room:" + code,
      params: { player_id: getPlayerId(), player_name: "FooBar" }
    });
    this.channel
      .join()
      .receive("ok", ({ game, players, game_state, player_id }) => {
        setPlayerId(player_id);

        this.channel.on("new_state", ({ game, players, game_state }) => {
          this.setState({ game, players: players, gameState: game_state });
        });

        this.setState({ game, players: players, gameState: game_state, roomCode: code });
      })
      .receive("error", message => {
        onError({ message });
      });
  };

  handleSelectGame = game => {
    this.channel.push("set_game", { game });
  };

  render() {
    const { roomCode, game, players, gameState } = this.state;

    return (
      <div>
        <h1>Games with Strangers</h1>
        {!roomCode && (
          <Lobby
            onJoinRoom={this.handleJoinRoom}
            onCreateRoom={this.handleCreateRoom}
          />
        )}
        {roomCode && (
          <Room
            code={roomCode}
            game={game}
            players={players}
            gameState={gameState}
            onSelectGame={this.handleSelectGame}
          />
        )}
      </div>
    );
  }
}

export default App;
