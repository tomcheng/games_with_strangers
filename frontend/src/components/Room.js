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
  playersNeeded,
  you,
  others,
  roomCode,
  onStartGame,
  onPlay
}) => {
  if (gameState) {
    const GameComponent = find(gamesList, g => g.id === game).component;
    return <GameComponent gameState={gameState} onPlay={onPlay} you={you} />;
  }

  return (
    <Fragment>
      <div>{roomCode}</div>
      <div>Selected game: {game}</div>
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
  game: PropTypes.oneOf(gamesList.map(g => g.id)).isRequired,
  others: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  ).isRequired,
  roomCode: PropTypes.string.isRequired,
  you: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  onStartGame: PropTypes.func.isRequired,
  gameState: PropTypes.object,
  playersNeeded: PropTypes.number
};

export default Room;
