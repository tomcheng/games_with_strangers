import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Answer from "./Answer";
import DraggableChip from "./DraggableChip";
import ChipDragLayer from "./ChipDragLayer";

const Container = styled.div`
  position: relative;
`;

const UnplayedChips = styled.div`
  position: fixed;
  z-index: 1;
  bottom: 8px;
  right: -16px;
`;

const UnplayedDraggableChip1 = styled(DraggableChip)`
  position: absolute;
  bottom: 84px;
  right: 0;
`;

const UnplayedDraggableChip2 = styled(DraggableChip)`
  position: absolute;
  bottom: 0;
  right: 0;
`;

const PlayedDraggableChip = styled(DraggableChip)`
  position: absolute;
  top: 0;
  left: 0;
`;

class Bets extends Component {
  static propTypes = {
    guesses: PropTypes.arrayOf(
      PropTypes.shape({
        guess: PropTypes.number,
        players: PropTypes.arrayOf(PropTypes.string),
        odds: PropTypes.number
      })
    ),
    onBet: PropTypes.func.isRequired
  };

  state = { chips: { 1: null, 2: null } };

  containerEl = null;

  handleBet = ({ guess, position: fixedPosition, chipId }) => {
    const {
      x: containerX,
      y: containerY
    } = this.containerEl.getBoundingClientRect();
    const position = {
      x: fixedPosition.x - containerX,
      y: fixedPosition.y - containerY
    };

    this.setState({
      chips: { ...this.state.chips, [chipId]: { guess, position } }
    });
  };

  render() {
    const { guesses } = this.props;
    const { 1: chip1, 2: chip2 } = this.state.chips;

    const chip1Played = !!chip1;
    const chip1Transform = chip1Played
      ? `translate(${chip1.position.x}px, ${chip1.position.y}px)`
      : null;
    const chip1Style = chip1Played
      ? { transform: chip1Transform, WebkitTransform: chip1Transform }
      : null;

    const chip2Played = !!chip2;
    const chip2Transform = chip2Played
      ? `translate(${chip2.position.x}px, ${chip2.position.y}px)`
      : null;
    const chip2Style = chip2Played
      ? { transform: chip2Transform, WebkitTransform: chip2Transform }
      : null;

    return (
      <Container
        innerRef={el => {
          this.containerEl = el;
        }}
      >
        {guesses.map(({ guess, odds, players }) => (
          <Answer
            selected={[chip1 && chip1.guess, chip2 && chip2.guess].includes(guess)}
            key={guess}
            guess={guess}
            odds={odds}
            players={players}
            onBet={this.handleBet}
          />
        ))}
        {chip1Played && <PlayedDraggableChip chipId={1} style={chip1Style} />}
        {chip2Played && <PlayedDraggableChip chipId={2} style={chip2Style} />}
        <UnplayedChips>
          {!chip1Played && <UnplayedDraggableChip1 chipId={1} />}
          {!chip2Played && <UnplayedDraggableChip2 chipId={2} />}
        </UnplayedChips>
        <ChipDragLayer />
      </Container>
    );
  }
}

export default Bets;
