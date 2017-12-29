import React from "react";
import PropTypes from "prop-types";
import GuessForm from "./GuessForm";
import Guessed from "./Guessed";

const GuessingStage = ({ yourGuess, onSubmitGuess, awaitingGuess }) =>
  yourGuess === null ? (
    <GuessForm onSubmitGuess={onSubmitGuess} />
  ) : (
    <Guessed yourGuess={yourGuess} awaitingGuess={awaitingGuess} />
  );

GuessingStage.propTypes = {
  awaitingGuess: PropTypes.array.isRequired,
  onSubmitGuess: PropTypes.func.isRequired,
  yourGuess: PropTypes.number
};

export default GuessingStage;
