import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { makeList } from "../../../utils/strings";
import customTypes from "../../../utils/customTypes";
import SecondaryText from "../../common/SecondaryText";

const Container = styled.div`
  text-align: center;
`;

const Guessed = ({ yourGuess, awaitingGuess }) => (
  <Container>
    <h3>You Answered: {yourGuess}</h3>
    <SecondaryText>
      Waiting for {makeList(awaitingGuess.map(p => p.name))}&hellip;
    </SecondaryText>
  </Container>
);

Guessed.propTypes = {
  yourGuess: PropTypes.number.isRequired,
  awaitingGuess: customTypes.players.isRequired
};

export default Guessed;
