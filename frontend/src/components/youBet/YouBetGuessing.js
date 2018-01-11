import React from "react";
import PropTypes from "prop-types";
import YouBetGuessingForm from "./YouBetGuessingForm";
import YouBetGuessed from "./YouBetGuessed";

const YouBetGuessing = ({
  yourGuess,
  onSubmitGuess,
  awaitingGuess,
  onSetFlashMessage
}) =>
  yourGuess === null ? (
    <YouBetGuessingForm
      onSubmitGuess={onSubmitGuess}
      onSetFlashMessage={onSetFlashMessage}
    />
  ) : (
    <YouBetGuessed yourGuess={yourGuess} awaitingGuess={awaitingGuess} />
  );

YouBetGuessing.propTypes = {
  awaitingGuess: PropTypes.array.isRequired,
  onSetFlashMessage: PropTypes.func.isRequired,
  onSubmitGuess: PropTypes.func.isRequired,
  yourGuess: PropTypes.number
};

export default YouBetGuessing;
