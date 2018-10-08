import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import pick from "lodash/pick";
import random from "lodash/random";
import sample from "lodash/sample";
import SockDrawing from "./SockDrawing";
import Smell from "./Smell";
import Hand from "./Hand";

const ANGLE_OVERSHOOT = 15;
const HAND_MIDDLE_X = 16;
const HAND_MIDDLE_Y = 15;
const DISTANCE_BUFFER = 100;

const TRANSLATIONS = {
  1: { x: 3, y: 40 },
  2: { x: 0, y: 58 },
  3: { x: -4, y: 80 }
};

const getContainerTranslation = ({ length, show, handAngle, handDistance }) => {
  if (show) {
    return `0px, 0px`;
  }

  return `${-handDistance *
    Math.sin((handAngle * Math.PI) / 180)}px, ${handDistance *
    Math.cos((handAngle * Math.PI) / 180)}px`;
};

const getHandTranslation = ({ length, show, handAngle, handDistance }) => {
  const { x, y } = TRANSLATIONS[length];
  if (show) {
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
  transition: transform 0.12s ease-out;
`;

const HandContainer = styled.div`
  position: absolute;
  z-index: 1;
  pointer-events: none;
  transform-origin: ${HAND_MIDDLE_X}px ${HAND_MIDDLE_Y}px;
  transition: transform 0.12s ease-out;
`;

class Sock extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    color: PropTypes.oneOf([1, 2, 3]).isRequired,
    length: PropTypes.oneOf([1, 2, 3]).isRequired,
    pattern: PropTypes.oneOf([1, 2, 3]).isRequired,
    smell: PropTypes.oneOf([1, 2, 3]).isRequired,
    positionX: PropTypes.oneOf([0, 1, 2]),
    positionY: PropTypes.oneOf([0, 1, 2]),
    youSelected: PropTypes.bool.isRequired,
    otherSelected: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
  };

  constructor(props) {
    super();

    const { positionX: x, positionY: y } = props;
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

    this.state = {
      handAngle,
      handDistance: handDistance + DISTANCE_BUFFER,
      previousAttributes: null,
      replacementPending: false,
      isRemoving: false,
      isReplacing: false
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.setState({
        previousAttributes: pick(prevProps, [
          "color",
          "length",
          "pattern",
          "smell"
        ]),
        replacementPending: true
      });
      setTimeout(() => {
        this.setState({ isRemoving: true });
      }, 2000);
    }
  }

  handleTransitionEndContainer = () => {
    if (this.state.isRemoving) {
      setTimeout(() => {
        this.setState({
          isRemoving: false,
          isReplacing: true
        });
      }, 600);
      return;
    }

    if (this.state.isReplacing) {
      setTimeout(() => {
        this.setState({ isReplacing: false, replacementPending: false });
      }, 300);
    }
  };

  render() {
    const { youSelected, otherSelected, onClick, id } = this.props;
    const {
      handAngle,
      handDistance,
      replacementPending,
      isRemoving,
      isReplacing,
      previousAttributes
    } = this.state;

    const { color, length, pattern, smell } =
      replacementPending && !isReplacing ? previousAttributes : this.props;

    return (
      <Container
        onClick={() => {
          onClick(id);
        }}
        style={{
          transform: `translate3d(${getContainerTranslation({
            show: !isRemoving,
            length,
            handAngle,
            handDistance
          })}, 0)`,
          position: "relative",
          zIndex: youSelected || otherSelected || replacementPending ? 1 : null
        }}
        onTransitionEnd={this.handleTransitionEndContainer}
      >
        <Smell smell={smell} length={length} />
        <SockDrawing color={color} length={length} pattern={pattern} />
        <HandContainer
          style={{
            transform: `translate3d(${getHandTranslation({
              show: youSelected || replacementPending,
              length,
              handAngle,
              handDistance
            })}, 0) rotate3d(0,0,1,${handAngle}deg)`
          }}
        >
          <Hand owner="you" />
        </HandContainer>
        <HandContainer
          style={{
            transform: `translate3d(${getHandTranslation({
              show: otherSelected,
              length,
              handAngle,
              handDistance
            })}, 0) rotate3d(0,0,1,${handAngle}deg)`
          }}
        >
          <Hand owner="other" />
        </HandContainer>
      </Container>
    );
  }
}

export default Sock;
