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

const Award = styled.div`
  margin-bottom: 16px;
`;

const AwardTitle = styled.h3`
  margin-bottom: 0;
`;

const RevealStage = ({ answer, payouts }) => (
  <Container>
    <h3>The answer is:</h3>
    <Answer>{answer}</Answer>
    {payouts.map(({ player, amount, closest, wager, odds }) => (
      <Award>
        <AwardTitle>
          {player.name} gets ${amount}
        </AwardTitle>
        <SecondaryText>
          {closest
            ? "closest guess without going over"
            : `$${wager} bet at ${odds} to 1 odds`}
        </SecondaryText>
      </Award>
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
