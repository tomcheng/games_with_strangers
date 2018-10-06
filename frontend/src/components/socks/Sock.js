import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import SockDrawing from "./SockDrawing";
import Smell from "./Smell";

const Container = styled.div`
  user-select: none;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Sock = ({ color, length, pattern, smell, onClick }) => (
  <Container onClick={onClick}>
    <Smell smell={smell} length={length} />
    <SockDrawing color={color} length={length} pattern={pattern} />
  </Container>
);

Sock.propTypes = {
  onClick: PropTypes.func.isRequired,
  color: PropTypes.oneOf([1, 2, 3]).isRequired,
  length: PropTypes.oneOf([1, 2, 3]).isRequired,
  pattern: PropTypes.oneOf([1, 2, 3]).isRequired,
  smell: PropTypes.oneOf([1, 2, 3]).isRequired,
  youSelected: PropTypes.bool.isRequired,
  otherSelected: PropTypes.bool.isRequired
};

export default Sock;
