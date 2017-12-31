import React, { Component } from "react";
import PropTypes from "prop-types";
import * as customTypes from "../../../utils/customTypes";
import styled from "styled-components";
import { makeList } from "../../../utils/strings";
import Button from "../../common/Button";
import SecondaryText from "../../common/SecondaryText";
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

const UnplayedDraggableChip = styled(DraggableChip)`
  position: absolute;
  bottom: 0;
  right: 0;
  transition: transform 0.2s ease-in-out;
`;

const Footer = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: center;
  text-align: center;
`;

class BettingStage extends Component {
  static propTypes = {
    awaitingBet: customTypes.players.isRequired,
    betOptions: PropTypes.arrayOf(
      PropTypes.shape({
        guess: PropTypes.number.isRequired,
        odds: PropTypes.number.isRequired,
        players: customTypes.players.isRequired
      })
    ).isRequired,
    yourBet: PropTypes.arrayOf(
      PropTypes.shape({
        guess: PropTypes.number.isRequired
      })
    ),
    yourScore: PropTypes.number.isRequired,
    onBet: PropTypes.func.isRequired,
    onFinalizeBets: PropTypes.func.isRequired
  };

  constructor(props) {
    super();

    const { yourBets, yourScore } = props;

    const chips = yourBets
      ? yourBets.map(({ guess }, index) => ({
          id: index + 1,
          amount: 100,
          base: true,
          guess,
          position: null
        }))
      : this.getInitialChips(yourScore);

    this.state = { chips };
  }

  getInitialChips = score => {
    if (score < 200) {
      return [];
    }
    const chips = [
      { id: 1, amount: 100, color: "black", base: true, guess: null, position: null },
      { id: 2, amount: 100, color: "black", base: true, guess: null, position: null }
    ];
    let id = 3;
    let remaining = score - 200;

    while (remaining >= 500) {
      chips.push({ id, amount: 500, color: "red", base: false, guess: null, position: null });
      id += 1;
      remaining -= 500;
    }

    while (remaining >= 100) {
      chips.push({ id, amount: 100, color: "white", base: false, guess: null, position: null });
      id += 1;
      remaining -= 100;
    }

    return chips;
  };

  containerEl = null;
  answerEls = {};

  handleBet = ({ guess, position: fixedPosition, chipId, base }) => {
    const { chips } = this.state;
    const { x: containerX, y: containerY } = this.answerEls[
      guess
    ].getBoundingClientRect();
    const position = {
      x: fixedPosition.x - containerX,
      y: fixedPosition.y - containerY
    };

    if (!base && chips.filter(chip => chip.guess === guess).length === 0) {
      return;
    }

    const newChips = chips.map(
      chip => (chip.id === chipId ? { ...chip, guess, position } : chip)
    );

    this.setState({ chips: newChips });
  };

  handleClickFinalize = () => {
    const { onFinalizeBets } = this.props;
    const { chips } = this.state;

    onFinalizeBets({
      bet1: { guess: chips[0].guess, wager: 100 },
      bet2: { guess: chips[1].guess, wager: 100 }
    });
  };

  render() {
    const { betOptions, yourBets, awaitingBet } = this.props;
    const { chips } = this.state;
    const unplayedChips = chips.filter(({ guess }) => !guess);
    const baseChipsPlayed = chips.every(({ guess, base }) => !base || !!guess);

    return (
      <Container
        innerRef={el => {
          this.containerEl = el;
        }}
      >
        {betOptions.map(({ guess, odds, players }) => (
          <Answer
            finalized={!!yourBets}
            nothingSelected={
              chips.filter(chip => chip.guess === guess).length > 0
            }
            chips={chips.filter(chip => chip.guess === guess)}
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
        <Footer>
          {yourBets ? (
            <div>
              <h3>Your bets have been submitted.</h3>
              <SecondaryText>
                Waiting for {makeList(awaitingBet.map(b => b.name))}&hellip;
              </SecondaryText>
            </div>
          ) : (
            <Button
              onClick={this.handleClickFinalize}
              disabled={!baseChipsPlayed}
            >
              Finalize Bets
            </Button>
          )}
        </Footer>
        <UnplayedChips>
          {unplayedChips.map(({id, amount, color}, index) => (
            <UnplayedDraggableChip
              key={id}
              chipId={id}
              amount={amount}
              color={color}
              style={{
                transform: `translateY(${-index * 15}px)`,
                zIndex: 50 - index
              }}
            />
          ))}
        </UnplayedChips>
        <ChipDragLayer />
      </Container>
    );
  }
}

export default BettingStage;
