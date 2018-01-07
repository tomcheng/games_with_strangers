import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Spacing from "./Spacing";

const Rule = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const Divider = ({ spaceTop, spaceBottom, className }) => (
  <Spacing spaceBottom={spaceBottom} spaceTop={spaceTop}>
    {({ spacingStyle }) => <Rule style={spacingStyle} className={className} />}
  </Spacing>
);

Divider.propTypes = {
  spaceTop: PropTypes.number,
  spaceBottom: PropTypes.number
};

Divider.defaultProps = {
  spaceTop: 2,
  spaceBottom: 2
};

export default Divider;
