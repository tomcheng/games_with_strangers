import React from "react";
import PropTypes from "prop-types";
import find from "lodash/find";
import sortBy from "lodash/sortBy";
import gamesList from "../gamesList";
import EndStage from "./common/EndStage";
import Waiting from "./Waiting";

const COLORS = ["red", "white", "blue", "orange", "purple", "yellow", "green"];

const getPlayerColors = players =>
  sortBy(players, p => p.id).reduce(
    (acc, p, index) => ({ ...acc, [p.id]: COLORS[index % COLORS.length] }),
    {}
  );

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
  const playerColors = getPlayerColors(others.concat(you));

  if (!gameState) {
    return (
      <Waiting
        gameName={game.displayName}
        gameOptions={game.options}
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
      playerColors={playerColors}
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
