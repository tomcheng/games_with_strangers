import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { DropTarget } from "react-dnd";
import { makeList } from "../../../utils/strings";
import SecondaryText from "../../common/SecondaryText";

const Container = styled.div`
  border: 2px solid #fff;
  border-radius: 6px;
  padding: 8px 12px;
  margin-bottom: 12px;
  opacity: ${({ committed, considering }) => (committed ? "1" : considering ? "0.7" : "0.5")};
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

class Answer extends Component {
  static propTypes = {
    canDrop: PropTypes.bool.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    guess: PropTypes.number.isRequired,
    isOver: PropTypes.bool.isRequired,
    odds: PropTypes.number.isRequired,
    players: PropTypes.arrayOf(PropTypes.string).isRequired,
    selected: PropTypes.bool.isRequired,
    onBet: PropTypes.func.isRequired
  };

  render() {
    const {
      guess,
      odds,
      players,
      connectDropTarget,
      selected,
      isOver,
      canDrop
    } = this.props;

    return connectDropTarget(
      <div>
        <Container key={guess} committed={selected} considering={canDrop && isOver}>
          <Odds>Pays {odds} to 1</Odds>
          <Number>{guess}</Number>
          <SecondaryText>{makeList(players)}</SecondaryText>
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
