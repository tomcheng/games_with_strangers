import React, { Component } from "react";
import PropTypes from "prop-types";

class GuessForm extends Component {
  static propTypes = {
    onSubmitGuess: PropTypes.func.isRequired
  };

  state = { guess: "" };

  handleSubmit = evt => {
    evt.preventDefault();

    this.props.onSubmitGuess(this.state);
  };

  render() {
    const { guess } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input type="number" name="guess" value={guess} />
        <button>Guess</button>
      </form>
    );
  }
}

export default GuessForm;