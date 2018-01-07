import React, { Component } from "react";
import { DragDropContext } from "react-dnd";
import touchBackend from "react-dnd-touch-backend";
import createHistory from "history/createBrowserHistory";
import mapKeys from "lodash/mapKeys";
import camelCase from "lodash/camelCase";
import pick from "lodash/pick";
import values from "lodash/values";
import { POST, getChannel } from "../utils/api";
import { getRoomCodeFromLocation } from "../utils/location";
import { setPlayerId, getPlayerId } from "../utils/localStorage";
import App from "./App";
import { funPrompts } from "../utils/mockData";

const INITIAL_STATE = {
  roomCode: null,
  roomJoined: false,
  yourId: null,
  you: null,
  others: null,
  gameId: null,
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
      ...funPrompts.writing,
      previousRoomCode: codeFromLocation
    };

    this.history.replace("/");
    this.history.listen(this.handleLocationChange);
  }

  handleLocationChange = location => {
    const newRoomCode = getRoomCodeFromLocation(location);

    if (newRoomCode) {
      return;
    }

    const { others, roomCode } = this.state;

    this.setState({
      previousRoomCode: values(others).length > 0 ? roomCode : null
    });

    this.leaveRoom();
  };

  handleCreateRoom = ({ playerName, gameId }) => {
    POST("/rooms", { game: gameId }).then(({ room_code }) => {
      this.setState({ gameId });
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
    this.channel = getChannel({
      topic: "room:" + roomCode,
      params: { player_id: getPlayerId(), player_name: playerName }
    });

    this.channel
      .join()
      .receive("ok", ({ player_id }) => {
        this.history.push(`?c=${roomCode}`);
        setPlayerId(player_id);
        this.channel.on("new_state", this.updateRoomState);
        this.setState({ roomCode, yourId: player_id });
      })
      .receive("error", message => {
        onError({ message });
      });
  };

  leaveRoom = () => {
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
    you: youRaw,
    others: othersRaw
  }) => {
    const you = mapKeys(youRaw, (value, key) => camelCase(key));
    const others = othersRaw.map(player =>
      mapKeys(player, (value, key) => camelCase(key))
    );
    const playersNeeded = Math.max(minimum_players - others.length - 1, 0);

    this.setState({
      roomJoined: true,
      gameId: game,
      gameState: game_state,
      you,
      others,
      playersNeeded
    });
  };

  render() {
    return (
      <App
        {...pick(this.state, [
          "previousRoomCode",
          "roomJoined",
          "roomCode",
          "you",
          "others",
          "gameId",
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

export default DragDropContext(touchBackend({ enableMouseEvents: true }))(
  AppContainer
);
