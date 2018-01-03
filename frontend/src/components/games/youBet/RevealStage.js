import React from "react";
import PropTypes from "prop-types";
import * as customTypes from "../../../utils/customTypes";
import { makeList } from "../../../utils/strings";
import styled from "styled-components";
import Button from "../../common/Button";
import SecondaryText from "../../common/SecondaryText";
import DelayShow from "../../common/DelayShow";

const DELAY_START = 5000;
const DELAY_INTERVAL = 1000;

const Container = styled.div`
  text-align: center;
`;

const AnswerLabel = styled.h3`
  margin-bottom: 8px;
`;

const Answer = styled.h1`
  margin-bottom: 16px;
`;

const Payout = styled.h3`
  margin-bottom: 16px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
`;

const RevealStage = ({
  answer,
  closestGuess,
  payouts,
  youAreModerator,
  onAdvanceRound,
  moderator
}) => {
  const closestPlayers = payouts.filter(p => p.closest).map(p => p.player);
  const payoutsFromBetting = payouts
    .map(payout => ({
      ...payout,
      delta: payout.closest ? payout.delta - 300 : payout.delta
    }))
    .filter(p => p.delta !== 0);

  return (
    <Container>
      <DelayShow delay={0}>
        <AnswerLabel>The correct answer is:</AnswerLabel>
      </DelayShow>
      <DelayShow delay={1000}>
        <Answer>{answer}</Answer>
      </DelayShow>
      <DelayShow delay={2000}>
        <AnswerLabel>The closest without going over is:</AnswerLabel>
      </DelayShow>
      <DelayShow delay={3000}>
        <Answer>{closestGuess}</Answer>
      </DelayShow>
      <DelayShow delay={4000}>
        {closestPlayers.length ? (
          <Payout>
            {makeList(closestPlayers.map(p => p.name))} gets $300 for having the
            closest answer
          </Payout>
        ) : (
          <Payout>Everybody guessed too high</Payout>
        )}
      </DelayShow>
      {payoutsFromBetting.map(({ player, delta, closest }, index) => (
        <DelayShow key={player.id} delay={DELAY_START + index * DELAY_INTERVAL}>
          <Payout>
            {player.name} {delta < 0 ? "loses" : "gets"} ${Math.abs(delta)}
          </Payout>
        </DelayShow>
      ))}
      <DelayShow
        delay={DELAY_START + payoutsFromBetting.length * DELAY_INTERVAL}
      >
        <Footer>
          {youAreModerator ? (
            <Button onClick={onAdvanceRound}>Start Next Round</Button>
          ) : (
            <SecondaryText>
              Waiting for {moderator.name} to start next round&hellip;
            </SecondaryText>
          )}
        </Footer>
      </DelayShow>
    </Container>
  );
};

RevealStage.propTypes = {
  answer: PropTypes.number.isRequired,
  closestGuess: PropTypes.number.isRequired,
  payouts: PropTypes.arrayOf(
    PropTypes.shape({
      player: customTypes.player.isRequired,
      delta: PropTypes.number.isRequired,
      closest: PropTypes.bool.isRequired
    })
  ).isRequired,
  youAreModerator: PropTypes.bool.isRequired,
  onAdvanceRound: PropTypes.func.isRequired,
  moderator: customTypes.player
};

export default RevealStage;
