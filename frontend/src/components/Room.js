import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import gamesList from "../gamesList";

class Room extends Component {
  static propTypes = {
    code: PropTypes.string.isRequired,
    onSelectGame: PropTypes.func.isRequired,
    game: PropTypes.oneOf(gamesList.map(g => g.id)),
    gameState: PropTypes.object,
    players: PropTypes.arrayOf(PropTypes.string)
  };

  render() {
    const { code, game, onSelectGame, players } = this.props;

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
        {players && (
          <Fragment>
            <div>Players:</div>
            {players.map((player, i) => <div key={i}>{player}</div>)}
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default Room;
