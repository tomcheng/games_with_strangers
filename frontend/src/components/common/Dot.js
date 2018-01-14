import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledDot = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  position: relative;
  top: -1px;
`;

const Dot = ({ color }) => (
  <StyledDot style={{ backgroundColor: color }} />
);

Dot.propTypes = {
  color: PropTypes.string.isRequired
};

export default Dot;
