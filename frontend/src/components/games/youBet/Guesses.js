import React from "react";
import PropTypes from "prop-types";
import GuessForm from "./GuessForm";

const Guesses = ({ yourGuess, onSubmitGuess, others }) =>
  yourGuess === null ? (
    <GuessForm onSubmitGuess={onSubmitGuess} />
  ) : (
    <div>
      <div>You Guessed: {yourGuess}</div>
      Waiting on:{" "}
      {others
        .filter(p => !p.guessed)
        .map(p => p.name)
        .join(", ")}
    </div>
  );

Guesses.propTypes = {
  others: PropTypes.arrayOf(PropTypes.shape({
    guessed: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired,
  onSubmitGuess: PropTypes.func.isRequired,
  yourGuess: PropTypes.number
};

export default Guesses;
