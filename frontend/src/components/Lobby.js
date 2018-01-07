import React, { Component, Fragment } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import gamesList from "../gamesList";
import SectionHeader from "./common/SectionHeader";
import Divider from "./common/Divider";
import TextInput from "./common/TextInput";
import Button from "./common/Button";
import GameCard from "./GameCard";
import { setPlayerName, getPlayerName } from "../utils/localStorage";

const Section = styled.div`
  margin-bottom: 24px;
`;

const JoinGameForm = styled.form`
  display: flex;
  align-items: flex-end;
`;

const CodeInput = styled(TextInput)`
  flex-grow: 1;
  flex-shrink: 1;
`;

const JoinButton = styled(Button)`
  margin-left: 10px;
  flex-shrink: 0;
`;

const Error = styled.div`
  margin-top: 5px;
`;

class Lobby extends Component {
  static propTypes = {
    onCreateRoom: PropTypes.func.isRequired,
    onJoinRoom: PropTypes.func.isRequired,
    previousRoomCode: PropTypes.string
  };

  constructor(props) {
    super();

    this.state = {
      playerName: getPlayerName() || "",
      roomCode: props.previousRoomCode || "",
      nameError: null,
      roomCodeError: null,
      joinGameClicked: false,
      startGameClicked: false
    };
  }

  handleSubmitJoin = evt => {
    evt.preventDefault();
    const { playerName: playerNameRaw, roomCode: roomCodeRaw } = this.state;
    const { onJoinRoom } = this.props;
    const playerName = playerNameRaw.trim();
    const roomCode = roomCodeRaw.trim();

    if (playerName === "") {
      this.setState({ nameError: "Name is required" });
      return;
    }

    setPlayerName(playerName);

    if (roomCode === "") {
      this.setState({ roomCodeError: "Game code is required" });
      return;
    }

    this.setState({ joinGameClicked: true });

    onJoinRoom({
      playerName,
      roomCode,
      onError: this.handleJoinError
    });
  };

  handleJoinError = ({ message }) => {
    this.setState({ roomCodeError: message, joinGameClicked: false });
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleChangeCode = ({ target }) => {
    this.setState({ [target.name]: target.value.trim().toUpperCase() });
  };

  handleSelectGame = gameId => {
    const { onCreateRoom } = this.props;
    const { playerName: playerNameRaw } = this.state;
    const playerName = playerNameRaw.trim();

    if (playerName === "") {
      this.setState({ nameError: "Name is required" });
      return;
    }

    setPlayerName(playerName);

    this.setState({ startGameClicked: true });
    onCreateRoom({ playerName, gameId });
  };

  render() {
    const {
      playerName,
      roomCode,
      nameError,
      roomCodeError,
      joinGameClicked,
      startGameClicked
    } = this.state;

    return (
      <Fragment>
        <Section>
          <SectionHeader>Enter your Name</SectionHeader>
          <TextInput
            placeholder="Screen Name"
            name="playerName"
            value={playerName}
            onChange={this.handleChange}
          />
          {nameError && <Error>{nameError}</Error>}
        </Section>
        <Section>
          <SectionHeader>Join a Game</SectionHeader>
          <JoinGameForm onSubmit={this.handleSubmitJoin}>
            <CodeInput
              placeholder="Game Code"
              name="roomCode"
              value={roomCode}
              onChange={this.handleChangeCode}
            />
            <JoinButton disabled={joinGameClicked}>Join Game</JoinButton>
          </JoinGameForm>
          {roomCodeError && <Error>{roomCodeError}</Error>}
        </Section>
        <Section>
          <SectionHeader>Start a New Game</SectionHeader>
          {gamesList.map(
            ({ id, displayName, description, playerRequirements }, index) => (
              <Fragment key={id}>
                {index !== 0 && <Divider />}
                <GameCard
                  title={displayName}
                  description={description}
                  playerRequirements={playerRequirements}
                  startGameClicked={startGameClicked}
                  onSelect={() => {
                    this.handleSelectGame(id);
                  }}
                />
              </Fragment>
            )
          )}
        </Section>
      </Fragment>
    );
  }
}

export default Lobby;
