import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import chunk from "lodash/chunk";
import flow from "lodash/flow";
import keys from "lodash/keys";
import omit from "lodash/omit";
import sortBy from "lodash/sortBy";
import sum from "lodash/sum";
import values from "lodash/values";
import Bin from "./Bin";
import Sock from "./Sock";
import SuspendedModal from "./SuspendedModal";
import EndModal from "./EndModal";
import CorrectBubble from "./CorrectBubble";
import OtherCorrectBubble from "./OtherCorrectBubble";
import NewPlayerBubble from "./NewPlayerBubble";

const Container = styled.div`
  background-color: #f7f7f7;
  color: #333;
  height: 100vh;
  overflow: auto;
  position: relative;
  font-family: "Amatic SC", sans-serif;
  font-size: 22px;
  line-height: 30px;

  & strong {
    color: #222;
    font-weight: 700;
  }
`;

const RoomCode = styled.div`
  position: absolute;
  right: 35px;
  top: 0;
  z-index: -1;
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

const Scores = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 35px;
  right: 35px;
  z-index: -1;
`;

const ScoresInner = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Score = styled.div`
  display: inline;

  &:not(:first-child) {
    margin-left: 10px;
  }
`;

class Socks extends Component {
  static propTypes = {
    gameState: PropTypes.shape({
      players: PropTypes.objectOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired
        })
      ).isRequired,
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
    showOtherCorrectBubble: false,
    showNewPlayerBubble: false,
    lastCorrect: null,
    newPlayerName: null,
    otherCorrectPlayerName: null
  };

  static getDerivedStateFromProps(props, state) {
    const { gameState, you } = props;
    const { scores: newScores, players: newPlayers } = gameState;
    const { scores: currentScores, players: currentPlayers } = state;

    if (!currentScores || !currentPlayers) {
      return { scores: newScores, players: newPlayers };
    }

    if (currentScores[you.id] !== newScores[you.id]) {
      return { scores: newScores, showCorrectBubble: true, lastCorrect: "you" };
    }

    if (sum(values(currentScores)) !== sum(values(newScores))) {
      const correctPlayerId = keys(currentScores).find(
        key => newScores[key] > currentScores[key]
      );
      return {
        scores: newScores,
        lastCorrect: "other",
        showOtherCorrectBubble: true,
        otherCorrectPlayerName: newPlayers[correctPlayerId].name
      };
    }

    if (values(newPlayers).length === values(currentPlayers).length + 1) {
      const newPlayer = values(omit(newPlayers, keys(currentPlayers)))[0];
      return {
        players: newPlayers,
        scores: newScores,
        newPlayerName: newPlayer.name,
        showNewPlayerBubble: true
      };
    }

    return null;
  }

  handleClickSock = id => {
    this.props.onPlay({ type: "select_sock", payload: { sock_id: id } });
  };

  handleCloseCorrectBubble = () => {
    this.setState({ showCorrectBubble: false });
  };

  handleCloseOtherCorrectBubble = () => {
    this.setState({ showOtherCorrectBubble: false });
  };

  handleCloseNewPlayerBubble = () => {
    this.setState({ showNewPlayerBubble: false });
  };

  render() {
    const { gameState, roomCode, you } = this.props;
    const {
      showCorrectBubble,
      showNewPlayerBubble,
      showOtherCorrectBubble,
      otherCorrectPlayerName,
      lastCorrect,
      newPlayerName
    } = this.state;
    const {
      socks,
      selected_sock_ids,
      state,
      set_result,
      stage,
      scores,
      players
    } = gameState;
    const scoreList = flow([
      values,
      ps =>
        ps.map(player => ({
          ...player,
          score: scores[player.id]
        })),
      ps => sortBy(ps, "name"),
      ps => sortBy(ps, p => -p.score),
      ps => sortBy(ps, p => (p.id === you.id ? 0 : 1))
    ])(players);
    const yourSelections = selected_sock_ids[you.id];
    const isSuspended = state === "suspended";
    const isEnd = stage === "end";

    return (
      <Fragment>
        <Container>
          <Bin>
            <RoomCode>
              Room: <strong>{roomCode}</strong>
            </RoomCode>
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
            <Scores>
              <ScoresInner>
                {scoreList.map(({ name, id, score }) => (
                  <Score key={id}>
                    {name}: <strong>{score}</strong>
                  </Score>
                ))}
              </ScoresInner>
            </Scores>
          </Bin>
        </Container>
        <SuspendedModal open={isSuspended} />
        <EndModal open={isEnd} scores={scores} players={players} />
        <OtherCorrectBubble
          open={showOtherCorrectBubble}
          playerName={otherCorrectPlayerName}
          onClose={this.handleCloseOtherCorrectBubble}
        />
        <CorrectBubble
          open={showCorrectBubble}
          onClose={this.handleCloseCorrectBubble}
        />
        <NewPlayerBubble
          open={showNewPlayerBubble}
          playerName={newPlayerName}
          onClose={this.handleCloseNewPlayerBubble}
        />
      </Fragment>
    );
  }
}

export default Socks;
