import React, { Component } from "react";
import PropTypes from "prop-types";
import * as customTypes from "../../utils/customTypes";
import styled from "styled-components";
import { DropTarget } from "react-dnd";
import { addCommas } from "../../utils/strings";
import SecondaryText from "../common/SecondaryText";
import Heading from "../common/Heading";
import Card from "../common/Card";
import Dot from "../common/Dot";
import DraggableChip from "./DraggableChip";

const getTranslationStyle = ({ x, y }) => {
  const transform = `translate(${x}px, ${y}px)`;
  return { transform, WebkitTransform: transform };
};

const Container = styled(Card)`
  opacity: ${({ committed, considering }) =>
    committed ? "1" : considering ? "0.7" : "0.4"};
  transition: opacity 0.15s ease-in-out;
  display: flex;
  align-items: stretch;
`;

const LeftSide = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Divider = styled.div`
  border-left: 1px solid rgba(255,255,255,0.5);
  margin: 0 12px;
`;

const Odds = styled(SecondaryText)`
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 12px;
  line-height: 16px;
  margin-bottom: 8px;
`;

const Entry = styled.span`
  margin-right: 10px;
`;

const StyledChip = styled(DraggableChip)`
  position: absolute;
  z-index: 1;
`;

class Answer extends Component {
  static propTypes = {
    canDrop: PropTypes.bool.isRequired,
    chips: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        position: PropTypes.shape({
          x: PropTypes.number.isRequired,
          y: PropTypes.number.isRequired
        })
      })
    ).isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    finalized: PropTypes.bool.isRequired,
    guess: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    isOver: PropTypes.bool.isRequired,
    nothingSelected: PropTypes.bool.isRequired,
    odds: PropTypes.number.isRequired,
    bets: PropTypes.arrayOf(
      PropTypes.shape({
        player: customTypes.player.isRequired,
        amount: PropTypes.number.isRequired
      })
    ).isRequired,
    onBet: PropTypes.func.isRequired,
    onCancelBet: PropTypes.func.isRequired,
    players: customTypes.players,
    innerRef: PropTypes.func
  };

  render() {
    const {
      finalized,
      guess,
      odds,
      players,
      connectDropTarget,
      nothingSelected,
      isOver,
      canDrop,
      chips,
      onCancelBet,
      bets,
      playerColors,
      innerRef
    } = this.props;
    const selected = chips.length > 0;

    return connectDropTarget(
      <div ref={innerRef}>
        {chips.map(({ id, position, amount, color, base }) => (
          <StyledChip
            key={id}
            chipId={id}
            amount={amount}
            color={color}
            base={base}
            style={position ? getTranslationStyle(position) : null}
            isDraggable={!finalized}
            onCancelBet={onCancelBet}
          />
        ))}
        <Container
          key={guess}
          committed={selected || (!canDrop && nothingSelected)}
          considering={canDrop && isOver}
          spaceBottom={0.5}
        >
          <LeftSide>
            <Odds>Pays {odds} to 1</Odds>
            <Heading center level={3} spaceBottom={0}>
              {guess === "less" ? "lower" : addCommas(guess)}
            </Heading>
          </LeftSide>
          <Divider />
          <div>
            {players && (
              <SecondaryText>
                {players.map(p => (
                  <Entry key={p.id}>
                    <Dot color={playerColors[p.id]} /> {p.name}
                  </Entry>
                ))}
              </SecondaryText>
            )}
            <SecondaryText>
              {bets.map(({ player, amount }) => (
                <Entry key={player.id}>
                  <Dot color={playerColors[player.id]} /> ${amount}
                </Entry>
              ))}
            </SecondaryText>
          </div>
        </Container>
      </div>
    );
  }
}

const answerSpec = {
  drop: (props, monitor) => {
    const { guess, onBet } = props;
    const { chipId, base } = monitor.getItem();
    const position = monitor.getSourceClientOffset();

    onBet({ guess, position, chipId, base });
  }
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
});

export default DropTarget("CHIP", answerSpec, collect)(Answer);
