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
    game: null
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
      .receive("ok", ({ game, game_state }) => {
        this.channel.on("new_state", ({ game, game_state }) => {
          this.setState({ gameState: game_state, game });
        });

        this.setState({ roomCode: code, game, gameState: game_state });
      })
      .receive("error", message => {
        onError({ message });
      });
  };

  handleSelectGame = game => {
    this.channel.push("set_game", { game });
  };

  render() {
    const { roomCode, game, gameState } = this.state;
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
            gameState={gameState}
            onSelectGame={this.handleSelectGame}
          />
        )}
      </div>
    );
  }
}

export default App;
