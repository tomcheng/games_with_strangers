import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import FullHeightContainer from "../common/FullHeightContainer";

const Container = styled(FullHeightContainer)`
  background-color: #fff;
  color: #333;
`;

class Socks extends Component {
  static propTypes = {
    gameState: PropTypes.shape({
      socks: PropTypes.arrayOf(
        PropTypes.shape({
          color: PropTypes.number.isRequired,
          length: PropTypes.number.isRequired,
          pattern: PropTypes.number.isRequired,
          smell: PropTypes.number.isRequired
        })
      ).isRequired
    }).isRequired
  };

  render() {
    const { socks } = this.props.gameState;

    return (
      <Container>
        {socks.map(({ color, length, pattern, smell }) => (
          <div key={`${color}${length}${pattern}${smell}`}>
            {color} {length} {pattern} {smell}
          </div>
        ))}
      </Container>
    );
  }
}

export default Socks;
