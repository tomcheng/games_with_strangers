import React from "react";
import PropTypes from "prop-types";
import find from "lodash/find";
import sortBy from "lodash/sortBy";
import gamesList from "../gamesList";
import EndStage from "./common/EndStage";
import Waiting from "./Waiting";

const COLORS = ["red", "white", "blue", "orange", "purple", "yellow", "green", "brown"];

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

  if (gameState.stage === "end") {
    return (
      <EndStage
        scores={gameState.scores}
        youAreModerator={youAreModerator}
        moderator={moderator}
        onRestartGame={() => {
          onPlay({ type: "restart" });
        }}
      />
    );
  }

  const playerColors = getPlayerColors(gameState.players);
  playerColors[you.id] = "black";
  const GameComponent = game.component;

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
    players: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired
      })
    ).isRequired,
    stage: PropTypes.string.isRequired,
    scores: PropTypes.array.isRequired
  }),
  playersNeeded: PropTypes.number
};

export default Room;
