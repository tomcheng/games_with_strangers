import React from "react";
import PropTypes from "prop-types";
import GuessForm from "./GuessForm";

const YouBet = ({ gameState, onPlay }) => {
  const { round, stage, question } = gameState;

  return (
    <div>
      <div>Round: {round}</div>
      <div>{question}</div>
      {stage === "guessing" && (
        <GuessForm
          onSubmitGuess={({ guess }) => {
            onPlay({ play: "guess", payload: guess });
          }}
        />
      )}
    </div>
  );
};

YouBet.propsTypes = {
  gameState: PropTypes.shape({
    round: PropTypes.number.isRequired,
    stage: PropTypes.oneOf(["guessing", "betting"]).isRequired,
    question: PropTypes.string.isRequired
  }).isRequired,
  onPlay: PropTypes.func.isRequired
};

export default YouBet;
