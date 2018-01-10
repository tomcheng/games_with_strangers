import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import maxBy from "lodash/maxBy";
import Heading from "../common/Heading";
import Card from "../common/Card";
import SecondaryText from "../common/SecondaryText";
import OverlayLabel from "../common/OverlayLabel";
import { makeList } from "../../utils/strings";

const Answers = styled.div`
  display: flex;
`;

const AnswerContainer = styled.div`
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: 50%;
  & + & {
    margin-left: 10px;
  }
`;

const Answer = styled(Card)`
  min-height: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FunPromptsVoting = ({
  prompt,
  choices,
  youAnswered,
  youVoted,
  onVote,
  awaitingVote
}) => {
  const isTie =
    awaitingVote.length === 0 && choices[0].length === choices[1].votes.length;
  const winner =
    awaitingVote.length === 0 && !isTie
      ? maxBy(choices, c => c.votes.length).player.id
      : null;
  console.log("winner:", winner);
  return (
    <Fragment>
      <Heading center spaceBottom={3}>
        {prompt}
      </Heading>
      <Answers>
        {choices.map(({ answer, player, yourAnswer, votes }) => (
          <AnswerContainer key={player.id}>
            <OverlayLabel
              label={isTie ? "TIE" : winner === player.id ? "WINNER" : null}
            >
                <Answer
                  onClick={
                    youAnswered || youVoted
                      ? null
                      : () => {
                          onVote({ playerId: player.id });
                        }
                  }
                  style={{ opacity: youAnswered ? 0.4 : 1 }}
                  spaceBottom={2}
                >
                  <Heading level={3} center spaceBottom={0}>
                    {answer}
                  </Heading>
                  {yourAnswer && <SecondaryText>(your answer)</SecondaryText>}
                  {(youVoted || youAnswered) &&
                    !yourAnswer && <SecondaryText>{player.name}</SecondaryText>}
                </Answer>
            </OverlayLabel>
            {(youVoted || youAnswered) &&
              votes.map(({ id, name }) => (
                <Heading key={id} level={3} center>
                  {name}
                </Heading>
              ))}
          </AnswerContainer>
        ))}
      </Answers>
      {(youVoted || youAnswered) &&
        awaitingVote.length > 0 && (
          <SecondaryText center spaceTop={2}>
            Waiting for {makeList(awaitingVote.map(a => a.name))} to
            vote&hellip;
          </SecondaryText>
        )}
    </Fragment>
  );
};

FunPromptsVoting.propTypes = {
  awaitingVote: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  prompt: PropTypes.string.isRequired,
  choices: PropTypes.arrayOf(
    PropTypes.shape({
      answer: PropTypes.string.isRequired,
      player: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired,
      votes: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired
        })
      ).isRequired,
      yourAnswer: PropTypes.bool.isRequired
    })
  ).isRequired,
  youAnswered: PropTypes.bool.isRequired,
  youVoted: PropTypes.bool.isRequired,
  onVote: PropTypes.func.isRequired
};

export default FunPromptsVoting;
