import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Spacing from "./Spacing";

const StyledSelect = styled.select`
  display: block;
  background-color: transparent;
  border: 1px solid #fff;
  font-size: 24px;
  font-family: Roboto, sans-serif;
  color: #fff;
  border-radius: 3px;
  height: 48px;
  padding: 0 15px;
  margin-left: ${props => (props.center ? "auto" : 0)};
  margin-right: ${props => (props.center ? "auto" : 0)};
  text-align: ${props => (props.center ? "center" : "inherit")};
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  &:after {
    content: "v";
  }
`;

const Select = ({ options, style, spaceTop, spaceBottom, ...other }) => (
  <Spacing spaceTop={spaceTop} spaceBottom={spaceBottom}>
    {({ spacingStyle }) => (
      <StyledSelect {...other} style={{ ...style, ...spacingStyle }}>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </StyledSelect>
    )}
  </Spacing>
);

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  spaceTop: PropTypes.number,
  spaceBottom: PropTypes.number,
  style: PropTypes.object,
  center: PropTypes.bool
};

export default Select;
