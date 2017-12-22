import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

class Lobby extends Component {
  static propTypes = {
    onCreateRoom: PropTypes.func.isRequired,
    onJoinRoom: PropTypes.func.isRequired
  };

  constructor(props) {
    super();

    this.state = {
      playerName: props.savedPlayerName,
      roomCode: "",
      errorMessage: null
    };
  }

  handleSubmit = evt => {
    evt.preventDefault();
    const { playerName: playerNameRaw, roomCode } = this.state;
    const { onCreateRoom, onJoinRoom } = this.props;
    const playerName = playerNameRaw.trim();

    if (playerName === "") {
      this.setState({ errorMessage: "Name is required" });
      return;
    }

    if (roomCode.trim().length === 0) {
      onCreateRoom({ playerName });
    } else {
      onJoinRoom({
        playerName,
        roomCode,
        onError: this.handleError
      });
    }
  };

  handleError = ({ message }) => {
    this.setState({ errorMessage: message });
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  render() {
    const { playerName, roomCode, errorMessage } = this.state;

    return (
      <Fragment>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Screen Name"
            type="text"
            name="playerName"
            value={playerName}
            onChange={this.handleChange}
          />
          <input
            placeholder="Room Code"
            type="text"
            name="roomCode"
            value={roomCode}
            onChange={this.handleChange}
          />
          <button>Create/Join Room</button>
          {errorMessage && <div>{errorMessage}</div>}
        </form>
      </Fragment>
    );
  }
}

export default Lobby;
