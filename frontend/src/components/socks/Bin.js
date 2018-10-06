import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const DEPTH = 30;

const getNaturalBezier = (fromX, fromY, toX, toY) => {
  const distance = Math.sqrt((toX - fromX) ** 2 + (toY - fromY) ** 2);
  const variance = Math.min(0.03 * distance, 4);

  return [
    fromX + (1 / 3) * (toX - fromX) + variance * Math.random(),
    fromY + (1 / 3) * (toY - fromY) + variance * Math.random(),
    fromX + (2 / 3) * (toX - fromX) - variance * Math.random(),
    fromY + (2 / 3) * (toY - fromY) - variance * Math.random(),
    toX,
    toY
  ];
};

const Content = styled.div`
  padding: ${DEPTH + 20}px ${DEPTH}px;
  position: relative;
  z-index: 1;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
`;

class Bin extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  canvasEl = null;
  contentEl = null;

  componentDidMount() {
    this.drawBin();
    window.addEventListener("resize", this.drawBin);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.drawBin);
  }

  drawBin = () => {
    const canvas = this.canvasEl;
    const { offsetWidth, offsetHeight: contentHeight } = this.contentEl;
    const offsetHeight = Math.max(contentHeight, window.innerHeight);
    const dpr = window.devicePixelRatio || 1;

    canvas.style.width = `${offsetWidth}px`;
    canvas.style.height = `${offsetHeight}px`;
    canvas.width = offsetWidth * dpr;
    canvas.height = offsetHeight * dpr;

    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(...getNaturalBezier(0, 0, DEPTH, DEPTH));
    ctx.bezierCurveTo(
      ...getNaturalBezier(DEPTH, DEPTH, offsetWidth - DEPTH, DEPTH)
    );
    ctx.bezierCurveTo(
      ...getNaturalBezier(offsetWidth - DEPTH, DEPTH, offsetWidth, 0)
    );
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(DEPTH, DEPTH);
    ctx.bezierCurveTo(
      ...getNaturalBezier(DEPTH, DEPTH, DEPTH, offsetHeight - DEPTH)
    );
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(offsetWidth - DEPTH, DEPTH);
    ctx.bezierCurveTo(
      ...getNaturalBezier(
        offsetWidth - DEPTH,
        DEPTH,
        offsetWidth - DEPTH,
        offsetHeight - DEPTH
      )
    );
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, offsetHeight);
    ctx.bezierCurveTo(
      ...getNaturalBezier(0, offsetHeight, DEPTH, offsetHeight - DEPTH)
    );
    ctx.bezierCurveTo(
      ...getNaturalBezier(
        DEPTH,
        offsetHeight - DEPTH,
        offsetWidth - DEPTH,
        offsetHeight - DEPTH
      )
    );
    ctx.bezierCurveTo(
      ...getNaturalBezier(
        offsetWidth - DEPTH,
        offsetHeight - DEPTH,
        offsetWidth,
        offsetHeight
      )
    );
    ctx.stroke();
  };

  render() {
    const { children } = this.props;

    return (
      <Fragment>
        <canvas
          ref={el => {
            this.canvasEl = el;
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0
          }}
        />
        <Content
          innerRef={el => {
            this.contentEl = el;
          }}
        >
          {children}
        </Content>
      </Fragment>
    );
  }
}

export default Bin;
