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

class Home extends Component {
  static propTypes = {
    onCreateRoom: PropTypes.func.isRequired,
    onJoinRoom: PropTypes.func.isRequired,
    onSetFlashMessage: PropTypes.func.isRequired,
    previousRoomCode: PropTypes.string
  };

  constructor(props) {
    super();

    this.state = {
      playerName: getPlayerName() || "",
      playerNameError: false,
      roomCode: props.previousRoomCode || "",
      roomCodeError: false,
      joinGameClicked: false,
      startGameClicked: null
    };
  }

  handleSubmitJoin = evt => {
    evt.preventDefault();
    const { onJoinRoom } = this.props;
    const { playerName: playerNameRaw, roomCode: roomCodeRaw } = this.state;
    const playerName = playerNameRaw.trim();
    const roomCode = roomCodeRaw.trim();

    if (playerName === "") {
      this.setNameError();
      return;
    }

    setPlayerName(playerName);

    if (roomCode === "") {
      this.setRoomCodeError();
      return;
    }

    this.setState({ joinGameClicked: true });

    onJoinRoom({
      playerName,
      roomCode,
      onError: () => {
        this.setState({
          roomCode: "",
          joinGameClicked: false,
          roomCodeError: true
        });
      }
    });
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
      [target.name + "Error"]: false
    });
  };

  handleChangeCode = ({ target }) => {
    this.setState({
      [target.name]: target.value.trim().toUpperCase(),
      [target.name + "Error"]: false
    });
  };

  handleSelectGame = gameId => {
    const { onCreateRoom } = this.props;
    const { playerName: playerNameRaw } = this.state;
    const playerName = playerNameRaw.trim();

    if (playerName === "") {
      this.setNameError();
      return;
    }

    setPlayerName(playerName);

    this.setState({ startGameClicked: gameId });
    onCreateRoom({
      playerName,
      gameId,
      onError: () => {
        this.setState({ startGameClicked: null });
      }
    });
  };

  setNameError = () => {
    this.props.onSetFlashMessage("A screen name is required");
    this.setState({ playerNameError: true });
  };

  setRoomCodeError = () => {
    this.props.onSetFlashMessage("A game code is required");
    this.setState({ roomCodeError: true });
  };

  render() {
    const {
      playerName,
      roomCode,
      joinGameClicked,
      startGameClicked,
      playerNameError,
      roomCodeError
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
            hasError={playerNameError}
          />
        </Section>
        <Section>
          <SectionHeader>Join a Game</SectionHeader>
          <JoinGameForm onSubmit={this.handleSubmitJoin}>
            <CodeInput
              placeholder="Game Code"
              name="roomCode"
              value={roomCode}
              onChange={this.handleChangeCode}
              hasError={roomCodeError}
            />
            <JoinButton disabled={joinGameClicked}>Join Game</JoinButton>
          </JoinGameForm>
        </Section>
        <Section>
          <SectionHeader>Start a New Game</SectionHeader>
          {gamesList.map(({ id, displayName, description }, index) => (
            <Fragment key={id}>
              {index !== 0 && <Divider />}
              <GameCard
                title={displayName}
                description={description}
                startGameClicked={startGameClicked === id}
                onSelect={() => {
                  this.handleSelectGame(id);
                }}
              />
            </Fragment>
          ))}
        </Section>
      </Fragment>
    );
  }
}

export default Home;
