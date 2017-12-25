import React from "react";
import PropTypes from "prop-types";
import GuessForm from "./GuessForm";
import Guessed from "./Guessed";

const Guesses = ({ yourGuess, onSubmitGuess, others }) =>
  yourGuess === null ? (
    <GuessForm onSubmitGuess={onSubmitGuess} />
  ) : (
    <Guessed yourGuess={yourGuess} others={others} />
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
