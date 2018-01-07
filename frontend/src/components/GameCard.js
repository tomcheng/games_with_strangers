import React from "react";
import PropTypes from "prop-types";
import Button from "./common/Button";
import Spacing from "./common/Spacing";

const GameCard = ({
  title,
  description,
  onSelect,
  startGameClicked
}) => (
  <Spacing spaceBottom={3}>
    {({ spacingStyle }) => (
      <div style={spacingStyle}>
        <div><strong>{title}</strong> &ndash; {description}</div>
        <Button
          spaceTop={2}
          onClick={onSelect}
          disabled={startGameClicked}
          variation="secondary"
          size="small"
          center
        >
          Start {title}
        </Button>
      </div>
    )}
  </Spacing>
);

GameCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  startGameClicked: PropTypes.bool.isRequired
};

export default GameCard;
