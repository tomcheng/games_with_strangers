import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Heading from "../common/Heading";
import Card from "../common/Card";

const Answer = styled(Card)`
  min-height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FunPromptsVoting = ({ prompt, choices, onVote }) => (
  <Fragment>
    <Heading center spaceBottom={3}>
      {prompt}
    </Heading>
    {choices.map(({ answer, player }) => (
      <Answer
        key={player.id}
        onClick={() => {
          onVote({ playerId: player.id });
        }}
      >
        <Heading level={3} center>
          {answer}
        </Heading>
      </Answer>
    ))}
  </Fragment>
);

FunPromptsVoting.propTypes = {
  prompt: PropTypes.string.isRequired,
  choices: PropTypes.arrayOf(
    PropTypes.shape({
      answer: PropTypes.string.isRequired,
      player: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired
    })
  ).isRequired,
  onVote: PropTypes.func.isRequired
};

export default FunPromptsVoting;
