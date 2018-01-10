import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import maxBy from "lodash/maxBy";
import Heading from "../common/Heading";
import Card from "../common/Card";
import SecondaryText from "../common/SecondaryText";
import OverlayLabel from "../common/OverlayLabel";
import { makeList } from "../../utils/strings";

const DELAY_AFTER_SHOWING_WINNER = 5000;

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

class FunPromptsVoting extends Component {
  static propTypes = {
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
    youAreModerator: PropTypes.bool.isRequired,
    youVoted: PropTypes.bool.isRequired,
    onAdvance: PropTypes.func.isRequired,
    onVote: PropTypes.func.isRequired
  };

  componentWillReceiveProps(nextProps) {
    const { awaitingVote, onAdvance, youAreModerator } = this.props;

    if (
      youAreModerator &&
      awaitingVote.length > 0 &&
      nextProps.awaitingVote.length === 0
    ) {
      setTimeout(onAdvance, DELAY_AFTER_SHOWING_WINNER);
    }
  }

  isTie = (props = this.props) => {
    const { awaitingVote, choices } = props;
    return (
      awaitingVote.length === 0 && choices[0].length === choices[1].votes.length
    );
  };

  getWinner = (props = this.props) => {
    const { awaitingVote, choices } = props;
    const isTie = this.isTie(props);

    return awaitingVote.length === 0 && !isTie
      ? maxBy(choices, c => c.votes.length).player.id
      : null;
  };

  render() {
    const {
      prompt,
      choices,
      youAnswered,
      youVoted,
      onVote,
      awaitingVote
    } = this.props;
    const isTie = this.isTie();
    const winner = this.getWinner();

    return (
      <Fragment>
        <Heading center spaceBottom={3} safe>
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
        {(youVoted || youAnswered) && (
          <SecondaryText center spaceTop={2}>
            {awaitingVote.length > 0 ? (
              <span>
                Waiting for {makeList(awaitingVote.map(a => a.name))} to
                vote&hellip;
              </span>
            ) : (
              "All votes in"
            )}
          </SecondaryText>
        )}
      </Fragment>
    );
  }
}

export default FunPromptsVoting;
