import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const DIAMETER = 100;

const COLORS = {
  black: ["#fff", "#222", "#ebebeb", "#000"],
  white: ["#fff", "#dddddd", "#EBEBEB", "#C1C1C1"],
  red: ["#fff", "#800000", "#EBEBEB", "#6C0000"],
  blue: ["#fff", "#000099", "#EBEBEB", "#00016C"],
  green: ["#fff", "#008000", "#EBEBEB", "#016C00"],
};

const ChipBase = styled.div`
  position: relative;
  display: inline-block;
  width: ${DIAMETER}px;
  height: ${DIAMETER}px;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.5), 0 0 3px 0 rgba(0, 0, 0, 0.4) inset;
  border-radius: 50%;
  background-size: ${DIAMETER}px ${DIAMETER}px;
  background-position: center center;

  &:before {
    position: absolute;
    content: "";
    z-index: 1;
    width: ${DIAMETER / 151 * 117}px;
    height: ${DIAMETER / 151 * 117}px;
    border-radius: 50%;
    top: ${DIAMETER / 151 * 9}px;
    left: ${DIAMETER / 151 * 9}px;
    background-size: ${DIAMETER}px ${DIAMETER}px;
    background-position: center center;
  }

  &:after {
    z-index: 2;
    position: absolute;
    content: "${props => props.value}";
    text-align: center;
    font: bold ${DIAMETER / 151 * 50}px/${DIAMETER / 151 * 111}px Arial;
    white-space: pre;
    width: ${DIAMETER / 151 * 111}px;
    height: ${DIAMETER / 151 * 111}px;
    border-radius: 50%;
    top: ${DIAMETER / 151 * 20}px;
    left: ${DIAMETER / 151 * 20}px;
    text-shadow: -1px -1px 0px rgba(0, 0, 0, 0.3),
      1px 1px 0px rgba(255, 255, 255, 0.2);
  }
`;

const Chip = styled(ChipBase)`
  background-image: linear-gradient(
      0deg,
      transparent 0,
      transparent ${DIAMETER / 151 * 67.5}px,
      ${props => COLORS[props.color][0]} ${DIAMETER / 151 * 67.5}px,
      ${props => COLORS[props.color][0]} ${DIAMETER / 151 * 83.5}px,
      transparent ${DIAMETER / 151 * 83.5}px,
      transparent ${DIAMETER}px
    ),
    linear-gradient(
      60deg,
      transparent 0,
      transparent ${DIAMETER / 151 * 97.4304}px,
      ${props => COLORS[props.color][0]} ${DIAMETER / 151 * 97.4304}px,
      ${props => COLORS[props.color][0]} ${DIAMETER / 151 * 113.4304}px,
      transparent ${DIAMETER / 151 * 113.4304}px,
      transparent ${DIAMETER}px
    ),
    linear-gradient(
      120deg,
      ${props => COLORS[props.color][1]} 0,
      ${props => COLORS[props.color][1]} ${DIAMETER / 151 * 97.4304}px,
      ${props => COLORS[props.color][0]} ${DIAMETER / 151 * 97.4304}px,
      ${props => COLORS[props.color][0]} ${DIAMETER / 151 * 113.4304}px,
      ${props => COLORS[props.color][1]} ${DIAMETER / 151 * 113.4304}px,
      ${props => COLORS[props.color][1]} ${DIAMETER}px
    );

  &:before {
    border: ${DIAMETER / 151 * 8}px solid ${props => COLORS[props.color][1]};
    background-image: linear-gradient(
        0deg,
        transparent 0,
        transparent ${DIAMETER / 151 * 69.5}px,
        ${props => COLORS[props.color][2]} ${DIAMETER / 151 * 69.5}px,
        ${props => COLORS[props.color][2]} ${DIAMETER / 151 * 81.5}px,
        transparent ${DIAMETER / 151 * 81.5}px,
        transparent ${DIAMETER}px
      ),
      linear-gradient(
        30deg,
        transparent 0,
        transparent ${DIAMETER / 151 * 98.7104}px,
        ${props => COLORS[props.color][2]} ${DIAMETER / 151 * 98.7104}px,
        ${props => COLORS[props.color][2]} ${DIAMETER / 151 * 110.7104}px,
        transparent ${DIAMETER / 151 * 110.7104}px,
        transparent ${DIAMETER}px
      ),
      linear-gradient(
        60deg,
        transparent 0,
        transparent ${DIAMETER / 151 * 98.7104}px,
        ${props => COLORS[props.color][2]} ${DIAMETER / 151 * 98.7104}px,
        ${props => COLORS[props.color][2]} ${DIAMETER / 151 * 110.7104}px,
        transparent ${DIAMETER / 151 * 110.7104}px,
        transparent ${DIAMETER}px
      ),
      linear-gradient(
        90deg,
        transparent 0,
        transparent ${DIAMETER / 151 * 69.5}px,
        ${props => COLORS[props.color][2]} ${DIAMETER / 151 * 69.5}px,
        ${props => COLORS[props.color][2]} ${DIAMETER / 151 * 81.5}px,
        transparent ${DIAMETER / 151 * 81.5}px,
        transparent ${DIAMETER}px
      ),
      linear-gradient(
        120deg,
        transparent 0,
        transparent ${DIAMETER / 151 * 98.7104}px,
        ${props => COLORS[props.color][2]} ${DIAMETER / 151 * 98.7104}px,
        ${props => COLORS[props.color][2]} ${DIAMETER / 151 * 110.7104}px,
        transparent ${DIAMETER / 151 * 110.7104}px,
        transparent ${DIAMETER}px
      ),
      linear-gradient(
        150deg,
        ${props => COLORS[props.color][3]} 0,
        ${props => COLORS[props.color][3]} ${DIAMETER / 151 * 98.7104}px,
        ${props => COLORS[props.color][2]} ${DIAMETER / 151 * 98.7104}px,
        ${props => COLORS[props.color][2]} ${DIAMETER / 151 * 110.7104}px,
        ${props => COLORS[props.color][3]} ${DIAMETER / 151 * 110.7104}px,
        ${props => COLORS[props.color][3]} ${DIAMETER}px
      );
  }

  &:after {
    background: ${props => COLORS[props.color][1]};
    color: ${props => COLORS[props.color][3]};
  }
`;

Chip.propTypes = {
  color: PropTypes.oneOf(["black"]),
  value: PropTypes.number,
};

Chip.defaultProps = {
  color: "black",
  value: 100
};

export default Chip;
