import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import TextInput from "./common/TextInput";
import Button from "./common/Button";
import { setPlayerName, getPlayerName } from "../utils/localStorage";

const CodeInput = styled(TextInput)`
  width: 160px;
`;

const ButtonContainer = styled.div`
  margin-top: 30px;
  text-align: center;
`;

class Lobby extends Component {
  static propTypes = {
    onCreateRoom: PropTypes.func.isRequired,
    onJoinRoom: PropTypes.func.isRequired
  };

  state = {
    playerName: getPlayerName() || "",
    roomCode: "",
    errorMessage: null
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { playerName: playerNameRaw, roomCode } = this.state;
    const { onCreateRoom, onJoinRoom } = this.props;
    const playerName = playerNameRaw.trim();

    if (playerName === "") {
      this.setState({ errorMessage: "Name is required" });
      return;
    }

    setPlayerName(playerName);

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
      <form onSubmit={this.handleSubmit}>
        <TextInput
          placeholder="Screen Name"
          name="playerName"
          value={playerName}
          onChange={this.handleChange}
        />
        <CodeInput
          placeholder="Room Code"
          name="roomCode"
          value={roomCode}
          onChange={this.handleChange}
        />
        <ButtonContainer>
          <Button>Create or Join Room</Button>
        </ButtonContainer>
        {errorMessage && <div>{errorMessage}</div>}
      </form>
    );
  }
}

export default Lobby;
