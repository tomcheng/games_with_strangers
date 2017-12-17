import React, { Component } from "react";
import PropTypes from "prop-types";
import "./App.css";

class App extends Component {
  static propTypes = {
    onCreateRoom: PropTypes.func.isRequired
  };

  render() {
    const { onCreateRoom } = this.props;

    return (
      <div>
        <h1>Games with Strangers</h1>
        <div>
          <input placeholder="Room Code" type="text" />{" "}
          <button>Join Room</button>
        </div>
        <div>or</div>
        <div>
          <button onClick={onCreateRoom}>Create Room</button>
        </div>
      </div>
    );
  }
}

export default App;
