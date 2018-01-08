import React from "react";
import PropTypes from "prop-types";
import SectionHeader from "../../common/SectionHeader";
import FunPromptsWriting from "./FunPromptsWriting";

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
  </div>
);

FunPrompts.propTypes = {
  gameState: PropTypes.shape({
    round: PropTypes.number.isRequired,
    stage: PropTypes.oneOf(["writing", "voting"]).isRequired,
    scores: PropTypes.array.isRequired,
    awaiting_answer: PropTypes.array,
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
