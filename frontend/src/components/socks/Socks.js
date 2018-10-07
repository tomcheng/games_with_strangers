import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import chunk from "lodash/chunk";
import concat from "lodash/concat";
import flatten from "lodash/flatten";
import omit from "lodash/omit";
import values from "lodash/values";
import Bin from "./Bin";
import Sock from "./Sock";

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
        .isRequired
    }).isRequired,
    playerColors: PropTypes.objectOf(PropTypes.string).isRequired,
    you: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired,
    onPlay: PropTypes.func.isRequired
  };

  handleClickSock = id => {
    this.props.onPlay({ type: "select_sock", payload: { sock_id: id } });
  };

  render() {
    const { gameState, you } = this.props;
    const { socks, selected_socks } = gameState;
    const yourSelections = selected_socks[you.id];
    const otherSelections = flatten(
      concat(values(omit(selected_socks, you.id)))
    );

    return (
      <Container>
        <Bin>
          <Rows>
            {chunk(socks, 3).map((group, rowIndex) => (
              <Row key={rowIndex}>
                {group.map(
                  ({ id, color, length, pattern, smell }, cellIndex) => (
                    <Sock
                      key={id}
                      position={{ x: cellIndex, y: rowIndex }}
                      onClick={() => {
                        this.handleClickSock(id);
                      }}
                      color={color}
                      length={length}
                      pattern={pattern}
                      smell={smell}
                      youSelected={yourSelections.includes(id)}
                      otherSelected={otherSelections.includes(id)}
                    />
                  )
                )}
              </Row>
            ))}
          </Rows>
        </Bin>
      </Container>
    );
  }
}

export default Socks;
