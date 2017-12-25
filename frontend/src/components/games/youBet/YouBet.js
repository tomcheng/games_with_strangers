import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import SectionHeader from "../../common/SectionHeader";
import GuessForm from "./GuessForm";
import Bets from "./Bets";

const Question = styled.h1`
  text-align: center;
  margin-bottom: 24px;
`;

const YouBet = ({ gameState, onPlay }) => {
  const { round, stage, question, you, others, guesses } = gameState;
  const youGuessed = you.guessed;

  return (
    <div>
      <SectionHeader>Round {round}</SectionHeader>
      <Question>{question}</Question>
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
          {others
            .filter(p => !p.guessed)
            .map(p => p.name)
            .join(", ")}
        </div>
      )}
      {stage === "betting" && (
        <Bets
          guesses={guesses}
          gameStatePlayers={[you].concat(others)}
          onBet={payload => {
            onPlay({ type: "bet", payload });
          }}
        />
      )}
    </div>
  );
};

YouBet.propTypes = {
  gameState: PropTypes.shape({
    round: PropTypes.number.isRequired,
    stage: PropTypes.oneOf(["guessing", "betting"]).isRequired,
    question: PropTypes.string.isRequired,
    you: PropTypes.shape({
      id: PropTypes.string.isRequired,
      bet: PropTypes.number,
      guessed: PropTypes.bool
    }),
    others: PropTypes.arrayOf(
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
  onPlay: PropTypes.func.isRequired
};

export default YouBet;
