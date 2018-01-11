import React from "react";
import PropTypes from "prop-types";
import * as customTypes from "../../utils/customTypes";
import SectionHeader from "../common/SectionHeader";
import Heading from "../common/Heading";
import Sidebar from "../common/Sidebar";
import Scores from "./Scores";
import YouBetGuessing from "./YouBetGuessing";
import YouBetBetting from "./YouBetBetting";
import YouBetReveal from "./YouBetReveal";
import EndStage from "../common/EndStage";

const YouBet = ({
  gameState,
  youAreModerator,
  onPlay,
  onSetFlashMessage,
  moderator
}) => {
  const {
    answer,
    payouts,
    question,
    round,
    scores,
    stage,
    awaiting_bet: awaitingBet,
    awaiting_guess: awaitingGuess,
    bet_options: betOptions,
    closest_guess: closestGuess,
    your_bets: yourBets,
    your_guess: yourGuess,
    your_score: yourScore
  } = gameState;

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
    <div>
      <Sidebar>
        <Scores scores={scores} />
      </Sidebar>
      <SectionHeader>Round {round}</SectionHeader>
      <Heading center spaceBottom={stage === "betting" ? 3 : 2}>
        {question}
      </Heading>
      {stage === "guessing" && (
        <YouBetGuessing
          yourGuess={yourGuess}
          onSubmitGuess={({ guess }) => {
            onPlay({ type: "guess", payload: guess });
          }}
          awaitingGuess={awaitingGuess}
          onSetFlashMessage={onSetFlashMessage}
        />
      )}
      {stage === "betting" && (
        <YouBetBetting
          awaitingBet={awaitingBet}
          betOptions={betOptions}
          yourBets={yourBets}
          yourScore={yourScore}
          onBet={payload => {
            onPlay({ type: "bet", payload });
          }}
          onFinalizeBets={payload => {
            onPlay({ type: "finalize_bets", payload });
          }}
          onSetFlashMessage={onSetFlashMessage}
        />
      )}
      {stage === "reveal" && (
        <YouBetReveal
          answer={answer}
          closestGuess={closestGuess}
          payouts={payouts}
          youAreModerator={youAreModerator}
          moderator={moderator}
          onAdvanceRound={() => {
            onPlay({ type: "advance_round" });
          }}
        />
      )}
    </div>
  );
};

YouBet.propTypes = {
  gameState: PropTypes.shape({
    scores: PropTypes.array.isRequired,
    stage: PropTypes.oneOf(["guessing", "betting", "reveal", "end"]).isRequired,
    answer: PropTypes.number,
    awaiting_bet: customTypes.players,
    awaiting_guess: customTypes.players,
    bet_options: PropTypes.array,
    closest_guess: PropTypes.number,
    payouts: PropTypes.array,
    question: PropTypes.string,
    round: PropTypes.number,
    your_bets: PropTypes.array,
    your_guess: PropTypes.number,
    your_score: PropTypes.number
  }).isRequired,
  youAreModerator: PropTypes.bool.isRequired,
  onPlay: PropTypes.func.isRequired,
  onSetFlashMessage: PropTypes.func.isRequired,
  moderator: customTypes.player
};

export default YouBet;
