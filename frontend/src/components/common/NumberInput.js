import React from "react";
import PropTypes from "prop-types";
import Spacing from "./Spacing";
import StyledInput from "./StyledInput";

export const NumberInput = ({ spaceTop, spaceBottom, ...other }) => (
  <Spacing spaceBottom={spaceBottom} spaceTop={spaceTop}>
    {({ spacingStyle }) => (
      <StyledInput
        {...other}
        style={spacingStyle}
        type="number"
        autoComplete="off"
      />
    )}
  </Spacing>
);

NumberInput.propTypes = {
  hasError: PropTypes.bool,
  spaceBottom: PropTypes.number,
  spaceTop: PropTypes.number
};

export default NumberInput;
