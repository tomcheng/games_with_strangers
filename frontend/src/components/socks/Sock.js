import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import random from "lodash/random";
import sample from "lodash/sample";
import SockDrawing from "./SockDrawing";
import Smell from "./Smell";
import Hand from "./Hand";

const ANGLE_OVERSHOOT = 15;

const TRANSLATIONS = {
  1: "3px, 40px",
  2: "0px, 58px",
  3: "-4px, 80px"
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
  transform-origin: 16px 15px;
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
    let handAngle = 0;

    if (x === 0 && y === 0) {
      handAngle = random(90 - ANGLE_OVERSHOOT, 180 + ANGLE_OVERSHOOT);
    } else if (x === 1 && y === 0) {
      handAngle = random(180 - ANGLE_OVERSHOOT, 180 + ANGLE_OVERSHOOT);
    } else if (x === 2 && y === 0) {
      handAngle = random(180 - ANGLE_OVERSHOOT, 270 + ANGLE_OVERSHOOT);
    } else if (x === 0 && y === 1) {
      handAngle = random(90 - ANGLE_OVERSHOOT, 90 + ANGLE_OVERSHOOT);
    } else if (x === 1 && y === 1) {
      handAngle = sample([60, 120, 240, 300]);
    } else if (x === 2 && y === 1) {
      handAngle = random(270 - ANGLE_OVERSHOOT, 270 + ANGLE_OVERSHOOT);
    } else if (x === 0 && y === 2) {
      handAngle = random(-ANGLE_OVERSHOOT, 90 + ANGLE_OVERSHOOT);
    } else if (1 === 0 && y === 2) {
      handAngle = random(-ANGLE_OVERSHOOT, ANGLE_OVERSHOOT);
    } else if (2 === 0 && y === 2) {
      handAngle = random(270 - ANGLE_OVERSHOOT, 360 + ANGLE_OVERSHOOT);
    }

    this.state = { handAngle };
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
    const { handAngle } = this.state;

    return (
      <Container onClick={onClick}>
        <Smell smell={smell} length={length} />
        <SockDrawing color={color} length={length} pattern={pattern} />
        {(youSelected || otherSelected) && (
          <HandContainer
            style={{
              transform: `translate3d(${
                TRANSLATIONS[length]
              }, 0) rotate3d(0,0,1,${handAngle}deg)`
            }}
          >
            <Hand />
          </HandContainer>
        )}
      </Container>
    );
  }
}

export default Sock;
