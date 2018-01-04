import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import * as customTypes from "../../../utils/customTypes";
import SecondaryText from "../../common/SecondaryText";
import Button from "../../common/Button";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EndStage = ({ scores, youAreModerator, moderator, onRestartGame }) => (
  <Container>
    <h3>Final Score:</h3>
    {scores.map(({ score, player }) => (
      <h3 key={player.id}>
        {player.name}: {score}
      </h3>
    ))}
    {youAreModerator ? (
      <Button onClick={onRestartGame}>Restart Game</Button>
    ) : (
      <SecondaryText>
        Waiting for {moderator.name} to restart&hellip;
      </SecondaryText>
    )}
  </Container>
);

EndStage.propTypes = {
  moderator: customTypes.player,
  scores: PropTypes.arrayOf(
    PropTypes.shape({
      player: customTypes.player,
      score: PropTypes.number.isRequired
    })
  ).isRequired,
  youAreModerator: PropTypes.bool.isRequired,
  onRestartGame: PropTypes.func.isRequired
};

export default EndStage;
