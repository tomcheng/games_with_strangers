import React from "react";
import PropTypes from "prop-types";

const Bets = ({ guesses, onBet }) => {
  return (
    <div>
      {guesses.map(({ guess, odds, players }) => (
        <div key={guess}>
          Guess: {guess}, odds: {odds}, players: {players.join(", ")}
          <button
            onClick={() => {
              onBet({ firstBet: { guess, wager: 100 } });
            }}
          >
            Bet on this
          </button>
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
  ),
  onBet: PropTypes.func.isRequired
};

export default Bets;
