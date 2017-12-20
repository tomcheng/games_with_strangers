import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import gamesList from "../gamesList";

class Room extends Component {
  static propTypes = {
    code: PropTypes.string.isRequired,
    onSelectGame: PropTypes.func.isRequired,
    game: PropTypes.oneOf(gamesList.map(g => g.id)),
    gameState: PropTypes.object
  };

  render() {
    const { code, game, onSelectGame } = this.props;

    return (
      <Fragment>
        <div>{code}</div>
        <div>Select a game:</div>
        {!game &&
          gamesList.map(({ id, displayName }) => (
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
        {game && <div>{game}</div>}
      </Fragment>
    );
  }
}

export default Room;
