import React from "react";
import PropTypes from "prop-types";
import SectionHeader from "../common/SectionHeader";
import FunPromptsWriting from "./FunPromptsWriting";
import FunPromptsVoting from "./FunPromptsVoting";

const FunPrompts = ({ gameState, onPlay }) => (
  <div>
    <SectionHeader>Round {gameState.round}</SectionHeader>
    {gameState.stage === "writing" && (
      <FunPromptsWriting
        prompts={gameState.prompts}
        onAnswer={payload => {
          onPlay({ type: "answer", payload });
        }}
        awaitingAnswer={gameState.awaiting_answer}
      />
    )}
    {gameState.stage === "voting" && (
      <FunPromptsVoting
        prompt={gameState.prompt}
        choices={gameState.choices}
      />
    )}
  </div>
);

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
    )
  }).isRequired,
  onPlay: PropTypes.func.isRequired
};

export default FunPrompts;
