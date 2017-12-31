import React, { Component } from "react";
import styled from "styled-components";
import AppHeader from "./AppHeader";
import Lobby from "./Lobby";
import Room from "./Room";
import FlashMessage from "./FlashMessage";
import "./App.css";

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 24px;
`;

const Content = styled.div`
  width: 100%;
  max-width: 800px;
`;

class App extends Component {
  state = { flashMessage: null };

  handleSetFlashMessage = flashMessage => {
    this.setState({ flashMessage });
  };

  handleClearFlashMessage = () => {
    this.setState({ flashMessage: null });
  };

  render() {
    const {
      previousRoomCode,
      roomJoined,
      roomCode,
      you,
      others,
      gameId,
      playersNeeded,
      gameState,
      onStartGame,
      onPlay,
      onCreateRoom,
      onJoinRoom
    } = this.props;
    const { flashMessage } = this.state;

    return (
      <Container>
        <Content>
          <AppHeader roomCode={roomCode} />
          {!roomCode && (
            <Lobby
              previousRoomCode={previousRoomCode}
              onCreateRoom={onCreateRoom}
              onJoinRoom={onJoinRoom}
            />
          )}
          {roomJoined && (
            <Room
              you={you}
              others={others}
              gameId={gameId}
              playersNeeded={playersNeeded}
              gameState={gameState}
              onStartGame={onStartGame}
              onPlay={onPlay}
              onSetFlashMessage={this.handleSetFlashMessage}
            />
          )}
        </Content>
        <FlashMessage
          message={flashMessage}
          onClear={this.handleClearFlashMessage}
        />
      </Container>
    );
  }
}

export default App;
