import React from "react";
import PropTypes from "prop-types";
import SectionHeader from "../common/SectionHeader";
import FunPromptsWriting from "./FunPromptsWriting";
import FunPromptsVoting from "./FunPromptsVoting";

const FunPrompts = ({ gameState, onPlay }) => {
  const {
    round,
    prompt,
    prompts,
    choices: choicesIn,
    you_answered: youAnswered
  } = gameState;
  const choices = choicesIn && choicesIn.map(({ your_answer: yourAnswer, ...other }) => ({
    ...other,
    yourAnswer
  }));

  return (
    <div>
      <SectionHeader>Round {round}</SectionHeader>
      {gameState.stage === "writing" && (
        <FunPromptsWriting
          prompts={prompts}
          onAnswer={payload => {
            onPlay({ type: "answer", payload });
          }}
          awaitingAnswer={gameState.awaiting_answer}
        />
      )}
      {gameState.stage === "voting" && (
        <FunPromptsVoting
          prompt={prompt}
          choices={choices}
          onVote={({ playerId }) => {
            onPlay({ type: "vote", payload: { player_id: playerId } });
          }}
          youAnswered={youAnswered}
        />
      )}
    </div>
  );
};

FunPrompts.propTypes = {
  gameState: PropTypes.shape({
    round: PropTypes.number.isRequired,
    stage: PropTypes.oneOf(["writing", "voting"]).isRequired,
    scores: PropTypes.array.isRequired,
    awaiting_answer: PropTypes.array,
    choices: PropTypes.array,
    prompt: PropTypes.string,
    prompts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        prompt: PropTypes.string.isRequired
      })
    ),
    you_answered: PropTypes.bool
  }).isRequired,
  onPlay: PropTypes.func.isRequired
};

export default FunPrompts;
