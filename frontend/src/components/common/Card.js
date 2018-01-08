import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Spacing from "./Spacing";

const StyledCard = styled.div`
  border: 2px solid #fff;
  border-radius: 6px;
  padding: 8px 12px;
`;

const Card = ({ spaceBottom, style, className, children }) => (
  <Spacing spaceBottom={spaceBottom}>
    {({ spacingStyle }) => (
      <StyledCard className={className} style={{ ...spacingStyle, ...style }}>
        {children}
      </StyledCard>
    )}
  </Spacing>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  spaceBottom: PropTypes.number,
  style: PropTypes.object
};

Card.defaultProps = {
  spaceBottom: 1
};

export default Card;
