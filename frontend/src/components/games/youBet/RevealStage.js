import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
`;

const RevealStage = ({ answer }) => (
  <Container>
    <h3>The answer is:</h3>
    <h1>{answer}</h1>
    <h3>Charlie Chapman gets $300 for guessing closest without going over</h3>
    <h3>Rick Sanchez gets $400 for betting $200 with 2 to 1 odds</h3>
  </Container>
);

RevealStage.propTypes = {
  answer: PropTypes.number.isRequired
};

export default RevealStage;