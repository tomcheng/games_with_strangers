import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { makeList } from "../../utils/strings";
import Heading from "../common/Heading";
import Button from "../common/Button";
import TextArea from "../common/TextArea";
import SecondaryText from "../common/SecondaryText";
import Carousel from "../common/Carousel";

const Container = styled.div`
  margin: 0 -${props => props.theme.appPadding};
`;

const StyledForm = styled.form`
  padding: 0 ${props => props.theme.appPadding};
`;

class FunPromptsWriting extends Component {
  static propTypes = {
    awaitingAnswer: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired
      })
    ).isRequired,
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

    const id = parseInt(evt.target.name, 10);
    const answer = answers[id];

    onAnswer({ id, answer });
  };

  render() {
    const { prompts, awaitingAnswer } = this.props;
    const { answers } = this.state;

    return (
      <Container>
        {prompts.length > 0 ? (
          <Carousel
            panes={prompts.map(({ id, prompt }) => (
              <StyledForm key={id} name={id} onSubmit={this.handleSubmit}>
                <Heading center spaceBottom={2}>
                  {prompt}
                </Heading>
                <TextArea
                  value={answers[id]}
                  name={id}
                  onChange={this.handleChange}
                  style={{ textAlign: "center" }}
                />
                <Button center spaceTop={2}>
                  Submit
                </Button>
              </StyledForm>
            ))}
          />
        ) : (
          <Fragment>
            <Heading level={3} center>Your Answers Are In</Heading>
            <SecondaryText center>
              Waiting for {makeList(awaitingAnswer.map(p => p.name))}&hellip;
            </SecondaryText>
          </Fragment>
        )}
      </Container>
    );
  }
}

export default FunPromptsWriting;
