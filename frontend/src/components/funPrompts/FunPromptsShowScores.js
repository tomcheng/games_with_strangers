import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Heading from "../common/Heading";
import DelayList from "../common/DelayList";
import DelayShow from "../common/DelayShow";
import Button from "../common/Button";
import SecondaryText from "../common/SecondaryText";

const FunPromptsShowScores = ({
  scores,
  youAreModerator,
  moderatorName,
  onAdvance
}) => (
  <Fragment>
    <Heading center>Scores</Heading>
    <DelayList
      initialDelay={1000}
      list={scores}
      renderItem={score => (
        <Heading level={3} center>
          {score.player.name}: {score.score}
        </Heading>
      )}
    />
    <DelayShow delay={1000 + scores.length * 1000}>
      {youAreModerator ? (
        <Button center spaceTop={2} onClick={onAdvance}>
          Start Next Round
        </Button>
      ) : (
        <SecondaryText center spaceTop={2}>
          Waiting for {moderatorName} to start next round&hellip;
        </SecondaryText>
      )}
    </DelayShow>
  </Fragment>
);

FunPromptsShowScores.propTypes = {
  moderatorName: PropTypes.string.isRequired,
  scores: PropTypes.arrayOf(
    PropTypes.shape({
      player: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      }).isRequired,
      score: PropTypes.number.isRequired
    })
  ).isRequired,
  youAreModerator: PropTypes.bool.isRequired,
  onAdvance: PropTypes.func.isRequired
};

export default FunPromptsShowScores;
