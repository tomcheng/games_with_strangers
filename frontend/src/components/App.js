import React, { Component, Fragment } from "react";
import { POST, getChannel } from "../utils/api";
import Room from "./Room";
import "./App.css";

class App extends Component {
  static propTypes = {};

  state = {
    roomCodeInput: "",
    roomCode: null,
    channel: null,
    gameState: null,
    game: null,
    errorMessage: null
  };

  channel = null;

  handleClickCreateRoom = () => {
    POST("/rooms").then(({ code }) => {
      this.joinRoom(code);
    });
  };

  handleSubmitJoin = evt => {
    evt.preventDefault();

    this.joinRoom(this.state.roomCodeInput);
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

  handleRoomCodeChange = ({ target }) => {
    this.setState({ roomCodeInput: target.value });
  };

  renderEmpty = () => {
    const { roomCodeInput, errorMessage } = this.state;
    return (
      <Fragment>
        <form onSubmit={this.handleSubmitJoin}>
          <input
            placeholder="Room Code"
            type="text"
            name="roomCode"
            value={roomCodeInput}
            onChange={this.handleRoomCodeChange}
          />{" "}
          <button>Join Room</button>
          {errorMessage && <div>{errorMessage}</div>}
        </form>
        <div>or</div>
        <div>
          <button onClick={this.handleClickCreateRoom}>Create Room</button>
        </div>
      </Fragment>
    );
  };

  render() {
    const { roomCode, game, gameState } = this.state;
    return (
      <div>
        <h1>Games with Strangers</h1>
        {!roomCode && this.renderEmpty()}
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
