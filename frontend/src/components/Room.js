import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import gamesList from "../gamesList";
import values from "lodash/values";

class Room extends Component {
  static propTypes = {
    code: PropTypes.string.isRequired,
    onSelectGame: PropTypes.func.isRequired,
    game: PropTypes.oneOf(gamesList.map(g => g.id)),
    gameState: PropTypes.object,
    players: PropTypes.objectOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }))
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
            {values(players).map(({ id, name }) => <div key={id}>{name}</div>)}
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default Room;
