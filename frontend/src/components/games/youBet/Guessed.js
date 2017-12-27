import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { makeList } from "../../../utils/strings";
import SecondaryText from "../../common/SecondaryText";

const Container = styled.div`
  text-align: center;
`;

const Guessed = ({ yourGuess, others }) => (
  <Container>
    <h3>You Answered: {yourGuess}</h3>
    <SecondaryText>
      Waiting for{" "}
      {makeList(others
        .filter(p => !p.guessed)
        .map(p => p.name))}&hellip;
    </SecondaryText>
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
