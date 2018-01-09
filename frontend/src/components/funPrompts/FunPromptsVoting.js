import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Heading from "../common/Heading";
import Card from "../common/Card";

const Answers = styled.div`
  display: flex;
  min-height: 140px;
`;

const Answer = styled(Card)`
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & + & {
    margin-left: 10px;
  }
`;

const FunPromptsVoting = ({ prompt, choices, youAnswered, onVote }) => (
  <Fragment>
    <Heading center spaceBottom={3}>
      {prompt}
    </Heading>
    <Answers>
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
    </Answers>
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
