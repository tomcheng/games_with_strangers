import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { makeList } from "../../../utils/strings";

const Container = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  margin-bottom: 24px;
`;

const Guessed = ({ yourGuess, others }) => (
  <Container>
    <Title>You Answered: {yourGuess}</Title>
    <div>
      Waiting on{" "}
      {makeList(others
        .filter(p => !p.guessed)
        .map(p => p.name))}
    </div>
  </Container>
);

Guessed.propTypes = {
  yourGuess: PropTypes.number.isRequired,
  others: PropTypes.arrayOf(
    PropTypes.shape({
      guessed: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired
};

export default Guessed;
