import React, { Component } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Transition, config } from "react-spring";

const Container = styled.div`
  position: fixed;
  z-index: 1;
  top: 6px;
  left: 20px;
`;

const StyledCanvas = styled.canvas`
  position: absolute;
`;

const Text = styled.div`
  color: #333;
  font-family: "Amatic SC", sans-serif;
  font-weight: 400;
  font-size: 36px;
  position: absolute;
  white-space: nowrap;
  padding: 35px 27px 0;
  text-align: center;
`;

class CorrectSpeechBubble extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired
  };

  el = document.createElement("div");
  textEl = null;
  canvasEl = null;

  componentDidMount() {
    document.body.appendChild(this.el);
  }

  componentWillUnmount() {
    document.body.removeChild(this.el);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.open && this.props.open) {
      this.drawBubble(this.textEl.offsetWidth);
    }
  }

  drawBubble = width => {
    const canvas = this.canvasEl;
    const dpr = window.devicePixelRatio || 1;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${84}px`;
    canvas.width = width * dpr;
    canvas.height = 84 * dpr;

    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);

    ctx.strokeStyle = "#333";
    ctx.lineWidth = 1;
    ctx.fillStyle = "#fff";

    const x = width / 174;

    ctx.beginPath();
    ctx.moveTo(75 * x, 1);

    const curveCoordinates = [
      [71, 9, 71, 15, 75, 18],
      [156, 18, 173, 21, 173, 52],
      [173, 81, 153, 83, 91, 83],
      [30, 83, 1, 81, 1, 49],
      [1, 21, 21, 18, 53, 18],
      [55, 9, 62, 5, 75, 1]
    ];

    curveCoordinates.forEach(arr => {
      ctx.bezierCurveTo(...arr.map((c, i) => (i % 2 === 0 ? c * x : c)));
    });

    ctx.closePath();

    ctx.fill();
    ctx.stroke();
  };

  render() {
    const { open } = this.props;
    return createPortal(
      <Transition
        from={{ transform: "translate3d(0, -100px, 0)" }}
        enter={{ transform: "translate3d(0, 0, 0)" }}
        leave={{ transform: "translate3d(0, -100px, 0)" }}
        config={config.stiff}
      >
        {open &&
          (style => (
            <Container style={style}>
              <StyledCanvas
                innerRef={el => {
                  this.canvasEl = el;
                }}
              />
              <Text
                innerRef={el => {
                  this.textEl = el;
                }}
              >
                Great Work!
              </Text>
            </Container>
          ))}
      </Transition>,
      this.el
    );
  }
}

export default CorrectSpeechBubble;
