import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import TextInput from "../common/TextInput";
import Button from "../common/Button";

const AnswerInput = styled(TextInput)`
  max-width: 280px;
`;

class YouBetGuessingForm extends Component {
  static propTypes = {
    onSetFlashMessage: PropTypes.func.isRequired,
    onSubmitGuess: PropTypes.func.isRequired
  };

  state = { guess: "" };

  handleSubmit = evt => {
    evt.preventDefault();

    const { onSetFlashMessage, onSubmitGuess } = this.props;
    const { guess } = this.state;

    if (!guess || parseInt(guess, 10) < 1) {
      onSetFlashMessage("Must be a positive integer");
      return;
    }

    onSubmitGuess({ guess });
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  render() {
    const { guess } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <AnswerInput
          placeholder="Your Answer"
          type="number"
          name="guess"
          value={guess}
          onChange={this.handleChange}
          spaceBottom={3}
          center
        />
        <Button center>Submit Answer</Button>
      </form>
    );
  }
}

export default YouBetGuessingForm;
