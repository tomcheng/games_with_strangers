import React from "react";
import PropTypes from "prop-types";
import * as customTypes from "../../../utils/customTypes";
import styled from "styled-components";
import SecondaryText from "../../common/SecondaryText";

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

const RevealStage = ({ answer, payouts }) => (
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
  </Container>
);

RevealStage.propTypes = {
  answer: PropTypes.number.isRequired,
  payouts: PropTypes.arrayOf(PropTypes.shape({
    player: customTypes.player.isRequired,
    amount: PropTypes.number.isRequired,
    closest: PropTypes.bool.isRequired,
    wager: PropTypes.number,
    odds: PropTypes.number
  })).isRequired,
};

export default RevealStage;
