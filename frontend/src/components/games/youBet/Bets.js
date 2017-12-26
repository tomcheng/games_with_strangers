import React from "react";
import PropTypes from "prop-types";
import Answer from "./Answer";

const Bets = ({ guesses, onBet }) => {
  return (
    <div>
      {guesses.map(({ guess, odds, players }) => (
        <Answer
          key={guess}
          guess={guess}
          odds={odds}
          players={players}
          onBet={() => {
            onBet({ firstBet: { guess, wager: 100 } });
          }}
        />
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
