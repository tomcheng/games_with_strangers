import React, { Fragment } from "react";
import PropTypes from "prop-types";
import * as customTypes from "../../utils/customTypes";
import SectionHeader from "./SectionHeader";
import Heading from "./Heading";
import DelayList from "./DelayList";
import DelayShow from "./DelayShow";
import SecondaryText from "./SecondaryText";
import Button from "./Button";

const EndStage = ({ scores, youAreModerator, moderator, onRestartGame }) => (
  <Fragment>
    <SectionHeader>Game Over</SectionHeader>
    <Heading spaceBottom={2} center>Final Score</Heading>
    <DelayList
      list={scores}
      initialDelay={1000}
      delayInterval={1000}
      renderItem={({ score, player }) => (
        <Heading level={3} center>
          {player.name}: {score}
        </Heading>
      )}
    />
    <DelayShow delay={1000 + scores.length * 1000}>
      {youAreModerator ? (
        <Button onClick={onRestartGame} spaceTop={3} center>
          Restart Game
        </Button>
      ) : (
        <SecondaryText spaceTop={3} center>
          Waiting for {moderator.name} to restart&hellip;
        </SecondaryText>
      )}
    </DelayShow>
  </Fragment>
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
