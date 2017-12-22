import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import omit from "lodash/omit";
import values from "lodash/values";
import gamesList from "../gamesList";
import Player from "./Player";

const pluralize = (str, count) => str + (count === 1 ? "" : "s");

class Room extends Component {
  static propTypes = {
    roomCode: PropTypes.string.isRequired,
    onSelectGame: PropTypes.func.isRequired,
    playerId: PropTypes.string.isRequired,
    game: PropTypes.oneOf(gamesList.map(g => g.id)),
    gameState: PropTypes.object,
    minimumPlayers: PropTypes.number,
    players: PropTypes.objectOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired
      })
    )
  };

  render() {

    const {
      roomCode,
      game,
      players,
      playerId,
      minimumPlayers,
      onSelectGame
    } = this.props;
    if (!players) {
      return null;
    }

    const currentPlayer = players[playerId];
    const otherPlayers = omit(players, [playerId]);

    const playersNeeded =
      minimumPlayers && players
        ? Math.max(minimumPlayers - values(players).length, 0)
        : null;
    return (
      <Fragment>
        <div>{roomCode}</div>
        {!game && (
          <Fragment>
            <div>Select a game:</div>
            {gamesList.map(({ id, displayName }) => (
              <div key={id}>
                <button
                  onClick={() => {
                    onSelectGame(id);
                  }}
                >
                  {displayName}
                </button>
              </div>
            ))}
          </Fragment>
        )}
        {game && <div>Selected game: {game}</div>}
        <div>You:</div>
        <Player player={currentPlayer} />
        <div>Others Players:</div>
      </Fragment>
        {values(otherPlayers).map(player => (
          <Player key={player.id} player={player} />
        ))}
        {!!playersNeeded &&
          `${playersNeeded} ${pluralize("player", playersNeeded)} needed`}
    );
  }
}

export default Room;
