import React from "react";
import PropTypes from "prop-types";

const Bets = ({ guesses }) => {
  return (
    <div>
      {guesses.map(({ guess, odds, players }) => (
        <div key={guess}>
          Guess: {guess}, odds: {odds}, players:{" "}
          {players.join(", ")}
          <button>Bet on this</button>
        </div>
      ))}
    </div>
  );
};

Bets.propTypes = {
  guesses: PropTypes.arrayOf(
    PropTypes.shape({
      guess: PropTypes.number,
      players: PropTypes.arrayOf(PropTypes.string),
      odds: PropTypes.number
    })
  )
};

export default Bets;
