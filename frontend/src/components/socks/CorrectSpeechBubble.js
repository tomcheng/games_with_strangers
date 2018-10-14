import React, { Component } from "react";
import PropTypes from "prop-types";
import sample from "lodash/sample";
import SpeechBubble from "./SpeechBubble";

const MESSAGES = [
  "Great Work!",
  "Nice Find!",
  "Good Job!",
  "Way To Go!",
  "Wooo!",
  "Huzzah!",
  "Wowza!",
  "Woot Woot!",
  "Bazinga!"
];

class CorrectSpeechBubble extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  };

  state = { message: sample(MESSAGES) };

  componentDidUpdate(prevProps) {
    if (prevProps.open && !this.props.open) {
      this.setState({ message: sample(MESSAGES) });
    }
  }

  render() {
    const { open, onClose } = this.props;
    const { message } = this.state;

    return <SpeechBubble open={open} text={message} onClose={onClose} />;
  }
}

export default CorrectSpeechBubble;
