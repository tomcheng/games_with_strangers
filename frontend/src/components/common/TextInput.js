import React from "react";
import PropTypes from "prop-types";
import Spacing from "./Spacing";
import StyledInput from "./StyledInput";

export const TextInput = ({ spaceTop, spaceBottom, ...other }) => (
  <Spacing spaceBottom={spaceBottom} spaceTop={spaceTop}>
    {({ spacingStyle }) => (
      <StyledInput
        {...other}
        style={spacingStyle}
        type="text"
        autoComplete="off"
      />
    )}
  </Spacing>
);

TextInput.propTypes = {
  hasError: PropTypes.bool,
  spaceBottom: PropTypes.number,
  spaceTop: PropTypes.number
};

export default TextInput;
