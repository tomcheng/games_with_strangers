import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import SockSmall from "../../svgs/SockSmall";
import SockMedium from "../../svgs/SockMedium";
import SockLarge from "../../svgs/SockLarge";

const Container = styled.div`
  user-select: none;
`;

const Sock = ({ onClick, length, color }) => (
  <Container onClick={onClick}>
    {length === 1 ? (
      <SockSmall color={color} />
    ) : length === 2 ? (
      <SockMedium color={color} />
    ) : (
      <SockLarge color={color} />
    )}
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
