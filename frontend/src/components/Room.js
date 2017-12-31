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

  if (gameState) {
    const GameComponent = game.component;
    return (
      <GameComponent
        gameState={gameState}
        youAreModerator={you.isModerator}
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
        <Button onClick={onStartGame} disabled={playersNeeded > 0}>
          Start Game
        </Button>
      </Content>
    </Fragment>
  );
};

Room.propTypes = {
  gameId: PropTypes.oneOf(gamesList.map(g => g.id)).isRequired,
  others: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired
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
