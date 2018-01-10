import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import find from "lodash/find";
import { pluralize } from "../utils/strings";
import gamesList from "../gamesList";
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

const Waiting = styled(SecondaryText)`
  margin-top: -8px;
  margin-bottom: 24px;
`;

const Room = ({
  gameId,
  gameState,
  playersNeeded,
  you,
  others,
  onStartGame,
  onPlay,
  onSetFlashMessage
}) => {
  const game = find(gamesList, g => g.id === gameId);
  const moderator = you.isModerator ? you : others.find(p => p.isModerator);

  if (gameState) {
    const GameComponent = game.component;
    return (
      <GameComponent
        gameState={gameState}
        youAreModerator={you.isModerator}
        moderator={moderator}
        onPlay={onPlay}
        onSetFlashMessage={onSetFlashMessage}
      />
    );
  }

  return (
    <Fragment>
      <SectionHeader>About to Play: {game.displayName}</SectionHeader>
      <Content>
        <Players>
          <h1>{you.name}</h1>
          {others.map(player => <h1 key={player.id}>{player.name}</h1>)}
        </Players>
        {!!playersNeeded && (
          <Waiting>
            Waiting for {playersNeeded} more{" "}
            {pluralize("player", playersNeeded)}&hellip;
          </Waiting>
        )}
        {you.isModerator &&
          playersNeeded === 0 && (
            <Button onClick={onStartGame}>Start Game</Button>
          )}
        {!playersNeeded &&
          !you.isModerator && (
            <Waiting>
              Waiting for {moderator.name} to start game&hellip;
            </Waiting>
          )}
      </Content>
    </Fragment>
  );
};

Room.propTypes = {
  gameId: PropTypes.oneOf(gamesList.map(g => g.id)).isRequired,
  others: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      isModerator: PropTypes.bool.isRequired
    })
  ).isRequired,
  you: PropTypes.shape({
    id: PropTypes.string.isRequired,
    isModerator: PropTypes.bool.isRequired
  }).isRequired,
  onStartGame: PropTypes.func.isRequired,
  gameState: PropTypes.object,
  playersNeeded: PropTypes.number
};

export default Room;
