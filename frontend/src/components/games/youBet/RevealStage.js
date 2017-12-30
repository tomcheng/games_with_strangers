import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
`;

const RevealStage = ({ answer }) => (
  <Container>
    <div>The actual answer is {answer}</div>
    <div>The closest guess without going over is 40</div>
    <div>Charlie Chapman gets 300 points for getting the closest guess</div>
    <div>Charlie Chapman gets 400 points for betting 200 on the closest guess</div>
  </Container>
);

RevealStage.propTypes = {
  answer: PropTypes.number.isRequired
};

export default RevealStage;