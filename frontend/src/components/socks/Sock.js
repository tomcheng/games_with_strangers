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
  1: { x: 26, y: 90 },
  2: { x: 32, y: 87 },
  3: { x: 32, y: 80 }
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
  align-items: center;
  transition: transform 0.12s ease-out;
  width: 71px;
  height: 170px;
  justify-content: center;
`;

const HandContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
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
    positionX: PropTypes.number.isRequired,
    positionY: PropTypes.number.isRequired,
    youSelected: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    lastCorrect: PropTypes.oneOf(["you", "other"])
  };

  constructor(props) {
    super();

    const { positionX: x, positionY: y } = props;
    const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
    let handAngle = 0;
    let employeeHandAngle = 0;
    let otherHandAngle = 0;
    let handDistance = 0;

    if (x === 0 && y === 0) {
      handAngle = random(90 - ANGLE_OVERSHOOT, 180 + ANGLE_OVERSHOOT);
      employeeHandAngle = random(90 - ANGLE_OVERSHOOT, 180 + ANGLE_OVERSHOOT);
      otherHandAngle = random(90 - ANGLE_OVERSHOOT, 180 + ANGLE_OVERSHOOT);
      handDistance = Math.max(windowWidth, windowHeight) / 4;
    } else if (x === 1 && y === 0) {
      handAngle = random(180 - ANGLE_OVERSHOOT, 180 + ANGLE_OVERSHOOT);
      employeeHandAngle = random(180 - ANGLE_OVERSHOOT, 180 + ANGLE_OVERSHOOT);
      otherHandAngle = random(180 - ANGLE_OVERSHOOT, 180 + ANGLE_OVERSHOOT);
      handDistance = windowHeight / 4;
    } else if (x === 2 && y === 0) {
      handAngle = random(180 - ANGLE_OVERSHOOT, 270 + ANGLE_OVERSHOOT);
      employeeHandAngle = random(180 - ANGLE_OVERSHOOT, 270 + ANGLE_OVERSHOOT);
      otherHandAngle = random(180 - ANGLE_OVERSHOOT, 270 + ANGLE_OVERSHOOT);
      handDistance = Math.max(windowWidth, windowHeight) / 4;
    } else if (x === 0 && y === 1) {
      handAngle = random(90 - ANGLE_OVERSHOOT, 90 + ANGLE_OVERSHOOT);
      employeeHandAngle = random(90 - ANGLE_OVERSHOOT, 90 + ANGLE_OVERSHOOT);
      otherHandAngle = random(90 - ANGLE_OVERSHOOT, 90 + ANGLE_OVERSHOOT);
      handDistance = windowWidth / 4;
    } else if (x === 1 && y === 1) {
      handAngle = sample([60, 120, 240, 300]);
      employeeHandAngle = sample(
        [60, 120, 240, 300].filter(a => a !== handAngle)
      );
      otherHandAngle = sample(
        [60, 120, 240, 300].filter(
          a => ![handAngle, employeeHandAngle].includes(a)
        )
      );
      handDistance = windowWidth * 0.6;
    } else if (x === 2 && y === 1) {
      handAngle = random(270 - ANGLE_OVERSHOOT, 270 + ANGLE_OVERSHOOT);
      employeeHandAngle = random(270 - ANGLE_OVERSHOOT, 270 + ANGLE_OVERSHOOT);
      otherHandAngle = random(270 - ANGLE_OVERSHOOT, 270 + ANGLE_OVERSHOOT);
      handDistance = windowWidth / 4;
    } else if (x === 0 && y === 2) {
      handAngle = random(-ANGLE_OVERSHOOT, 90 + ANGLE_OVERSHOOT);
      employeeHandAngle = random(-ANGLE_OVERSHOOT, 90 + ANGLE_OVERSHOOT);
      otherHandAngle = random(-ANGLE_OVERSHOOT, 90 + ANGLE_OVERSHOOT);
      handDistance = Math.max(windowWidth, windowHeight) / 4;
    } else if (x === 1 && y === 2) {
      handAngle = random(-ANGLE_OVERSHOOT, ANGLE_OVERSHOOT);
      employeeHandAngle = random(-ANGLE_OVERSHOOT, ANGLE_OVERSHOOT);
      otherHandAngle = random(-ANGLE_OVERSHOOT, ANGLE_OVERSHOOT);
      handDistance = windowHeight / 4;
    } else if (x === 2 && y === 2) {
      handAngle = random(270 - ANGLE_OVERSHOOT, 360 + ANGLE_OVERSHOOT);
      employeeHandAngle = random(270 - ANGLE_OVERSHOOT, 360 + ANGLE_OVERSHOOT);
      otherHandAngle = random(270 - ANGLE_OVERSHOOT, 360 + ANGLE_OVERSHOOT);
      handDistance = Math.max(windowWidth, windowHeight) / 4;
    }

    this.state = {
      handAngle,
      employeeHandAngle,
      otherHandAngle,
      handDistance: handDistance + DISTANCE_BUFFER,
      previousAttributes: null,
      replacementState: null,
      replacementPerson: null
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
        replacementState: "pending",
        replacementPerson: this.props.lastCorrect
      });
      setTimeout(() => {
        this.setState({ replacementState: "removing" });
      }, this.props.lastCorrect === "you" ? 1500 : 600);
    }
  }

  handleTransitionEndContainer = () => {
    if (this.state.replacementState === "removing") {
      setTimeout(() => {
        this.setState({ replacementState: "retrieving" });
      }, 300);
      return;
    }

    if (this.state.replacementState === "retrieving") {
      setTimeout(() => {
        this.setState({ replacementState: "replacing" });
      }, 300);
      return;
    }

    if (this.state.replacementState === "replacing") {
      setTimeout(() => {
        this.setState({ replacementState: null, replacementPerson: null });
      }, 300);
    }
  };

  render() {
    const { youSelected, onClick, id, positionX, positionY } = this.props;
    const {
      handAngle,
      employeeHandAngle,
      otherHandAngle,
      handDistance,
      replacementState,
      replacementPerson,
      previousAttributes
    } = this.state;

    const { color, length, pattern, smell } = ["pending", "removing"].includes(
      replacementState
    )
      ? previousAttributes
      : this.props;
    const isMiddle = positionX === 1 && positionY === 1;

    return (
      <Container
        onClick={() => {
          if (replacementState) {
            return;
          }

          onClick(id);
        }}
        style={{
          transform: `translate3d(${getContainerTranslation({
            show: !["removing", "retrieving"].includes(replacementState),
            length,
            handAngle: ["pending", "removing"].includes(replacementState)
              ? replacementPerson === "you"
                ? handAngle
                : otherHandAngle
              : employeeHandAngle,
            handDistance
          })}, 0)`,
          opacity: replacementState === "retrieving" ? 0 : 1,
          position: "relative",
          zIndex: isMiddle ? 1 : null
        }}
        onTransitionEnd={this.handleTransitionEndContainer}
      >
        <Smell smell={smell} length={length} />
        <SockDrawing color={color} length={length} pattern={pattern} />
        <HandContainer
          style={{
            transform: `translate3d(${getHandTranslation({
              show:
                youSelected ||
                (["pending", "removing"].includes(replacementState) &&
                  replacementPerson === "you"),
              length,
              handAngle,
              handDistance
            })}, 0) rotate3d(0,0,1,${handAngle}deg)`,
            opacity:
              ["retrieving", "replacing"].includes(replacementState) ||
              replacementPerson === "other"
                ? 0
                : 1
          }}
        >
          <Hand owner="you" />
        </HandContainer>
        <HandContainer
          style={{
            transform: `translate3d(${getHandTranslation({
              show: replacementState === "replacing",
              length,
              handAngle: employeeHandAngle,
              handDistance
            })}, 0) rotate3d(0,0,1,${employeeHandAngle}deg)`,
            opacity: ["removing", "retrieving"].includes(replacementState)
              ? 0
              : 1
          }}
        >
          <Hand owner="employee" />
        </HandContainer>
        <HandContainer
          style={{
            transform: `translate3d(${getHandTranslation({
              show:
                ["pending", "removing"].includes(replacementState) &&
                replacementPerson === "other",
              length,
              handAngle: otherHandAngle,
              handDistance
            })}, 0) rotate3d(0,0,1,${otherHandAngle}deg)`,
            opacity:
              ["retrieving", "replacing"].includes(replacementState) ||
              replacementPerson === "you"
                ? 0
                : 1
          }}
        >
          <Hand owner="other" />
        </HandContainer>
      </Container>
    );
  }
}

export default Sock;
