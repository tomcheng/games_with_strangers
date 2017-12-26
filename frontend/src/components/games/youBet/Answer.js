import React from "react";
import styled from "styled-components";
import { makeList } from "../../../utils/strings";
import SecondaryText from "../../common/SecondaryText";

const Container = styled.div`
  border: 2px solid #fff;
  border-radius: 6px;
  padding: 8px 12px;
  margin-bottom: 12px;
`;

const Odds = styled(SecondaryText)`
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 12px;
  line-height: 16px;
  margin-bottom: 4px;
`;

const Number = styled.h1`
  margin-bottom: 4px;
  text-align: center;
`;

const Answer = ({ guess, odds, players }) => (
  <Container key={guess}>
    <Odds>Pays {odds} to 1</Odds>
    <Number>{guess}</Number>
    <SecondaryText>
      {makeList(players)}
    </SecondaryText>
  </Container>
);

export default Answer;
