import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { lighten, darken } from "polished";
import SecondaryText from "./SecondaryText";
import Spacing from "./Spacing";

const BASE_COLOR = "#dca424";

const BaseButton = styled.button`
  display: inline-block;
  background-clip: padding-box;
  border-radius: 2px;
  border: 0;
  font-size: ${props => (props.size === "large" ? 24 : 18)}px;
  font-family: Roboto, sans-serif;
  padding: 0 15px;
  height: ${props => (props.size === "large" ? 60 : 48)}px;

  &:disabled {
    opacity: 0.4;
  }
`;

const DefaultButton = styled(BaseButton)`
  background-color: ${BASE_COLOR};
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.15));
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  box-shadow: 0 1px 1px rgba(255, 255, 255, 0.3) inset;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);
  color: #fff;

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
`;

const SecondaryButton = styled(BaseButton)`
  border: 1px solid #fff;
  background-color: transparent;
  color: #fff;
  border-radius: 3px;
`;

const CenteredWrapper = styled.div`
  text-align: center;
`;

const HelpText = styled(SecondaryText)`
  margin-top: 4px;
`;

const COMPONENTS = {
  default: DefaultButton,
  secondary: SecondaryButton
};

const Button = ({
  center,
  helpText,
  spaceBottom,
  spaceTop,
  variation,
  ...other
}) => {
  const ButtonComponent = COMPONENTS[variation];

  return (
    <Spacing spaceBottom={spaceBottom} spaceTop={spaceTop}>
      {({ spacingStyle }) =>
        center ? (
          <CenteredWrapper style={spacingStyle}>
            <ButtonComponent {...other} />
            {helpText && <HelpText>{helpText}</HelpText>}
          </CenteredWrapper>
        ) : (
          <ButtonComponent
            {...other}
            style={{ ...other.style, ...spacingStyle }}
          />
        )
      }
    </Spacing>
  );
};

Button.propTypes = {
  helpText: PropTypes.node,
  center: PropTypes.bool,
  size: PropTypes.oneOf(["small", "large"]),
  spaceBottom: PropTypes.number,
  spaceTop: PropTypes.number,
  variation: PropTypes.oneOf(["default", "secondary"])
};

Button.defaultProps = {
  size: "large",
  variation: "default"
};

export default Button;
