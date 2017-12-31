import React from "react";
import PropTypes from "prop-types";
import * as customTypes from "../../../utils/customTypes";
import styled from "styled-components";
import SecondaryText from "../../common/SecondaryText";
import Button from "../../common/Button";

const Container = styled.div`
  text-align: center;
`;

const Answer = styled.h1`
  margin-bottom: 16px;
`;

const Payout = styled.div`
  margin-bottom: 16px;
`;

const PayoutTitle = styled.h3`
  margin-bottom: 0;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
`;

const RevealStage = ({ answer, payouts, youAreModerator, onAdvanceRound }) => (
  <Container>
    <h3>The answer is:</h3>
    <Answer>{answer}</Answer>
    {payouts.map(({ player, amount, closest, wager, odds }) => (
      <Payout key={`${player.id}-${closest ? "closest" : "wager"}`}>
        <PayoutTitle>
          {player.name} gets ${amount}
        </PayoutTitle>
        <SecondaryText>
          {closest
            ? "closest guess without going over"
            : `$${wager} bet at ${odds} to 1 odds`}
        </SecondaryText>
      </Payout>
    ))}
    {youAreModerator && (
      <Footer>
        <Button onClick={onAdvanceRound}>Start Next Round</Button>
      </Footer>
    )}
  </Container>
);

RevealStage.propTypes = {
  answer: PropTypes.number.isRequired,
  payouts: PropTypes.arrayOf(
    PropTypes.shape({
      player: customTypes.player.isRequired,
      amount: PropTypes.number.isRequired,
      closest: PropTypes.bool.isRequired,
      wager: PropTypes.number,
      odds: PropTypes.number
    })
  ).isRequired,
  youAreModerator: PropTypes.bool.isRequired,
  onAdvanceRound: PropTypes.func.isRequired
};

export default RevealStage;
