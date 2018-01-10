import React from "react";
import PropTypes from "prop-types";
import SectionHeader from "../common/SectionHeader";
import FunPromptsWriting from "./FunPromptsWriting";
import FunPromptsVoting from "./FunPromptsVoting";
import FunPromptsShowScores from "./FunPromptsShowScores";

const FunPrompts = ({ gameState, onPlay, youAreModerator, moderator }) => {
  const {
    round,
    prompt,
    prompts,
    stage,
    scores,
    awaiting_answer: awaitingAnswer,
    awaiting_vote: awaitingVote,
    choices: choicesIn,
    you_answered: youAnswered,
    you_voted: youVoted
  } = gameState;
  const choices =
    choicesIn &&
    choicesIn.map(({ your_answer: yourAnswer, ...other }) => ({
      ...other,
      yourAnswer
    }));

  return (
    <div>
      <SectionHeader>Round {round}</SectionHeader>
      {stage === "writing" && (
        <FunPromptsWriting
          prompts={prompts}
          onAnswer={payload => {
            onPlay({ type: "answer", payload });
          }}
          awaitingAnswer={awaitingAnswer}
        />
      )}
      {stage === "voting" && (
        <FunPromptsVoting
          awaitingVote={awaitingVote}
          prompt={prompt}
          choices={choices}
          youAnswered={youAnswered}
          youVoted={youVoted}
          youAreModerator={youAreModerator}
          onVote={({ playerId }) => {
            onPlay({ type: "vote", payload: { player_id: playerId } });
          }}
          onAdvance={() => {
            onPlay({ type: "advance" });
          }}
        />
      )}
      {stage === "show_scores" && (
        <FunPromptsShowScores
          scores={scores}
          youAreModerator={youAreModerator}
          moderatorName={moderator.name}
          onAdvance={() => {
            onPlay({ type: "advance" });
          }}
        />
      )}
    </div>
  );
};

FunPrompts.propTypes = {
  gameState: PropTypes.shape({
    round: PropTypes.number.isRequired,
    stage: PropTypes.oneOf(["writing", "voting", "show_scores"]).isRequired,
    awaiting_answer: PropTypes.array,
    awaiting_vote: PropTypes.array,
    choices: PropTypes.array,
    prompt: PropTypes.string,
    prompts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        prompt: PropTypes.string.isRequired
      })
    ),
    scores: PropTypes.array,
    you_answered: PropTypes.bool,
    you_voted: PropTypes.bool
  }).isRequired,
  youAreModerator: PropTypes.bool.isRequired,
  moderator: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  onPlay: PropTypes.func.isRequired
};

export default FunPrompts;
