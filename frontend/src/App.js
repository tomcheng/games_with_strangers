import React, { Component, Fragment } from "react";
import { POST } from "./utils/api";
import Room from "./components/Room";
import "./App.css";

class App extends Component {
  static propTypes = {};

  state = { roomCode: null };

  handleClickCreateRoom = () => {
    POST("/rooms").then(({ code }) => {
      this.setState({ roomCode: code });
    });
  };

  handleSelectGame = game => {
    console.log("game:", game);
  };

  renderEmpty = () => (
    <Fragment>
      <div>
        <input placeholder="Room Code" type="text" /> <button>Join Room</button>
      </div>
      <div>or</div>
      <div>
        <button onClick={this.handleClickCreateRoom}>Create Room</button>
      </div>
    </Fragment>
  );

  render() {
    const { roomCode } = this.state;
    return (
      <div>
        <h1>Games with Strangers</h1>
        {!roomCode && this.renderEmpty()}
        {roomCode && <Room code={roomCode} onSelectGame={this.handleSelectGame} />}
      </div>
    );
  }
}

export default App;
