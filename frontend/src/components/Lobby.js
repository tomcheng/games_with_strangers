import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import TextInput from "./common/TextInput";
import Button from "./common/Button";
import { setPlayerName, getPlayerName } from "../utils/localStorage";

const Fields = styled.div`
  margin: 0 -8px;
  display: flex;
  margin-bottom: 40px;
`;

const NameField = styled(TextInput)`
  flex-grow: 1;
  margin: 0 8px;
`;

const CodeField = styled(TextInput)`
  max-width: 160px;
  margin: 0 8px;
`;

const ButtonContainer = styled.div`
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
        <Fields>
          <NameField
            placeholder="Screen Name"
            name="playerName"
            value={playerName}
            onChange={this.handleChange}
          />
          <CodeField
            placeholder="Room Code"
            name="roomCode"
            value={roomCode}
            onChange={this.handleChange}
          />
        </Fields>
        <ButtonContainer>
          <Button>Create or Join Room</Button>
        </ButtonContainer>
        {errorMessage && <div>{errorMessage}</div>}
      </form>
    );
  }
}

export default Lobby;
