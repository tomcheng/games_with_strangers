import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "../../common/Button";

class FunPromptsWriting extends Component {
  static propTypes = {
    prompts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        prompt: PropTypes.string.isRequired
      })
    ).isRequired,
    onAnswer: PropTypes.func.isRequired
  };

  constructor(props) {
    super();

    this.state = {
      answers: props.prompts.reduce((acc, { id }) => ({ ...acc, [id]: "" }), {})
    };
  }

  handleChange = ({ target }) => {
    const { answers } = this.state;

    this.setState({
      answers: {
        ...answers,
        [target.name]: target.value
      }
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    const { onAnswer } = this.props;
    const { answers } = this.state;

    const id = evt.target.name;
    const answer = answers[id];

    onAnswer({ id, answer });
  };

  render() {
    const { prompts } = this.props;
    const { answers } = this.state;

    return (
      <div>
        <h1>Answer these prompts</h1>
        {prompts.map(({ id, prompt }) => (
          <form key={id} name={id} onSubmit={this.handleSubmit}>
            <div>{prompt}</div>
            <textarea
              value={answers[id]}
              name={id}
              onChange={this.handleChange}
            />
            <Button>Submit</Button>
          </form>
        ))}
      </div>
    );
  }
}

export default FunPromptsWriting;
