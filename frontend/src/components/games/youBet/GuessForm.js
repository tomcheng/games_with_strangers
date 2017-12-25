import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import TextInput from "../../common/TextInput";
import Button from "../../common/Button";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AnswerInput = styled(TextInput)`
  text-align: center;
  max-width: 280px;
  margin-bottom: 24px;
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
      <StyledForm onSubmit={this.handleSubmit}>
        <AnswerInput
          placeholder="Your Answer"
          type="number"
          name="guess"
          value={guess}
          onChange={this.handleChange}
        />
        <Button>Submit Answer</Button>
      </StyledForm>
    );
  }
}

export default GuessForm;
