import React from "react";
import PropTypes from "prop-types";
import * as customTypes from "../../utils/customTypes";
import { makeList } from "../../utils/strings";
import Button from "../common/Button";
import SecondaryText from "../common/SecondaryText";
import Heading from "../common/Heading";
import DelayList from "../common/DelayList";

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

  let displayList = [
    <Heading level={3} center>
      The correct answer is:
    </Heading>,
    <Heading spaceBottom={2} center>
      {answer}
    </Heading>
  ];

  if (closestGuess == null) {
    displayList.push(
      <Heading level={3} spaceBottom={2} center>
        Everybody guessed too high
      </Heading>
    );
  } else {
    displayList = displayList.concat([
      <Heading level={3} center>
        The closest without going over is:
      </Heading>,
      <Heading spaceBottom={2} center>
        {closestGuess}
      </Heading>,
      <Heading level={3} spaceBottom={2} center>
        {makeList(closestPlayers.map(p => p.name))} gets $300 for having the
        closest answer
      </Heading>
    ]);
  }

  displayList = displayList.concat(
    payoutsFromBetting.map(({ player, delta }) => (
      <Heading level={3} spaceBottom={2} center>
        {player.name} {delta < 0 ? "loses" : "gets"} ${Math.abs(delta)}
      </Heading>
    ))
  );

  if (youAreModerator) {
    displayList.push(
      <Button onClick={onAdvanceRound} spaceTop={3} center>
        Start Next Round
      </Button>
    );
  } else {
    displayList.push(
      <SecondaryText spaceTop={3} center>
        Waiting for {moderator.name} to start next round&hellip;
      </SecondaryText>
    );
  }

  return <DelayList list={displayList} />;
};

RevealStage.propTypes = {
  answer: PropTypes.number.isRequired,
  payouts: PropTypes.arrayOf(
    PropTypes.shape({
      player: customTypes.player.isRequired,
      delta: PropTypes.number.isRequired,
      closest: PropTypes.bool.isRequired
    })
  ).isRequired,
  youAreModerator: PropTypes.bool.isRequired,
  onAdvanceRound: PropTypes.func.isRequired,
  closestGuess: PropTypes.number,
  moderator: customTypes.player
};

export default RevealStage;
