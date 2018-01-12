import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { pluralize } from "../utils/strings";
import Heading from "./common/Heading";
import SectionHeader from "./common/SectionHeader";
import Button from "./common/Button";
import SecondaryText from "./common/SecondaryText";
import Spacing from "./common/Spacing";

class Waiting extends Component {
  static propTypes = {
    gameName: PropTypes.string.isRequired,
    moderatorName: PropTypes.string.isRequired,
    others: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      })
    ).isRequired,
    playersNeeded: PropTypes.number.isRequired,
    youAreModerator: PropTypes.bool.isRequired,
    yourName: PropTypes.string.isRequired,
    onStartGame: PropTypes.func.isRequired
  };

  render() {
    const {
      gameName,
      yourName,
      others,
      playersNeeded,
      youAreModerator,
      onStartGame,
      moderatorName
    } = this.props;

    return (
      <Fragment>
        <SectionHeader>About to Play: {gameName}</SectionHeader>
        <Heading center>{yourName}</Heading>
        {others.map(player => (
          <Heading key={player.id} center>
            {player.name}
          </Heading>
        ))}
        {!!playersNeeded && (
          <SecondaryText spaceTop={3} center>
            Waiting for {playersNeeded} more{" "}
            {pluralize("player", playersNeeded)}&hellip;
          </SecondaryText>
        )}
        {youAreModerator &&
          playersNeeded === 0 && (
            <Button spaceTop={3} onClick={onStartGame} center>
              Start Game
            </Button>
          )}
        {!playersNeeded &&
          !youAreModerator && (
            <SecondaryText spaceTop={3} center>
              Waiting for {moderatorName} to start game&hellip;
            </SecondaryText>
          )}
      </Fragment>
    );
  }
}

export default Waiting;
