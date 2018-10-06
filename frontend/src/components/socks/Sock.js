import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import random from "lodash/random";
import sample from "lodash/sample";
import SockDrawing from "./SockDrawing";
import Smell from "./Smell";
import Hand from "./Hand";

const ANGLE_OVERSHOOT = 15;
const HAND_MIDDLE_X = 16;
const HAND_MIDDLE_Y = 15;
const DISTANCE_BUFFER = 50;

const TRANSLATIONS = {
  1: { x: 3, y: 40 },
  2: { x: 0, y: 58 },
  3: { x: -4, y: 80 }
};

const getTranslation = ({ length, showHand, handAngle, handDistance }) => {
  const { x, y } = TRANSLATIONS[length];
  if (showHand) {
    return `${x}px, ${y}px`;
  }

  return `${x - handDistance * Math.sin((handAngle * Math.PI) / 180)}px, ${y +
    handDistance * Math.cos((handAngle * Math.PI) / 180)}px`;
};

const Container = styled.div`
  user-select: none;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const HandContainer = styled.div`
  position: absolute;
  z-index: 1;
  transform-origin: ${HAND_MIDDLE_X}px ${HAND_MIDDLE_Y}px;
  transition: transform 0.12s ease-out;
`;

class Sock extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    color: PropTypes.oneOf([1, 2, 3]).isRequired,
    length: PropTypes.oneOf([1, 2, 3]).isRequired,
    pattern: PropTypes.oneOf([1, 2, 3]).isRequired,
    smell: PropTypes.oneOf([1, 2, 3]).isRequired,
    position: PropTypes.shape({
      x: PropTypes.oneOf([0, 1, 2]),
      y: PropTypes.oneOf([0, 1, 2])
    }).isRequired,
    youSelected: PropTypes.bool.isRequired,
    otherSelected: PropTypes.bool.isRequired
  };

  constructor(props) {
    super();

    const { x, y } = props.position;
    const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
    let handAngle = 0;
    let handDistance = 0;

    if (x === 0 && y === 0) {
      handAngle = random(90 - ANGLE_OVERSHOOT, 180 + ANGLE_OVERSHOOT);
      handDistance = Math.max(windowWidth, windowHeight) / 4;
    } else if (x === 1 && y === 0) {
      handAngle = random(180 - ANGLE_OVERSHOOT, 180 + ANGLE_OVERSHOOT);
      handDistance = windowHeight / 4;
    } else if (x === 2 && y === 0) {
      handAngle = random(180 - ANGLE_OVERSHOOT, 270 + ANGLE_OVERSHOOT);
      handDistance = Math.max(windowWidth, windowHeight) / 4;
    } else if (x === 0 && y === 1) {
      handAngle = random(90 - ANGLE_OVERSHOOT, 90 + ANGLE_OVERSHOOT);
      handDistance = windowWidth / 4;
    } else if (x === 1 && y === 1) {
      handAngle = sample([60, 120, 240, 300]);
      handDistance = windowWidth * 0.6;
    } else if (x === 2 && y === 1) {
      handAngle = random(270 - ANGLE_OVERSHOOT, 270 + ANGLE_OVERSHOOT);
      handDistance = windowWidth / 4;
    } else if (x === 0 && y === 2) {
      handAngle = random(-ANGLE_OVERSHOOT, 90 + ANGLE_OVERSHOOT);
      handDistance = Math.max(windowWidth, windowHeight) / 4;
    } else if (x === 1 && y === 2) {
      handAngle = random(-ANGLE_OVERSHOOT, ANGLE_OVERSHOOT);
      handDistance = windowHeight / 4;
    } else if (x === 2 && y === 2) {
      handAngle = random(270 - ANGLE_OVERSHOOT, 360 + ANGLE_OVERSHOOT);
      handDistance = Math.max(windowWidth, windowHeight) / 4;
    }

    this.state = { handAngle, handDistance: handDistance + DISTANCE_BUFFER };
  }

  render() {
    const {
      color,
      length,
      pattern,
      smell,
      youSelected,
      otherSelected,
      onClick
    } = this.props;
    const { handAngle, handDistance } = this.state;

    return (
      <Container onClick={onClick}>
        <Smell smell={smell} length={length} />
        <SockDrawing color={color} length={length} pattern={pattern} />
        <HandContainer
          style={{
            transform: `translate3d(${getTranslation({
              showHand: youSelected || otherSelected,
              length,
              handAngle,
              handDistance
            })}, 0) rotate3d(0,0,1,${handAngle}deg)`
          }}
        >
          <Hand owner={youSelected ? "you" : "other"} />
        </HandContainer>
      </Container>
    );
  }
}

export default Sock;
