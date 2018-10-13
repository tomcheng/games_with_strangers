import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import chunk from "lodash/chunk";
import values from "lodash/values";
import sum from "lodash/sum";
import Bin from "./Bin";
import Sock from "./Sock";
import SuspendedModal from "./SuspendedModal";
import EndModal from "./EndModal";
import CorrectSpeechBubble from "./CorrectSpeechBubble";

const Container = styled.div`
  background-color: #f7f7f7;
  color: #333;
  height: 100vh;
  overflow: auto;
  position: relative;
`;

const RoomCode = styled.div`
  position: absolute;
  right: 40px;
  top: 0;
  font-family: "Amatic SC", sans-serif;
  line-height: 30px;
  font-size: 20px;
  & strong {
    color: inherit;
    font-weight: 700;
  }
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
      selected_sock_ids: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string))
        .isRequired,
      state: PropTypes.string.isRequired,
      stage: PropTypes.oneOf(["guessing", "end"]).isRequired,
      set_result: PropTypes.shape({
        sock_ids: PropTypes.arrayOf(PropTypes.string).isRequired
      })
    }).isRequired,
    roomCode: PropTypes.string.isRequired,
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
    const { gameState, roomCode, you } = this.props;
    const { showCorrectBubble, lastCorrect } = this.state;

    const { socks, selected_sock_ids, state, set_result, stage, scores, players } = gameState;

    const yourSelections = selected_sock_ids[you.id];
    const isSuspended = state === "suspended";
    const isEnd = stage === "end";

    return (
      <Fragment>
        <Container>
          <Bin>
            <RoomCode>Room Code: <strong>{roomCode}</strong></RoomCode>
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
                            ? set_result.sock_ids.includes(id)
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
        <EndModal open={isEnd} scores={scores} players={players} />
        <CorrectSpeechBubble open={showCorrectBubble} onClose={this.handleCloseBubble} />
      </Fragment>
    );
  }
}

export default Socks;
