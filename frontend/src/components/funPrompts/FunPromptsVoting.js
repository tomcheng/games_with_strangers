import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Heading from "../common/Heading";
import Card from "../common/Card";

const Answer = styled(Card)`
  min-height: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FunPromptsVoting = ({ prompt, choices, youAnswered, onVote }) => (
  <Fragment>
    <Heading center spaceBottom={3}>
      {prompt}
    </Heading>
    {choices.map(({ answer, player, yourAnswer }) => (
      <Answer
        key={player.id}
        onClick={
          youAnswered
            ? null
            : () => {
                onVote({ playerId: player.id });
              }
        }
        style={{ opacity: youAnswered ? 0.4 : 1 }}
      >
        <Heading level={3} center spaceBottom={0}>
          {answer}
        </Heading>
        {yourAnswer && <div>(your answer)</div>}
      </Answer>
    ))}
  </Fragment>
);

FunPromptsVoting.propTypes = {
  prompt: PropTypes.string.isRequired,
  choices: PropTypes.arrayOf(
    PropTypes.shape({
      answer: PropTypes.string.isRequired,
      player: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired,
      yourAnswer: PropTypes.bool.isRequired
    })
  ).isRequired,
  youAnswered: PropTypes.bool.isRequired,
  onVote: PropTypes.func.isRequired
};

export default FunPromptsVoting;
