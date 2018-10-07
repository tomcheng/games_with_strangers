import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import chunk from "lodash/chunk";
import concat from "lodash/concat";
import flatten from "lodash/flatten";
import omit from "lodash/omit";
import values from "lodash/values";
import Bin from "./Bin";
import Sock from "./Sock";
import SuspendedModal from "./SuspendedModal";
import CorrectModal from "./CorrectModal";

const TIME_TO_SHOW_CORRECT_MODAL = 2000;

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
    showCorrectModal: false
  };

  componentDidUpdate(prevProps) {
    const { scores: prevScores } = prevProps.gameState;
    const { gameState, you } = this.props;

    if (prevScores[you.id] !== gameState.scores[you.id]) {
      this.setState({ showCorrectModal: true });
      setTimeout(() => {
        this.setState({ showCorrectModal: false });
      }, TIME_TO_SHOW_CORRECT_MODAL);
    }
  }

  handleClickSock = id => {
    this.props.onPlay({ type: "select_sock", payload: { sock_id: id } });
  };

  render() {
    const { gameState, you } = this.props;
    const { showCorrectModal } = this.state;

    const { socks, selected_socks, state, set_result } = gameState;

    const yourSelections = selected_socks[you.id];
    const otherSelections = flatten(
      concat(values(omit(selected_socks, you.id)))
    );
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
                        position={{ x: cellIndex, y: rowIndex }}
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
                        otherSelected={otherSelections.includes(id)}
                        onClick={() => {
                          this.handleClickSock(id);
                        }}
                      />
                    )
                  )}
                </Row>
              ))}
            </Rows>
          </Bin>
        </Container>
        <SuspendedModal open={isSuspended} />
        <CorrectModal open={showCorrectModal} />
      </Fragment>
    );
  }
}

export default Socks;
