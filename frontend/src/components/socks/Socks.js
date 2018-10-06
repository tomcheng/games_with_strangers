import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import chunk from "lodash/chunk";
import concat from "lodash/concat";
import flatten from "lodash/flatten";
import omit from "lodash/omit";
import values from "lodash/values";
import FullHeightContainer from "../common/FullHeightContainer";
import Sock from "./Sock";

const Container = styled(FullHeightContainer)`
  background-color: #fff;
  color: #333;
  padding: 24px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  & + & {
    margin-top: 12px;
  }
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

  render() {
    const { onPlay, gameState, you } = this.props;
    const { socks, selected_socks } = gameState;
    const yourSelections = selected_socks[you.id];
    const otherSelections = flatten(
      concat(values(omit(selected_socks, you.id)))
    );

    return (
      <Container>
        {chunk(socks, 3).map((group, index) => (
          <Row key={index}>
            {group.map(({ id, color, length, pattern, smell }) => (
              <Sock
                key={id}
                onClick={() => {
                  onPlay({ type: "select_sock", payload: { sock_id: id } });
                }}
                color={color}
                length={length}
                pattern={pattern}
                smell={smell}
                youSelected={yourSelections.includes(id)}
                otherSelected={otherSelections.includes(id)}
              />
            ))}
          </Row>
        ))}
      </Container>
    );
  }
}

export default Socks;
