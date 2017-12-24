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
import { setPlayerId, getPlayerId } from "../utils/localStorage";

const Container = styled.div`
  padding: 40px 50px;
`;

class App extends Component {
  static propTypes = {};

  state = {
    roomCode: null,
    roomReady: false,
    yourId: null,
    you: null,
    others: null,
    game: null,
    minimumPlayers: null,
    gameState: null
  };

  channel = null;

  handleCreateRoom = ({ playerName }) => {
    POST("/rooms").then(({ room_code }) => {
      this.handleJoinRoom({ playerName, roomCode: room_code });
    });
  };

  handleSelectGame = game => {
    this.channel.push("set_game", { game });
  };

  handleStartGame = () => {
    this.channel.push("start_game");
  };

  handlePlay = args => {
    this.channel.push("make_play", { ...args, player_id: this.state.yourId });
  };

  handleJoinRoom = ({ playerName, roomCode, onError }) => {
    this.channel = getChannel({
      topic: "room:" + roomCode,
      params: { player_id: getPlayerId(), player_name: playerName }
    });

    this.channel
      .join()
      .receive("ok", ({ player_id }) => {
        setPlayerId(player_id);
        this.channel.on("new_state", this.updateRoomState);
        this.setState({ roomCode, yourId: player_id });
      })
      .receive("error", message => {
        onError({ message });
      });
  };

  updateRoomState = ({
    game,
    game_state,
    minimum_players,
    players: rawPlayers
  }) => {
    const { yourId } = this.state;
    const players = mapValues(rawPlayers, player =>
      mapKeys(player, (value, key) => camelCase(key))
    );

    this.setState({
      roomReady: true,
      you: players[yourId],
      others: omit(players, [yourId]),
      game,
      minimumPlayers: minimum_players,
      gameState: game_state
    });
  };

  render() {
    const {
      roomCode,
      roomReady,
      you,
      others,
      game,
      minimumPlayers,
      gameState
    } = this.state;

    return (
      <Container>
        <AppHeader />
        {roomReady ? (
          <Room
            roomCode={roomCode}
            you={you}
            others={others}
            game={game}
            minimumPlayers={minimumPlayers}
            gameState={gameState}
            onSelectGame={this.handleSelectGame}
            onStartGame={this.handleStartGame}
            onPlay={this.handlePlay}
          />
        ) : (
          <Lobby
            onCreateRoom={this.handleCreateRoom}
            onJoinRoom={this.handleJoinRoom}
          />
        )}
      </Container>
    );
  }
}

export default App;
