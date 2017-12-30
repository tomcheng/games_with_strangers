import React from "react";
import PropTypes from "prop-types";
import * as customTypes from "../../../utils/customTypes";
import SectionHeader from "../../common/SectionHeader";
import styled from "styled-components";

const Container = styled.div`
  padding: 16px 24px 24px;
`;

const Entry = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 8px;
  & + & {
    padding-top: 8px;
    border-top: 1px dotted rgba(255,255,255,0.2);
  }
`;

const Scores = ({ scores }) => (
  <Container>
    <SectionHeader>Scores</SectionHeader>
    {scores.map(({ player, score}) => (
      <Entry key={player.id}><span>{player.name}</span><span>{score}</span></Entry>
    ))}
  </Container>
);

Scores.propTypes = {
  scores: PropTypes.arrayOf(
    PropTypes.shape({
      player: customTypes.player.isRequired,
      score: PropTypes.number.isRequired
    })
  ).isRequired
};

export default Scores;