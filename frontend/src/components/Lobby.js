import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

class Lobby extends Component {
  static propTypes = {
    onCreateRoom: PropTypes.func.isRequired,
    onJoinRoom: PropTypes.func.isRequired,
    errorMessage: PropTypes.string
  };

  state = { roomCode: "" }

  handleSubmit = evt => {
    evt.preventDefault();

    this.props.onJoinRoom({ code: this.state.roomCode });
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  render() {
    const { onCreateRoom, errorMessage } = this.props;
    const { roomCode } = this.state;

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