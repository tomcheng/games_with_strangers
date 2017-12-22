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
    roomCode: null,
    channel: null,
    gameState: null,
    game: null,
    players: null,
    savedPlayerName: getPlayerName() || "",
    playerId: null
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

  joinRoom = ({ playerName, roomCode, onError }) => {
    this.channel = getChannel({
      topic: "room:" + roomCode,
      params: { player_id: getPlayerId(), player_name: playerName }
    });

    this.channel
      .join()
      .receive("ok", ({ game, players, game_state, player_id }) => {
        setPlayerId(player_id);

        this.channel.on("new_state", this.updateRoomState);

        this.setState({ roomCode, playerId: player_id });
        this.updateRoomState({ game, players, gameState: game_state });
      })
      .receive("error", message => {
        onError({ message });
      });
  };

  updateRoomState = ({ game, players, gameState }) => {
    this.setState({
      game,
      players: mapValues(players, player =>
        mapKeys(player, (value, key) => camelCase(key))
      ),
      gameState
    });
  };

  savePlayerName = name => {
    setPlayerName(name);
    this.setState({ savedPlayerName: name });
  };

  render() {
    const {
      savedPlayerName,
      roomCode,
      game,
      players,
      gameState,
      playerId
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
            code={roomCode}
            game={game}
            players={players}
            gameState={gameState}
            playerId={playerId}
            onSelectGame={this.handleSelectGame}
          />
        )}
      </div>
    );
  }
}

export default App;
