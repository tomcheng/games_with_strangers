import React from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import { findDOMNode } from "react-dom";
import { animate } from "../../utils/animation.js";
import {
  bounceOut,
  cubicOut,
  cubicInOut,
  elasticOut
} from "../../utils/easings.js";
import { constrain } from "../../utils/math.js";
import TouchHandler from "./TouchHandler.js";

const DRAG_CONSTANT = 0.2; // amount of slow down dragging past bounds
const RETURN_THRESHOLD = 0.6; // amount dragging past end to return to first image

const wiggle = keyframes`
  100%, from {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
  }
  16.7%, 50%, 83.3% {
    -webkit-transform: translate3d(-8px, 0, 0);
    transform: translate3d(-8px, 0, 0)
  }
  33.3%, 67.7% {
    -webkit-transform: translate3d(8px, 0, 0);
    transform: translate3d(8px, 0, 0)
  }
`;

const Container = styled.div`
  overflow: hidden;
  position: relative;
  cursor: pointer;
  animation-name: ${props => (props.shouldWiggle ? wiggle : "")};
  animation-duration: 0.5s;
  animation-iteration-count: 1;
  animation-timing-function: ease-out;
`;

const List = styled.div`
  display: flex;
  user-select: none;
`;

class Carousel extends React.Component {
  static propTypes = {
    panes: PropTypes.arrayOf(PropTypes.node).isRequired
  };

  state = {
    dragDirection: null,
    isDragging: false,
    isDraggingHorizontally: false,
    scrollPos: 0,
    scrollPosAtDragStart: null,
    shouldWiggle: false,
    frameWidth: 1000
  };

  componentDidMount() {
    this.setDimensions();
    window.addEventListener("resize", this.setDimensions);
    window.addEventListener("orientationchange", this.setDimensions);
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.setDimensions);
    window.removeEventListener("orientationchange", this.setDimensions);
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  setDimensions = () => {
    const frameWidth = findDOMNode(this.wrapper).offsetWidth;
    const currentPane = this.getCurrentPane();

    this.setState({
      frameWidth: Math.max(frameWidth, 1),
      scrollPos: -frameWidth * currentPane
    });
  };

  handleKeyDown = evt => {
    switch (evt.code) {
      case "ArrowRight":
        this.goToNextPane();
        break;
      case "ArrowLeft":
        this.goToPrevPane();
        break;
      default:
        break;
    }
  };

  getCurrentPane = (state = this.state) => {
    const { scrollPos, frameWidth } = state;
    const numPanes = this.props.panes.length;

    return constrain(
      Math.floor(-scrollPos / frameWidth + 0.5),
      0,
      numPanes - 1
    );
  };

  getPrevPane = () => {
    const { scrollPos, frameWidth } = this.state;
    const numPanes = this.props.panes.length;

    return constrain(Math.floor(-scrollPos / frameWidth), 0, numPanes - 1);
  };

  getNextPane = () => {
    const { scrollPos, frameWidth } = this.state;
    const numPanes = this.props.panes.length;

    return constrain(Math.ceil(-scrollPos / frameWidth), 0, numPanes - 1);
  };

  animateToPane = (pane, duration, easing) => {
    this.animation = animate({
      name: "horizontalPan-" + this.props.title,
      start: this.state.scrollPos,
      end: -this.state.frameWidth * pane,
      duration,
      easing,
      onUpdate: scrollPos => {
        this.setState({ scrollPos });
      }
    });
  };

  handleDrag = evt => {
    const { deltaX, direction } = evt;
    const {
      isDragging,
      isDraggingHorizontally,
      scrollPos,
      scrollPosAtDragStart,
      frameWidth
    } = this.state;
    const numPanes = this.props.panes.length;

    if (isDragging && isDraggingHorizontally) {
      let dragOffset = deltaX;
      if (
        scrollPosAtDragStart + deltaX > 0 ||
        scrollPosAtDragStart + deltaX < -frameWidth * (numPanes - 1)
      ) {
        dragOffset *= DRAG_CONSTANT;
      }

      this.setState({ scrollPos: scrollPosAtDragStart + dragOffset });
    }

    if (!isDragging) {
      if (this.animation) {
        this.animation.stop("horizontalPan-" + this.props.title);
      }

      this.setState({
        isDragging: true,
        isDraggingHorizontally: direction === "left" || direction === "right",
        scrollPosAtDragStart: scrollPos
      });
    }
  };

