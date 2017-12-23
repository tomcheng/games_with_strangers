import React, { Fragment } from "react";
import PropTypes from "prop-types";
import omit from "lodash/omit";
import values from "lodash/values";
import find from "lodash/find";
import gamesList from "../gamesList";
import Player from "./Player";

const pluralize = (str, count) => str + (count === 1 ? "" : "s");

const Room = ({
  game,
  gameState,
  minimumPlayers,
  players,
  playerId,
  roomCode,
  onSelectGame,
  onStartGame,
  onPlay
}) => {
  const currentPlayer = players[playerId];
  const otherPlayers = omit(players, [playerId]);
  const playersNeeded =
    minimumPlayers && players
      ? Math.max(minimumPlayers - values(players).length, 0)
      : null;

  if (gameState && game) {
    const GameComponent = find(gamesList, g => g.id === game).component;
    return <GameComponent gameState={gameState} onPlay={onPlay} />;
  }

  return (
    <Fragment>
      <div>{roomCode}</div>
      {!game && (
        <Fragment>
          <div>Select a game:</div>
          {gamesList.map(({ id, displayName }) => (
            <div key={id}>
              <button
                onClick={() => {
                  onSelectGame(id);
                }}
              >
                {displayName}
              </button>
            </div>
          ))}
        </Fragment>
      )}
      {game && <div>Selected game: {game}</div>}
      <div>You:</div>
      <Player player={currentPlayer} />
      <div>Others Players:</div>
      {values(otherPlayers).map(player => (
        <Player key={player.id} player={player} />
      ))}
      {!!playersNeeded &&
        `${playersNeeded} ${pluralize("player", playersNeeded)} needed`}
      {playersNeeded === 0 && <button onClick={onStartGame}>Start Game</button>}
    </Fragment>
  );
};

Room.propTypes = {
  players: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  ).isRequired,
  roomCode: PropTypes.string.isRequired,
  onSelectGame: PropTypes.func.isRequired,
  onStartGame: PropTypes.func.isRequired,
  playerId: PropTypes.string.isRequired,
  game: PropTypes.oneOf(gamesList.map(g => g.id)),
  gameState: PropTypes.object,
  minimumPlayers: PropTypes.number
};

export default Room;
