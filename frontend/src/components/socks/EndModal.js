import React, { Component } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import sortBy from "lodash/sortBy";
import values from "lodash/values";
import PropTypes from "prop-types";

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

class EndModal extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    players: PropTypes.objectOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired
      })
    ).isRequired,
    scores: PropTypes.objectOf(PropTypes.number).isRequired
  };

  render() {
    const { scores, players: playersObj } = this.props;
    const players = sortBy(
      values(playersObj).map(player => ({
        ...player,
        score: scores[player.id]
      })),
      "score"
    ).reverse();
    return (
      <Modal open={this.props.open} title="Game Over">
        {players.map(({ id, name, score }) => (
          <Row key={id}>
            <span>{name}</span>
            <span>{score}</span>
          </Row>
        ))}
      </Modal>
    );
  }
}

export default EndModal;
