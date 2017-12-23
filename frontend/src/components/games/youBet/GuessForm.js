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

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value })
  };

  render() {
    const { guess } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input type="number" name="guess" value={guess} onChange={this.handleChange} />
        <button>Guess</button>
      </form>
    );
  }
}

export default GuessForm;