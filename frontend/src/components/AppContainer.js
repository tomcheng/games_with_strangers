import React, { Component } from "react";
import styled from "styled-components";
import mapValues from "lodash/mapValues";
import mapKeys from "lodash/mapKeys";
import camelCase from "lodash/camelCase";
import omit from "lodash/omit";
import { POST, getChannel } from "../utils/api";
import AppHeader from "./AppHeader";
import Lobby from "./Lobby";
import Room from "./Room";
import "./App.css";
import { setPlayerId, getPlayerId, setPlayerName, getPlayerName } from "../utils/localStorage";

const Container = styled.div`
  padding: 40px 50px;
`;

class App extends Component {
  static propTypes = {};

  state = {
    game: null,
    gameState: null,
    minimumPlayers: null,
    players: null,
    playerId: null,
    roomCode: null,
    savedPlayerName: getPlayerName() || ""
  };

  channel = null;

  handleCreateRoom = ({ playerName }) => {
    POST("/rooms").then(({ room_code }) => {
      this.joinRoom({ playerName, roomCode: room_code });
    });
    this.savePlayerName(playerName);
  };

  handleJoinRoom = ({ playerName, roomCode, onError }) => {
    this.joinRoom({ playerName, roomCode, onError });
    this.savePlayerName(playerName);
  };

  handleSelectGame = game => {
    this.channel.push("set_game", { game });
  };

  handleStartGame = () => {
    this.channel.push("start_game");
  };

  handlePlay = args => {
    this.channel.push("make_play", { ...args, player_id: this.state.playerId });
  };

  joinRoom = ({ playerName, roomCode, onError }) => {
    this.channel = getChannel({
      topic: "room:" + roomCode,
      params: { player_id: getPlayerId(), player_name: playerName }
    });

    this.channel
      .join()
      .receive("ok", ({ player_id }) => {
        setPlayerId(player_id);
        this.channel.on("new_state", this.updateRoomState);
        this.setState({ roomCode, playerId: player_id });
      })
      .receive("error", message => {
        onError({ message });
      });
  };

  updateRoomState = ({ game, game_state, minimum_players, players }) => {
    this.setState({
      game,
      gameState: game_state,
      minimumPlayers: minimum_players,
      players: mapValues(players, player =>
        mapKeys(player, (value, key) => camelCase(key))
      )
    });
  };

  savePlayerName = name => {
    setPlayerName(name);
    this.setState({ savedPlayerName: name });
  };

  render() {
    const {
      game,
      gameState,
      minimumPlayers,
      players,
      playerId,
      roomCode,
      savedPlayerName
    } = this.state;
    const roomReady = !!(roomCode && players);

    return (
      <Container>
        <AppHeader />
        {!roomReady && (
          <Lobby
            onJoinRoom={this.handleJoinRoom}
            onCreateRoom={this.handleCreateRoom}
            savedPlayerName={savedPlayerName}
          />
        )}
        {roomReady && (
          <Room
            roomCode={roomCode}
            game={game}
            you={players[playerId]}
            others={omit(players, [playerId])}
            gameState={gameState}
            minimumPlayers={minimumPlayers}
            onSelectGame={this.handleSelectGame}
            onStartGame={this.handleStartGame}
            onPlay={this.handlePlay}
          />
        )}
      </Container>
    );
  }
}

export default App;
