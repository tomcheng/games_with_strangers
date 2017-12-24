import React, { Fragment } from "react";
import PropTypes from "prop-types";
import values from "lodash/values";
import find from "lodash/find";
import gamesList from "../gamesList";
import Player from "./Player";
import { pluralize } from "../utils/strings";

const Room = ({
  game,
  gameState,
  minimumPlayers,
  you,
  others,
  roomCode,
  onSelectGame,
  onStartGame,
  onPlay
}) => {
  const playersNeeded = minimumPlayers
    ? Math.max(minimumPlayers - values(others).length - 1, 0)
    : null;

  if (gameState && game) {
    const GameComponent = find(gamesList, g => g.id === game).component;
    return <GameComponent gameState={gameState} onPlay={onPlay} you={you} />;
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
      <Player player={you} />
      <div>Others:</div>
      {values(others).map(player => <Player key={player.id} player={player} />)}
      {!!playersNeeded &&
        `${playersNeeded} ${pluralize("player", playersNeeded)} needed`}
      {playersNeeded === 0 && <button onClick={onStartGame}>Start Game</button>}
    </Fragment>
  );
};

Room.propTypes = {
  others: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  ).isRequired,
  roomCode: PropTypes.string.isRequired,
  you: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  onSelectGame: PropTypes.func.isRequired,
  onStartGame: PropTypes.func.isRequired,
  game: PropTypes.oneOf(gamesList.map(g => g.id)),
  gameState: PropTypes.object,
  minimumPlayers: PropTypes.number
};

export default Room;
