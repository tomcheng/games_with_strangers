import PropTypes from "prop-types";
import styled from "styled-components";
import keys from "lodash/keys"

const DIAMETER = 80;

const COLORS = {
  black: ["#222", "#000"],
  blue: ["#062b4c", "#051b34"],
  purple: ["#794e9b", "#68438b"],
  red: ["#800000", "#6C0000"],
  green: ["#008000", "#016C00"],
  white: ["#dddddd", "#C1C1C1"],
  yellow: ["#f5bd00", "#d09800"],
  orange: ["#f0803c", "#ce6732"],
  turquoise: ["#1d9295", "#147f83"]
};

const ChipBase = styled.div`
  position: relative;
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
    content: "${props => props.amount}";
    text-align: center;
    font: bold ${props => DIAMETER / 151 * (props.amount >= 1000 ? 40 : 50)}px/${DIAMETER / 151 * 111}px Arial;
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
      #fff ${DIAMETER / 151 * 67.5}px,
      #fff ${DIAMETER / 151 * 83.5}px,
      transparent ${DIAMETER / 151 * 83.5}px,
      transparent ${DIAMETER}px
    ),
    linear-gradient(
      60deg,
      transparent 0,
      transparent ${DIAMETER / 151 * 97.4304}px,
      #fff ${DIAMETER / 151 * 97.4304}px,
      #fff ${DIAMETER / 151 * 113.4304}px,
      transparent ${DIAMETER / 151 * 113.4304}px,
      transparent ${DIAMETER}px
    ),
    linear-gradient(
      120deg,
      ${props => COLORS[props.color][0]} 0,
      ${props => COLORS[props.color][0]} ${DIAMETER / 151 * 97.4304}px,
      #fff ${DIAMETER / 151 * 97.4304}px,
      #fff ${DIAMETER / 151 * 113.4304}px,
      ${props => COLORS[props.color][0]} ${DIAMETER / 151 * 113.4304}px,
      ${props => COLORS[props.color][0]} ${DIAMETER}px
    );

  &:before {
    border: ${DIAMETER / 151 * 8}px solid ${props => COLORS[props.color][0]};
    background-image: linear-gradient(
        0deg,
        transparent 0,
        transparent ${DIAMETER / 151 * 69.5}px,
        #ebebeb ${DIAMETER / 151 * 69.5}px,
        #ebebeb ${DIAMETER / 151 * 81.5}px,
        transparent ${DIAMETER / 151 * 81.5}px,
        transparent ${DIAMETER}px
      ),
      linear-gradient(
        30deg,
        transparent 0,
        transparent ${DIAMETER / 151 * 98.7104}px,
        #ebebeb ${DIAMETER / 151 * 98.7104}px,
        #ebebeb ${DIAMETER / 151 * 110.7104}px,
        transparent ${DIAMETER / 151 * 110.7104}px,
        transparent ${DIAMETER}px
      ),
      linear-gradient(
        60deg,
        transparent 0,
        transparent ${DIAMETER / 151 * 98.7104}px,
        #ebebeb ${DIAMETER / 151 * 98.7104}px,
        #ebebeb ${DIAMETER / 151 * 110.7104}px,
        transparent ${DIAMETER / 151 * 110.7104}px,
        transparent ${DIAMETER}px
      ),
      linear-gradient(
        90deg,
        transparent 0,
        transparent ${DIAMETER / 151 * 69.5}px,
        #ebebeb ${DIAMETER / 151 * 69.5}px,
        #ebebeb ${DIAMETER / 151 * 81.5}px,
        transparent ${DIAMETER / 151 * 81.5}px,
        transparent ${DIAMETER}px
      ),
      linear-gradient(
        120deg,
        transparent 0,
        transparent ${DIAMETER / 151 * 98.7104}px,
        #ebebeb ${DIAMETER / 151 * 98.7104}px,
        #ebebeb ${DIAMETER / 151 * 110.7104}px,
        transparent ${DIAMETER / 151 * 110.7104}px,
        transparent ${DIAMETER}px
      ),
      linear-gradient(
        150deg,
        ${props => COLORS[props.color][1]} 0,
        ${props => COLORS[props.color][1]} ${DIAMETER / 151 * 98.7104}px,
        #ebebeb ${DIAMETER / 151 * 98.7104}px,
        #ebebeb ${DIAMETER / 151 * 110.7104}px,
        ${props => COLORS[props.color][1]} ${DIAMETER / 151 * 110.7104}px,
        ${props => COLORS[props.color][1]} ${DIAMETER}px
      );
  }

  &:after {
    background: ${props => COLORS[props.color][0]};
    color: ${props => COLORS[props.color][1]};
  }
`;

Chip.propTypes = {
  color: PropTypes.oneOf(keys(COLORS)),
  amount: PropTypes.number,
};

Chip.defaultProps = {
  color: "black",
  amount: 100
};

export default Chip;
