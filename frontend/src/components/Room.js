import React from "react";
import PropTypes from "prop-types";
import find from "lodash/find";
import gamesList from "../gamesList";
import EndStage from "./common/EndStage";
import Waiting from "./Waiting";

const Room = ({
  gameId,
  gameState,
  playersNeeded,
  you,
  others,
  onStartGame,
  onPlay,
  onSetFlashMessage
}) => {
  const game = find(gamesList, g => g.id === gameId);
  const youAreModerator = you.isModerator;
  const moderator = youAreModerator ? you : others.find(p => p.isModerator);

  if (!gameState) {
    return (
      <Waiting
        gameName={game.displayName}
        youAreModerator={youAreModerator}
        moderatorName={moderator.name}
        onStartGame={onStartGame}
        others={others}
        playersNeeded={playersNeeded}
        yourName={you.name}
      />
    );
  }

  const { stage, scores } = gameState;
  const GameComponent = game.component;

  if (stage === "end") {
    return (
      <EndStage
        scores={scores}
        youAreModerator={youAreModerator}
        moderator={moderator}
        onRestartGame={() => {
          onPlay({ type: "restart" });
        }}
      />
    );
  }

  return (
    <GameComponent
      gameState={gameState}
      youAreModerator={youAreModerator}
      moderator={moderator}
      onPlay={onPlay}
      onSetFlashMessage={onSetFlashMessage}
    />
  );
};

Room.propTypes = {
  gameId: PropTypes.oneOf(gamesList.map(g => g.id)).isRequired,
  others: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      isModerator: PropTypes.bool.isRequired
    })
  ).isRequired,
  you: PropTypes.shape({
    id: PropTypes.string.isRequired,
    isModerator: PropTypes.bool.isRequired
  }).isRequired,
  onStartGame: PropTypes.func.isRequired,
  gameState: PropTypes.shape({
    scores: PropTypes.array,
    stage: PropTypes.string.isRequired
  }),
  playersNeeded: PropTypes.number
};

export default Room;
