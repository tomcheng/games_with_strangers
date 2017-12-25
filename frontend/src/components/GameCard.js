import React from "react";
import styled from "styled-components";
import Button from "./common/Button";

const Container = styled.div`
  display: flex;
`;

const FootNote = styled.div`
  margin-top: 4px;
  color: rgba(255,255,255,0.4);
  font-size: 14px;
`;

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GameCard = ({ title, description, playerRequirements, onSelect }) => (
  <Container>
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <ActionContainer>
        <Button onClick={onSelect}>Start Game</Button>
        <FootNote>{playerRequirements}</FootNote>
      </ActionContainer>
    </div>
  </Container>
);

export default GameCard;
