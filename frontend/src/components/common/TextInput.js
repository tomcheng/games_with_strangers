import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Spacing from "./Spacing";

const Input = styled.input`
  display: block;
  width: 100%;
  background-color: ${props =>
    props.hasError ? "rgba(255,0,0,0.2)" : "rgba(0, 0, 0, 0.3)"};
  border: 1px solid
    ${props => (props.hasError ? "rgba(220, 0, 0, 1)" : "rgba(0, 0, 0, 0.2)")};
  font-size: 24px;
  font-family: Roboto, sans-serif;
  color: #fff;
  border-radius: 3px;
  height: 60px;
  padding: 0 15px;
  margin-left: ${props => (props.center ? "auto" : 0)};
  margin-right: ${props => (props.center ? "auto" : 0)};
`;

export const TextInput = ({ type, spaceBottom, ...other }) => (
  <Spacing spaceBottom={spaceBottom}>
    {({ spacingStyle }) => (
      <Input {...other} style={spacingStyle} type={type} autoComplete="off" />
    )}
  </Spacing>
);

TextInput.propTypes = {
  hasError: PropTypes.bool,
  spaceBottom: PropTypes.number,
  type: PropTypes.oneOf(["text", "number"])
};

TextInput.defaultProps = {
  type: "text"
};

export default TextInput;
