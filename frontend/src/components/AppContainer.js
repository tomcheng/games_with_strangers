import React, { Component } from "react";
import mapValues from "lodash/mapValues";
import mapKeys from "lodash/mapKeys";
import camelCase from "lodash/camelCase";
import omit from "lodash/omit";
import pick from "lodash/pick";
import values from "lodash/values";
import { POST, getChannel } from "../utils/api";
import { setPlayerId, getPlayerId } from "../utils/localStorage";
import App from "./App";

class AppContainer extends Component {
  static propTypes = {};

  state = {
    roomCode: null,
    roomReady: false,
    yourId: null,
    you: null,
    others: null,
    game: null,
    playersNeeded: null,
    gameState: null
  };

  channel = null;

  handleCreateRoom = ({ playerName, game }) => {
    POST("/rooms", { game }).then(({ room_code }) => {
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
    const playersNeeded = Math.max(minimum_players - values(players).length, 0);

    this.setState({
      roomReady: true,
      you: players[yourId],
      others: omit(players, [yourId]),
      game,
      playersNeeded,
      gameState: game_state
    });
  };

  render() {
    return (
      <App
        {...pick(this.state, [
          "roomReady",
          "roomCode",
          "you",
          "others",
          "game",
          "playersNeeded",
          "gameState"
        ])}
        onSelectGame={this.handleSelectGame}
        onStartGame={this.handleStartGame}
        onPlay={this.handlePlay}
        onCreateRoom={this.handleCreateRoom}
        onJoinRoom={this.handleJoinRoom}
      />
    );
  }
}

export default AppContainer;
