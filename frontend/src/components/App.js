import React, { Component } from "react";
import mapValues from "lodash/mapValues";
import mapKeys from "lodash/mapKeys";
import camelCase from "lodash/camelCase";
import { POST, getChannel } from "../utils/api";
import Lobby from "./Lobby";
import Room from "./Room";
import "./App.css";

const PLAYER_ID_KEY = "_gws_player_id";
const PLAYER_NAME_KEY = "_gws_player_name";

const setPlayerId = id => localStorage.setItem(PLAYER_ID_KEY, id);
const getPlayerId = () => localStorage.getItem(PLAYER_ID_KEY);
const setPlayerName = name => localStorage.setItem(PLAYER_NAME_KEY, name);
const getPlayerName = () => localStorage.getItem(PLAYER_NAME_KEY);

class App extends Component {
  static propTypes = {};

  state = {
    channel: null,
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
    this.channel.push("game_play", { play: "start_game" });
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
      savedPlayerName,
    } = this.state;

    return (
      <div>
        <h1>Games with Strangers</h1>
        {!roomCode && (
          <Lobby
            onJoinRoom={this.handleJoinRoom}
            onCreateRoom={this.handleCreateRoom}
            savedPlayerName={savedPlayerName}
          />
        )}
        {roomCode && (
          <Room
            roomCode={roomCode}
            game={game}
            players={players}
            gameState={gameState}
            playerId={playerId}
            minimumPlayers={minimumPlayers}
            onSelectGame={this.handleSelectGame}
            onStartGame={this.handleStartGame}
          />
        )}
      </div>
    );
  }
}

export default App;
