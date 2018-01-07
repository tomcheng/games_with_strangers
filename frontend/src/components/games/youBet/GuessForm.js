import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import TextInput from "../../common/TextInput";
import Button from "../../common/Button";

const AnswerInput = styled(TextInput)`
  max-width: 280px;
`;

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

export default GuessForm;
