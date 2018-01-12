import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { pluralize } from "../utils/strings";
import SectionHeader from "./common/SectionHeader";
import Button from "./common/Button";
import SecondaryText from "./common/SecondaryText";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Players = styled.div`
  text-align: center;
  margin-bottom: 16px;
`;

const PlayersWaiting = styled(SecondaryText)`
  margin-top: -8px;
  margin-bottom: 24px;
`;

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
        <Content>
          <Players>
            <h1>{yourName}</h1>
            {others.map(player => <h1 key={player.id}>{player.name}</h1>)}
          </Players>
          {!!playersNeeded && (
            <PlayersWaiting>
              Waiting for {playersNeeded} more{" "}
              {pluralize("player", playersNeeded)}&hellip;
            </PlayersWaiting>
          )}
          {youAreModerator &&
            playersNeeded === 0 && (
              <Button onClick={onStartGame}>Start Game</Button>
            )}
          {!playersNeeded &&
            !youAreModerator && (
              <PlayersWaiting>
                Waiting for {moderatorName} to start game&hellip;
              </PlayersWaiting>
            )}
        </Content>
      </Fragment>
    );
  }
}

export default Waiting;
