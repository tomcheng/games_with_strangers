import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

class Lobby extends Component {
  static propTypes = {
    onCreateRoom: PropTypes.func.isRequired,
    onJoinRoom: PropTypes.func.isRequired
  };

  state = { roomCode: "", errorMessage: null };

  handleSubmit = evt => {
    evt.preventDefault();

    this.props.onJoinRoom({
      code: this.state.roomCode,
      onError: ({ message }) => {
        this.setState({ errorMessage: message });
      }
    });
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  render() {
    const { onCreateRoom } = this.props;
    const { roomCode, errorMessage } = this.state;

    return (
      <Fragment>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Room Code"
            type="text"
            name="roomCode"
            value={roomCode}
            onChange={this.handleChange}
          />{" "}
          <button>Join Room</button>
          {errorMessage && <div>{errorMessage}</div>}
        </form>
        <div>or</div>
        <div>
          <button onClick={onCreateRoom}>Create Room</button>
        </div>
      </Fragment>
    );
  }
}

export default Lobby;
