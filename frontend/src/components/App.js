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
    errorMessage: null
  };

  channel = null;

  handleCreateRoom = () => {
    POST("/rooms").then(({ code }) => {
      this.joinRoom(code);
    });
  };

  handleJoinRoom = ({ code }) => {
    this.joinRoom(code);
  };

  joinRoom = code => {
    this.channel = getChannel("room:" + code);
    this.channel
      .join()
      .receive("ok", ({ game, game_state }) => {
        this.channel.on("new_state", ({ game, game_state }) => {
          this.setState({ gameState: game_state, game, errorMessage: null });
        });

        this.setState({ roomCode: code, game, gameState: game_state });
      })
      .receive("error", msg => {
        this.setState({ errorMessage: msg });
      });
  };

  handleSelectGame = game => {
    this.channel.push("set_game", { game });
  };

  render() {
    const { roomCode, game, gameState, errorMessage } = this.state;
    return (
      <div>
        <h1>Games with Strangers</h1>
        {!roomCode && (
          <Lobby
            onJoinRoom={this.handleJoinRoom}
            onCreateRoom={this.handleCreateRoom}
            errorMessage={errorMessage}
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
