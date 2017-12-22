import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import omit from "lodash/omit";
import values from "lodash/values";
import gamesList from "../gamesList";
import Player from "./Player";

class Room extends Component {
  static propTypes = {
    code: PropTypes.string.isRequired,
    onSelectGame: PropTypes.func.isRequired,
    playerId: PropTypes.string.isRequired,
    game: PropTypes.oneOf(gamesList.map(g => g.id)),
    gameState: PropTypes.object,
    players: PropTypes.objectOf(PropTypes.shape({
      id: PropTypes.string.isRequired
    })),
  };

  render() {
    const { code, game, onSelectGame, players, playerId } = this.props;

    if (!players) {
      return null;
    }

    const currentPlayer = players[playerId];
    const otherPlayers = omit(players, [playerId]);

    return (
      <Fragment>
        <div>{code}</div>
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
        {values(otherPlayers).map(player => <Player key={player.id} player={player} />)}
      </Fragment>
    );
  }
}

export default Room;
