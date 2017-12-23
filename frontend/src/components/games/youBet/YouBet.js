import React from "react";
import PropTypes from "prop-types";
import values from "lodash/values";
import GuessForm from "./GuessForm";
import Bets from "./Bets";

const YouBet = ({ gameState, onPlay, you, others }) => {
  const { round, stage, question, players, guesses } = gameState;
  const youGuessed = players[you.id].guessed;

  return (
    <div>
      <div>Round: {round}</div>
      <div>{question}</div>
      {stage === "guessing" &&
        !youGuessed && (
          <GuessForm
            onSubmitGuess={({ guess }) => {
              onPlay({ type: "guess", payload: guess });
            }}
          />
        )}
      {youGuessed && (
        <div>
          Waiting on:{" "}
          {values(players)
            .filter(p => !p.guessed)
            .map(p => others[p.id].name)
            .join(", ")}
        </div>
      )}
      {stage === "betting" && (
        <Bets guesses={guesses} players={{ ...others, [you.id]: you }} />
      )}
    </div>
  );
};

YouBet.propTypes = {
  gameState: PropTypes.shape({
    round: PropTypes.number.isRequired,
    stage: PropTypes.oneOf(["guessing", "betting"]).isRequired,
    question: PropTypes.string.isRequired,
    players: PropTypes.objectOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        bet: PropTypes.number,
        guessed: PropTypes.bool
      })
    ).isRequired,
    guesses: PropTypes.arrayOf(
      PropTypes.shape({
        guess: PropTypes.number,
        players: PropTypes.arrayOf(PropTypes.string),
        odds: PropTypes.number
      })
    )
  }).isRequired,
  others: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  you: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  onPlay: PropTypes.func.isRequired
};

export default YouBet;
