import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import SectionHeader from "../../common/SectionHeader";
import Guesses from "./Guesses";
import Bets from "./Bets";

const Question = styled.h1`
  text-align: center;
  margin-bottom: 24px;
`;

const YouBet = ({ gameState, onPlay }) => {
  const { round, stage, question, you, others, guesses } = gameState;

  return (
    <div>
      <SectionHeader>Round {round}</SectionHeader>
      <Question>{question}</Question>
      {stage === "guessing" && (
        <Guesses
          yourGuess={you.guess}
          onSubmitGuess={({ guess }) => {
            onPlay({ type: "guess", payload: guess });
          }}
          others={others}
        />
      )}
      {stage === "betting" && (
        <Bets
          guesses={guesses}
          you={you}
          others={others}
          onBet={payload => {
            onPlay({ type: "bet", payload });
          }}
          onFinalizeBets={payload => {
            onPlay({ type: "finalize_bets", payload });
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
      guess: PropTypes.number
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
