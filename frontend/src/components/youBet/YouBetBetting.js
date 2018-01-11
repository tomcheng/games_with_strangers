import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import uniq from "lodash/uniq";
import map from "lodash/map";
import * as customTypes from "../../utils/customTypes";
import styled from "styled-components";
import { makeList } from "../../utils/strings";
import Button from "../common/Button";
import SecondaryText from "../common/SecondaryText";
import Heading from "../common/Heading";
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
  right: -24px;
`;

const UnplayedDraggableChip = styled(DraggableChip)`
  position: absolute;
  bottom: 0;
  right: 0;
  transition: transform 0.2s ease-in-out;
`;

export const gatherChips = chips => {
  const gathered = chips.filter(chip => chip.guess !== null).reduce(
    (acc, { guess, base, amount }) => ({
      ...acc,
      [guess]: {
        base_wager:
          (acc[guess] ? acc[guess].base_wager : 0) + (base ? amount : 0),
        extra_wager:
          (acc[guess] ? acc[guess].extra_wager : 0) + (base ? 0 : amount)
      }
    }),
    {}
  );

  return map(gathered, (value, key) => ({
    base_wager: value.base_wager,
    extra_wager: value.extra_wager,
    guess: parseInt(key, 10)
  }));
};

class YouBetBetting extends Component {
  static propTypes = {
    awaitingBet: customTypes.players.isRequired,
    betOptions: PropTypes.arrayOf(
      PropTypes.shape({
        guess: PropTypes.number.isRequired,
        odds: PropTypes.number.isRequired,
        players: customTypes.players.isRequired,
        bets: PropTypes.number.isRequired
      })
    ).isRequired,
    yourBet: PropTypes.arrayOf(
      PropTypes.shape({
        guess: PropTypes.number.isRequired
      })
    ),
    yourScore: PropTypes.number.isRequired,
    onBet: PropTypes.func.isRequired,
    onFinalizeBets: PropTypes.func.isRequired,
    onSetFlashMessage: PropTypes.func.isRequired
  };

  constructor(props) {
    super();

    const { yourBets, yourScore } = props;

    // TODO: initialize bets properly with base_wager and extra_wager
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
      {
        id: 1,
        amount: 100,
        color: "black",
        base: true,
        guess: null,
        position: null
      },
      {
        id: 2,
        amount: 100,
        color: "black",
        base: true,
        guess: null,
        position: null
      }
    ];
    let id = 3;
    let remaining = score - 200;

    while (remaining >= 2500 && score >= 5200) {
      chips.push({
        id,
        amount: 2500,
        color: "green",
        base: false,
        guess: null,
        position: null
      });
      id += 1;
      remaining -= 2500;
    }

    while (remaining >= 500 && score >= 1200) {
      chips.push({
        id,
        amount: 500,
        color: "red",
        base: false,
        guess: null,
        position: null
      });
      id += 1;
      remaining -= 500;
    }

    while (remaining >= 100) {
      chips.push({
        id,
        amount: 100,
        color: "white",
        base: false,
        guess: null,
        position: null
      });
      id += 1;
      remaining -= 100;
    }

    return chips;
  };

  answerEls = {};

  handleBet = ({ guess, position: fixedPosition, chipId, base }) => {
    const { onSetFlashMessage, onBet } = this.props;
    const { chips } = this.state;
    const { x: containerX, y: containerY } = this.answerEls[
      guess
    ].getBoundingClientRect();
    const position = {
      x: fixedPosition.x - containerX,
      y: fixedPosition.y - containerY
    };

    if (!base && chips.filter(chip => chip.guess === guess).length === 0) {
      onSetFlashMessage("Can only add where black chips are placed.");
      return;
    }

    const newChip = { ...chips.find(c => c.id === chipId), guess, position };
    const newChips = chips.filter(chip => chip.id !== chipId).concat(newChip);

    this.setState({ chips: newChips });

    this.cleanUpChips({
      callback: () => {
        const { chips } = this.state;
        onBet(gatherChips(chips));
      }
    });
  };

  handleCancelBet = ({ chipId, base }) => {
    if (!base) {
      this.moveChipBack(chipId);
    }
  };

  handleClickFinalize = () => {
    const { onFinalizeBets } = this.props;
    const { chips } = this.state;

    onFinalizeBets(gatherChips(chips));
  };

  moveChipBack = chipId => {
    const { chips } = this.state;
    const newChips = chips.map(
      chip =>
        chip.id === chipId ? { ...chip, guess: null, position: null } : chip
    );
    this.setState({ chips: newChips });
  };

  cleanUpChips = ({ callback }) => {
    this.setState(state => {
      const { chips } = this.state;
      const validGuesses = uniq(
        chips.filter(chip => chip.base && !!chip.guess).map(chip => chip.guess)
      );
      const newChips = chips.map(
        chip =>
          chip.guess && !validGuesses.includes(chip.guess)
            ? { ...chip, guess: null, position: null }
            : chip
      );

      return { ...state, chips: newChips };
    }, callback);
  };

  render() {
    const { betOptions, yourBets, awaitingBet } = this.props;
    const { chips } = this.state;
    const unplayedChips = chips.filter(({ guess }) => !guess);
    const baseChipsPlayed = chips.every(({ guess, base }) => !base || !!guess);

    return (
      <Container>
        {betOptions.map(({ guess, odds, players, bets }) => (
          <Answer
            innerRef={el => {
              this.answerEls[guess] = el;
            }}
            finalized={!!yourBets}
            nothingSelected={
              chips.filter(chip => chip.guess === guess).length > 0
            }
            chips={chips.filter(chip => chip.guess === guess)}
            key={guess}
            guess={guess}
            odds={odds}
            players={players}
            totalBets={bets}
            onBet={this.handleBet}
            onCancelBet={this.handleCancelBet}
          />
        ))}
        {yourBets ? (
          <Fragment>
            <Heading level={3} center spaceTop={3}>
              Your bets have been submitted.
            </Heading>
            <SecondaryText center>
              Waiting for {makeList(awaitingBet.map(b => b.name))}&hellip;
            </SecondaryText>
          </Fragment>
        ) : (
          <Button
            onClick={this.handleClickFinalize}
            disabled={!baseChipsPlayed}
            spaceTop={3}
            center
          >
            Finalize Bets
          </Button>
        )}
        <UnplayedChips>
          {unplayedChips.map(({ id, amount, color, base }, index) => (
            <UnplayedDraggableChip
              key={id}
              chipId={id}
              amount={amount}
              color={color}
              base={base}
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

export default YouBetBetting;
