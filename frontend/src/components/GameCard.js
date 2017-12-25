import React from "react";
import styled from "styled-components";
import SecondaryText from "./common/SecondaryText";
import Button from "./common/Button";

const FootNote = styled(SecondaryText)`
  margin-top: 4px;
`;

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GameCard = ({ title, description, playerRequirements, onSelect }) => (
  <div>
    <h1>{title}</h1>
    <p>{description}</p>
    <ActionContainer>
      <Button onClick={onSelect}>Start Game</Button>
      <FootNote>{playerRequirements}</FootNote>
    </ActionContainer>
  </div>
);

export default GameCard;
