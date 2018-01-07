import React, { Fragment } from "react";
import PropTypes from "prop-types";
import * as customTypes from "../../../utils/customTypes";
import { makeList } from "../../../utils/strings";
import Button from "../../common/Button";
import SecondaryText from "../../common/SecondaryText";
import Heading from "../../common/Heading";
import Spacing from "../../common/Spacing";
import DelayList from "../../common/DelayList";
import DelayShow from "../../common/DelayShow";

const DELAY_START = 5000;
const DELAY_INTERVAL = 1000;

const RevealStage = ({
  answer,
  closestGuess,
  payouts,
  youAreModerator,
  onAdvanceRound,
  moderator
}) => {
  const closestPlayers = payouts.filter(p => p.closest).map(p => p.player);
  const payoutsFromBetting = payouts
    .map(payout => ({
      ...payout,
      delta: payout.closest ? payout.delta - 300 : payout.delta
    }))
    .filter(p => p.delta !== 0);

  return (
    <Fragment>
      <DelayShow delay={0}>
        <Heading level={3} center>
          The correct answer is:
        </Heading>
      </DelayShow>
      <DelayShow delay={1000}>
        <Heading spaceBottom={2} center>
          {answer}
        </Heading>
      </DelayShow>
      <DelayShow delay={2000}>
        <Heading level={3} center>
          The closest without going over is:
        </Heading>
      </DelayShow>
      <DelayShow delay={3000}>
        <Heading spaceBottom={2} center>
          {closestGuess}
        </Heading>
      </DelayShow>
      <DelayShow delay={4000}>
        {closestPlayers.length ? (
          <Heading level={3} spaceBottom={2} center>
            {makeList(closestPlayers.map(p => p.name))} gets $300 for having the
            closest answer
          </Heading>
        ) : (
          <Heading level={3} spaceBottom={2} center>
            Everybody guessed too high
          </Heading>
        )}
      </DelayShow>
      <DelayList
        list={payoutsFromBetting}
        renderItem={({ player, delta }) => (
          <Heading level={3} spaceBottom={2} center>
            {player.name} {delta < 0 ? "loses" : "gets"} ${Math.abs(delta)}
          </Heading>
        )}
        initialDelay={DELAY_START}
        delayInterval={DELAY_INTERVAL}
      />
      <Spacing spaceTop={3}>
        {({ spacingStyle }) => (
          <DelayShow
            delay={DELAY_START + payoutsFromBetting.length * DELAY_INTERVAL}
            style={spacingStyle}
          >
            {youAreModerator ? (
              <Button onClick={onAdvanceRound} center>
                Start Next Round
              </Button>
            ) : (
              <SecondaryText center>
                Waiting for {moderator.name} to start next round&hellip;
              </SecondaryText>
            )}
          </DelayShow>
        )}
      </Spacing>
    </Fragment>
  );
};

RevealStage.propTypes = {
  answer: PropTypes.number.isRequired,
  closestGuess: PropTypes.number.isRequired,
  payouts: PropTypes.arrayOf(
    PropTypes.shape({
      player: customTypes.player.isRequired,
      delta: PropTypes.number.isRequired,
      closest: PropTypes.bool.isRequired
    })
  ).isRequired,
  youAreModerator: PropTypes.bool.isRequired,
  onAdvanceRound: PropTypes.func.isRequired,
  moderator: customTypes.player
};

export default RevealStage;
