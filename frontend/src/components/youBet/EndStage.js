import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import * as customTypes from "../../utils/customTypes";
import DelayList from "../common/DelayList";
import DelayShow from "../common/DelayShow";
import SecondaryText from "../common/SecondaryText";
import Button from "../common/Button";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h3`
  margin-bottom: 16px;
`;

const Score = styled.h3`
  margin-bottom: 16px;
`;

const Footer = styled.div`
  margin-top: 24px;
`;

const EndStage = ({ scores, youAreModerator, moderator, onRestartGame }) => (
  <Container>
    <Title>Final Score:</Title>
    <DelayList
      list={scores}
      initialDelay={1000}
      delayInterval={1000}
      renderItem={({ score, player }) => (
        <Score>
          {player.name}: {score}
        </Score>
      )}
    />
    <DelayShow delay={1000 + scores.length * 1000}>
      <Footer>
        {youAreModerator ? (
          <Button onClick={onRestartGame}>Restart Game</Button>
        ) : (
          <SecondaryText>
            Waiting for {moderator.name} to restart&hellip;
          </SecondaryText>
        )}
      </Footer>
    </DelayShow>
  </Container>
);

EndStage.propTypes = {
  moderator: customTypes.player.isRequired,
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
