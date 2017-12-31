import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { animate } from "../utils/animation";

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  pointer-events: none;
  padding-bottom: 24px;
  z-index: 1000;
`;

const Message = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  max-width: 420px;
  padding: 8px 12px;
  border-radius: 3px;
  text-align: center;
`;

const TIME_TO_SHOW = 2000;
const DISTANCE_TO_ANIMATE = 20;

class FlashMessage extends Component {
  static propTypes = {
    onClear: PropTypes.func.isRequired,
    message: PropTypes.string
  };

  state = { opacity: 0, translateY: DISTANCE_TO_ANIMATE, message: null };

  componentWillReceiveProps(nextProps) {
    const { message, onClear } = this.props;

    if (!message && nextProps.message) {
      this.setState({ message: nextProps.message, opacity: 0 });
      if (this.animation) {
        this.animation.stop();
      }
      this.animation = animate({
        start: 0,
        end: 1,
        duration: 300,
        onUpdate: opacity => {
          this.setState({
            opacity,
            translateY: DISTANCE_TO_ANIMATE * (1 - opacity)
          });
        },
        onComplete: () => {
          this.setState({ opacity: 1, translateY: 0 });
        }
      });
      this.timer = setTimeout(onClear, TIME_TO_SHOW);
    }

    if (message && !nextProps.message) {
      if (this.animation) {
        this.animation.stop();
      }
      this.animation = animate({
        start: 1,
        end: 0,
        duration: 1200,
        onUpdate: opacity => {
          this.setState({ opacity });
        },
        onComplete: () => {
          this.setState({
            opacity: 0,
            translateY: DISTANCE_TO_ANIMATE,
            message: null
          });
        }
      });
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    if (this.animation) {
      this.animation.stop();
    }
  }

  render() {
    const { message, opacity, translateY } = this.state;

    if (!message) {
      return null;
    }

    const transform = `translateY(${translateY}px)`;

    return (
      <Container style={{ opacity, transform, WebkitTransform: transform }}>
        <Message>{message}</Message>
      </Container>
    );
  }
}

export default FlashMessage;
