import React from "react";
import PropTypes from "prop-types";
import * as customTypes from "../../../utils/customTypes";
import styled from "styled-components";
import SectionHeader from "../../common/SectionHeader";
import GuessingStage from "./GuessingStage";
import BettingStage from "./BettingStage";
import RevealStage from "./RevealStage";

const Question = styled.h1`
  text-align: center;
  margin-bottom: 16px;
`;

const YouBet = ({ gameState, onPlay }) => {
  const {
    round,
    question,
    stage,
    your_guess: yourGuess,
    awaiting_guess: awaitingGuess,
    bet_options: betOptions,
    your_bets: yourBets,
    awaiting_bet: awaitingBet,
    answer,
    payouts
  } = gameState;

  return (
    <div>
      <SectionHeader>Round {round}</SectionHeader>
      <Question>{question}</Question>
      {stage === "guessing" && (
        <GuessingStage
          yourGuess={yourGuess}
          onSubmitGuess={({ guess }) => {
            onPlay({ type: "guess", payload: guess });
          }}
          awaitingGuess={awaitingGuess}
        />
      )}
      {stage === "betting" && (
        <BettingStage
          betOptions={betOptions}
          yourBets={yourBets}
          awaitingBet={awaitingBet}
          onBet={payload => {
            onPlay({ type: "bet", payload });
          }}
          onFinalizeBets={payload => {
            onPlay({ type: "finalize_bets", payload });
          }}
        />
      )}
      {stage === "reveal" && <RevealStage answer={answer} payouts={payouts} />}
    </div>
  );
};

YouBet.propTypes = {
  gameState: PropTypes.shape({
    round: PropTypes.number.isRequired,
    stage: PropTypes.oneOf(["guessing", "betting", "reveal"]).isRequired,
    question: PropTypes.string.isRequired,
    your_guess: PropTypes.number,
    awaiting_guess: customTypes.players,
    bet_options: PropTypes.arrayOf(
      PropTypes.shape({
        guess: PropTypes.number.isRequired,
        odds: PropTypes.number.isRequired,
        players: customTypes.players.isRequired
      })
    ),
    your_bets: PropTypes.arrayOf(
      PropTypes.shape({
        guess: PropTypes.number.isRequired,
        wager: PropTypes.number.isRequired
      })
    ),
    awaiting_bet: customTypes.players,
    answer: PropTypes.number,
    payouts: PropTypes.arrayOf(
      PropTypes.shape({
        player: customTypes.player.isRequired,
        amount: PropTypes.number.isRequired,
        closest: PropTypes.bool.isRequired,
        wager: PropTypes.number,
        odds: PropTypes.number
      })
    ).isRequired
  }).isRequired,
  onPlay: PropTypes.func.isRequired
};

export default YouBet;
