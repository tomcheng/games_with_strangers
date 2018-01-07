import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { lighten, darken } from "polished";
import SecondaryText from "./SecondaryText";
import Spacing from "./Spacing";

const BASE_COLOR = "#dca424";

const StyledButton = styled.button`
  display: inline-block;
  background-color: ${BASE_COLOR};
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.15));
  background-clip: padding-box;
  border-radius: 4px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 1px rgba(255, 255, 255, 0.3) inset;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);
  color: #fff;
  font-size: 24px;
  font-family: Roboto, sans-serif;
  padding: 0 15px;
  height: 60px;

  &:hover:enabled {
    background-color: ${lighten(0.05, BASE_COLOR)};
    cursor: pointer;
  }

  &:active {
    background-color: ${darken(0.15, BASE_COLOR)};
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5) inset;
    background-image: none;
    color: rgba(255, 255, 255, 0.9);
  }

  &:disabled {
    opacity: 0.4;
  }
`;

const CenteredWrapper = styled.div`
  text-align: center;
`;

const HelpText = styled(SecondaryText)`
  margin-top: 4px;
`;

const Button = ({ center, helpText, spaceBottom, spaceTop, ...other }) => (
  <Spacing spaceBottom={spaceBottom} spaceTop={spaceTop}>
    {({ spacingStyle }) =>
      center ? (
        <CenteredWrapper style={spacingStyle}>
          <StyledButton {...other} />
          {helpText && <HelpText>{helpText}</HelpText>}
        </CenteredWrapper>
      ) : (
        <StyledButton {...other} style={{ ...other.style, ...spacingStyle }} />
      )
    }
  </Spacing>
);

Button.propTypes = {
  helpText: PropTypes.node,
  center: PropTypes.bool,
  spaceBottom: PropTypes.number,
  spaceTop: PropTypes.number
};

export default Button;
