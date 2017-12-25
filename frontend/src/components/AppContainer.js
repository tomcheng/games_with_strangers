import React, { Component } from "react";
import createHistory from "history/createBrowserHistory";
import mapValues from "lodash/mapValues";
import mapKeys from "lodash/mapKeys";
import camelCase from "lodash/camelCase";
import omit from "lodash/omit";
import pick from "lodash/pick";
import values from "lodash/values";
import { POST, getChannel } from "../utils/api";
import { setPlayerId, getPlayerId } from "../utils/localStorage";
import App from "./App";

const getRoomCodeFromLocation = ({ search }) => {
  const match = search.match(/[?&]c=([A-Z]{4})/);

  if (!match) {
    return null;
  }

  return match[1];
};

const INITIAL_STATE = {
  roomCode: null,
  roomReady: false,
  yourId: null,
  you: null,
  others: null,
  game: null,
  playersNeeded: null,
  gameState: null
};

class AppContainer extends Component {
  constructor() {
    super();

    this.channel = null;

    this.history = createHistory();
    const codeFromLocation = getRoomCodeFromLocation(this.history.location);

    this.state = {
      ...INITIAL_STATE,
      previousRoomCode: codeFromLocation
    };

    if (codeFromLocation) {
      this.history.replace("/");
    }

    this.history.listen(this.handleLocationChange);
  }

  handleLocationChange = ({ search }) => {
    if (search === "") {
      const { others, roomCode } = this.state;
      this.setState({
        previousRoomCode: values(others).length > 0 ? roomCode : null
      });
      this.handleLeaveRoom();
    }
  };

  handleCreateRoom = ({ playerName, game }) => {
    POST("/rooms", { game }).then(({ room_code }) => {
      this.handleJoinRoom({ playerName, roomCode: room_code });
    });
  };

  handleStartGame = () => {
    this.channel.push("start_game");
  };

  handlePlay = args => {
    this.channel.push("make_play", { ...args, player_id: this.state.yourId });
  };

  handleJoinRoom = ({ playerName, roomCode, onError }) => {
    this.history.push(`?c=${roomCode}`);
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

  handleLeaveRoom = () => {
    if (!this.channel) {
      return;
    }

    this.channel.leave().receive("ok", () => {
      this.setState(INITIAL_STATE);
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
          "previousRoomCode",
          "roomReady",
          "roomCode",
          "you",
          "others",
          "game",
          "playersNeeded",
          "gameState"
        ])}
        onStartGame={this.handleStartGame}
        onPlay={this.handlePlay}
        onCreateRoom={this.handleCreateRoom}
        onJoinRoom={this.handleJoinRoom}
      />
    );
  }
}

export default AppContainer;
