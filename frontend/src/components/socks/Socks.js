import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import chunk from "lodash/chunk";
import values from "lodash/values";
import sum from "lodash/sum";
import Bin from "./Bin";
import Sock from "./Sock";
import SuspendedModal from "./SuspendedModal";
import CorrectSpeechBubble from "./CorrectSpeechBubble";

const Container = styled.div`
  background-color: #f7f7f7;
  color: #333;
  height: 100vh;
  overflow: auto;
  position: relative;
`;

const Rows = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: space-around;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

class Socks extends Component {
  static propTypes = {
    gameState: PropTypes.shape({
      scores: PropTypes.objectOf(PropTypes.number).isRequired,
      socks: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          color: PropTypes.number.isRequired,
          length: PropTypes.number.isRequired,
          pattern: PropTypes.number.isRequired,
          smell: PropTypes.number.isRequired
        })
      ).isRequired,
      selected_socks: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string))
        .isRequired,
      state: PropTypes.string.isRequired,
      set_result: PropTypes.shape({
        socks: PropTypes.arrayOf(PropTypes.string).isRequired
      })
    }).isRequired,
    playerColors: PropTypes.objectOf(PropTypes.string).isRequired,
    you: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired,
    onPlay: PropTypes.func.isRequired
  };

  state = {
    showCorrectBubble: false,
    lastCorrect: null
  };

  static getDerivedStateFromProps(props, state) {
    const { gameState, you } = props;
    const { scores: newScores } = gameState;
    const { scores: currentScores } = state;

    if (!currentScores) {
      return { scores: newScores };
    }

    if (currentScores[you.id] !== newScores[you.id]) {
      return { scores: newScores, showCorrectBubble: true, lastCorrect: "you" };
    }

    if (sum(values(currentScores)) !== sum(values(newScores))) {
      return { scores: newScores, lastCorrect: "other" };
    }

    return null;
  }

  handleClickSock = id => {
    this.props.onPlay({ type: "select_sock", payload: { sock_id: id } });
  };

  handleCloseBubble = () => {
    this.setState({ showCorrectBubble: false });
  };

  render() {
    const { gameState, you } = this.props;
    const { showCorrectBubble, lastCorrect } = this.state;

    const { socks, selected_socks, state, set_result } = gameState;

    const yourSelections = selected_socks[you.id];
    const isSuspended = state === "suspended";

    return (
      <Fragment>
        <Container>
          <Bin>
            <Rows>
              {chunk(socks, 3).map((group, rowIndex) => (
                <Row key={rowIndex}>
                  {group.map(
                    ({ id, color, length, pattern, smell }, cellIndex) => (
                      <Sock
                        key={cellIndex}
                        positionX={cellIndex}
                        positionY={rowIndex}
                        id={id}
                        color={color}
                        length={length}
                        pattern={pattern}
                        smell={smell}
                        youSelected={
                          isSuspended
                            ? set_result.socks.includes(id)
                            : yourSelections.includes(id)
                        }
                        lastCorrect={lastCorrect}
                        onClick={this.handleClickSock}
                      />
                    )
                  )}
                </Row>
              ))}
            </Rows>
          </Bin>
        </Container>
        <SuspendedModal open={isSuspended} />
        <CorrectSpeechBubble open={showCorrectBubble} onClose={this.handleCloseBubble} />
      </Fragment>
    );
  }
}

export default Socks;
