import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Button from "./common/Button";
import Heading from "./common/Heading";

const Description = styled.div`
  margin-bottom: 16px;
`;

const GameCard = ({
  title,
  description,
  playerRequirements,
  onSelect,
  startGameClicked
}) => (
  <div>
    <Heading>{title}</Heading>
    <Description>{description}</Description>
    <Button
      onClick={onSelect}
      disabled={startGameClicked}
      helpText={playerRequirements}
      center
    >
      Start Game
    </Button>
  </div>
);

GameCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  playerRequirements: PropTypes.node.isRequired,
  onSelect: PropTypes.func.isRequired,
  startGameClicked: PropTypes.bool.isRequired
};

export default GameCard;