  handleDragRelease = evt => {
    const { deltaX, velocityX } = evt;
    const { isDraggingHorizontally, scrollPos, frameWidth } = this.state;
    const numPanes = this.props.panes.length;
    const currentPane = this.getCurrentPane();
    let destinationPane = currentPane;
    let distanceToScroll;
    let duration;

    if (isDraggingHorizontally) {
      if (scrollPos > 0 || numPanes === 1) {
        // scrollPos out of bounds at start
        this.animateToPane(currentPane, 600, elasticOut);
      } else if (scrollPos < -frameWidth * (numPanes - 1)) {
        // scrollPos out of bounds at end
        if (Math.abs(deltaX) > frameWidth * RETURN_THRESHOLD && numPanes > 1) {
          this.animateToPane(0, 120 * numPanes, cubicOut);
        } else {
          this.animateToPane(currentPane, 450, bounceOut);
        }
      } else {
        if (Math.abs(velocityX) > 0.05) {
          if (velocityX < 0) {
            destinationPane = this.getNextPane();
          }
          if (velocityX > 0) {
            destinationPane = this.getPrevPane();
          }
        }
        distanceToScroll = Math.abs(-frameWidth * destinationPane - scrollPos);
        duration = constrain(
          Math.abs(distanceToScroll / velocityX * 3),
          200,
          400
        );

        this.animateToPane(destinationPane, duration, cubicOut);
      }
    }

    this.setState({
      isDragging: false,
      isDraggingHorizontally: false,
      scrollPosAtDragStart: null
    });
  };

  goToNextPane = () => {
    const numPanes = this.props.panes.length;
    const currentPane = this.getCurrentPane();
    const nextPane = (currentPane + 1) % numPanes;

    if (numPanes === 1) {
      this.setState({ shouldWiggle: true });
      setTimeout(() => {
        this.setState({ shouldWiggle: false });
      }, 500);
      return;
    }

    if (nextPane === 0) {
      this.animateToPane(0, 150 * numPanes, cubicInOut);
    } else {
      this.animateToPane(nextPane, 350, cubicInOut);
    }
  };

  goToPrevPane = () => {
    const numPanes = this.props.panes.length;
    const currentPane = this.getCurrentPane();
    const prevPane = currentPane === 0 ? numPanes - 1 : currentPane - 1;

    if (numPanes === 1) {
      this.setState({ shouldWiggle: true });
      setTimeout(() => {
        this.setState({ shouldWiggle: false });
      }, 500);
      return;
    }

    if (currentPane === 0) {
      this.animateToPane(prevPane, 150 * numPanes, cubicInOut);
    } else {
      this.animateToPane(prevPane, 350, cubicInOut);
    }
  };

  render() {
    const { panes } = this.props;
    const { scrollPos, frameWidth, shouldWiggle } = this.state;
    const numPanes = panes.length;

    return (
      <Container
        ref={el => {
          this.wrapper = el;
        }}
        shouldWiggle={shouldWiggle}
      >
        <TouchHandler
          onDrag={this.handleDrag}
          onDragRelease={this.handleDragRelease}
          onTap={this.goToNextPane}
        >
          <List
            style={{
              width: frameWidth * numPanes,
              WebkitTransform: "translate3d(" + scrollPos + "px, 0, 0)",
              transform: "translate3d(" + scrollPos + "px, 0, 0)"
            }}
          >
            {panes.map((pane, index) => (
              <div key={index} style={{ width: frameWidth }}>
                {pane}
              </div>
            ))}
          </List>
        </TouchHandler>
      </Container>
    );
  }
}

export default Carousel;
