import React from "react";
import PropTypes from "prop-types";

const Bets = ({ guesses, players }) => (
  <div>
    {guesses.map(({ guess, odds, players: playerIds }) => (
      <div key={guess}>
        Guess: {guess}, odds: {odds}, players:{" "}
        {playerIds.map(id => players[id].name)}
      </div>
    ))}
  </div>
);

Bets.propTypes = {
  guesses: PropTypes.arrayOf(
    PropTypes.shape({
      guess: PropTypes.number,
      players: PropTypes.arrayOf(PropTypes.string),
      odds: PropTypes.number
    })
  ),
  players: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  )
};

export default Bets;
