import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Spacing from "./Spacing";

const StyledText = styled.div`
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  line-height: 20px;
  text-align: ${props => (props.center ? "center" : "inherit")};
`;

const SecondaryText = ({
  spaceTop,
  spaceBottom,
  children,
  style,
  ...other
}) => (
  <Spacing spaceTop={spaceTop} spaceBottom={spaceBottom}>
    {({ spacingStyle }) => (
      <StyledText {...other} style={{ ...style, ...spacingStyle }}>
        {children}
      </StyledText>
    )}
  </Spacing>
);

SecondaryText.propTypes = {
  children: PropTypes.node.isRequired,
  center: PropTypes.bool,
  spaceTop: PropTypes.number,
  spaceBottom: PropTypes.number,
  style: PropTypes.object
};

export default SecondaryText;
