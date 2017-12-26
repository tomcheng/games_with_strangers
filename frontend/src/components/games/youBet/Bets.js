import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Answer from "./Answer";
import Chip from "./Chip";

const ChipContainer = styled.div`
  display: flex;
  position: fixed;
  z-index: 1;
  bottom: -24px;
  right: 8px;
  padding: 0;
`;

const ChipWrapper = styled.div`
  margin-right: 8px;
`;

const Bets = ({ guesses, onBet }) => {
  return (
    <div>
      {guesses.map(({ guess, odds, players }) => (
        <Answer
          key={guess}
          guess={guess}
          odds={odds}
          players={players}
          onBet={() => {
            onBet({ firstBet: { guess, wager: 100 } });
          }}
        />
      ))}
      <ChipContainer>
        <ChipWrapper>
          <Chip />
        </ChipWrapper>
        <Chip />
      </ChipContainer>
    </div>
  );
};

Bets.propTypes = {
  guesses: PropTypes.arrayOf(
    PropTypes.shape({
      guess: PropTypes.number,
      players: PropTypes.arrayOf(PropTypes.string),
      odds: PropTypes.number
    })
  ),
  onBet: PropTypes.func.isRequired
};

export default Bets;
