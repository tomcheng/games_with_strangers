import React, { Component } from "react";
import PropTypes from "prop-types";
import * as customTypes from "../../../utils/customTypes";
import styled from "styled-components";
import { DropTarget } from "react-dnd";
import { makeList } from "../../../utils/strings";
import SecondaryText from "../../common/SecondaryText";
import DraggableChip from "./DraggableChip";

const getTranslationStyle = ({ x, y }) => {
  const transform = `translate(${x}px, ${y}px)`;
  return { transform, WebkitTransform: transform };
};

const Container = styled.div`
  border: 2px solid #fff;
  border-radius: 6px;
  padding: 8px 12px;
  margin-bottom: 12px;
  opacity: ${({ committed, considering }) =>
    committed ? "1" : considering ? "0.7" : "0.4"};
  transition: opacity 0.15s ease-in-out;
`;

const Odds = styled(SecondaryText)`
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 12px;
  line-height: 16px;
  margin-bottom: 4px;
`;

const Number = styled.h1`
  margin-bottom: 4px;
  text-align: center;
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
    guess: PropTypes.number.isRequired,
    isOver: PropTypes.bool.isRequired,
    nothingSelected: PropTypes.bool.isRequired,
    odds: PropTypes.number.isRequired,
    players: customTypes.players.isRequired,
    onBet: PropTypes.func.isRequired,
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
      innerRef
    } = this.props;
    const selected = chips.length > 0;

    return connectDropTarget(
      <div ref={innerRef}>
        {chips.map(({ id, position, amount, color }) => (
          <StyledChip
            key={id}
            chipId={id}
            amount={amount}
            color={color}
            style={position ? getTranslationStyle(position) : null}
            isDraggable={!finalized}
          />
        ))}
        <Container
          key={guess}
          committed={selected || (!canDrop && nothingSelected)}
          considering={canDrop && isOver}
        >
          <Odds>Pays {odds} to 1</Odds>
          <Number>{guess}</Number>
          <SecondaryText>{makeList(players.map(p => p.name))}</SecondaryText>
        </Container>
      </div>
    );
  }
}

const answerSpec = {
  drop: (props, monitor) => {
    const { guess, onBet } = props;
    const { chipId } = monitor.getItem();
    const position = monitor.getSourceClientOffset();

    onBet({ guess, position, chipId });
  }
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
});

export default DropTarget("CHIP", answerSpec, collect)(Answer);
