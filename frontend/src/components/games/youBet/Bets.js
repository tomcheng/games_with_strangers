import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Button from "../../common/Button";
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
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
    you: PropTypes.shape({
      bets: PropTypes.arrayOf(
        PropTypes.shape({
          guess: PropTypes.number,
          wager: PropTypes.number
        })
      )
    }).isRequired,
    onBet: PropTypes.func.isRequired,
    onFinalizeBets: PropTypes.func.isRequired
  };

  constructor(props) {
    super();

    this.state = { chips: { 1: null, 2: null } };

    const { bets } = props.you;

    if (!bets) {
      return;
    }

    this.state = {
      chips: {
        1: { guess: bets[0].guess, position: null },
        2: { guess: bets[1].guess, position: null }
      }
    };
  }

  containerEl = null;
  answerEls = {};

  handleBet = ({ guess, position: fixedPosition, chipId }) => {
    const { x: containerX, y: containerY } = this.answerEls[
      guess
    ].getBoundingClientRect();
    const position = {
      x: fixedPosition.x - containerX,
      y: fixedPosition.y - containerY
    };

    this.setState({
      chips: { ...this.state.chips, [chipId]: { guess, position } }
    });
  };

  handleClickFinalize = () => {
    const { onFinalizeBets } = this.props;
    const { chips } = this.state;

    onFinalizeBets({
      bet1: { guess: chips[1].guess, wager: 100 },
      bet2: { guess: chips[2].guess, wager: 100 }
    });
  };

  getChipsForGuess = guess => {
    const { 1: chip1, 2: chip2 } = this.state.chips;
    const chips = [];

    if (chip1 && chip1.guess === guess) {
      chips.push({ id: 1, position: chip1.position });
    }

    if (chip2 && chip2.guess === guess) {
      chips.push({ id: 2, position: chip2.position });
    }

    return chips;
  };

  render() {
    const { guesses } = this.props;
    const { 1: chip1, 2: chip2 } = this.state.chips;

    return (
      <Container
        innerRef={el => {
          this.containerEl = el;
        }}
      >
        {guesses.map(({ guess, odds, players }) => (
          <Answer
            nothingSelected={!chip1 && !chip2}
            chips={this.getChipsForGuess(guess)}
            key={guess}
            guess={guess}
            odds={odds}
            players={players}
            onBet={this.handleBet}
            innerRef={el => {
              this.answerEls[guess] = el;
            }}
          />
        ))}
        <ButtonContainer>
          <Button
            onClick={this.handleClickFinalize}
            disabled={!chip1 || !chip2}
          >
            Finalize Bets
          </Button>
        </ButtonContainer>
        <UnplayedChips>
          {!chip1 && <UnplayedDraggableChip1 chipId={1} />}
          {!chip2 && <UnplayedDraggableChip2 chipId={2} />}
        </UnplayedChips>
        <ChipDragLayer />
      </Container>
    );
  }
}

export default Bets;
