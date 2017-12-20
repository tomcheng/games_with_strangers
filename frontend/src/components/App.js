import React, { Component } from "react";
import { POST, getChannel } from "../utils/api";
import Lobby from "./Lobby";
import Room from "./Room";
import "./App.css";

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
    this.channel = getChannel("room:" + code);
    this.channel
      .join()
      .receive("ok", ({ game, players, game_state }) => {
        this.channel.on("new_state", ({ game, players, game_state }) => {
          this.setState({ game, players, gameState: game_state });
        });

        this.setState({ game, players, gameState: game_state, roomCode: code });
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
