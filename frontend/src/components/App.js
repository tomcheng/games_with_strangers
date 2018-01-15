import React from "react";
import styled from "styled-components";
import AppHeader from "./AppHeader";
import Home from "./Home";
import Room from "./Room";
import FlashMessage from "./FlashMessage";
import "./App.css";

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: ${props => props.theme.appPadding};
`;

const Content = styled.div`
  width: 100%;
  max-width: 800px;
`;

const App = ({
  flashMessage,
  gameId,
  gameState,
  others,
  playersNeeded,
  playersInGame,
  previousRoomCode,
  roomCode,
  roomJoined,
  you,
  onRestartGame,
  onStartGame,
  onPlay,
  onCreateRoom,
  onJoinRoom,
  onClearFlashMessage,
  onSetFlashMessage
}) => (
  <Container>
    <Content>
      <AppHeader roomCode={roomCode} />
      {!roomCode && (
        <Home
          previousRoomCode={previousRoomCode}
          onCreateRoom={onCreateRoom}
          onJoinRoom={onJoinRoom}
          onSetFlashMessage={onSetFlashMessage}
        />
      )}
      {roomJoined && (
        <Room
          gameId={gameId}
          gameState={gameState}
          others={others}
          playersNeeded={playersNeeded}
          playersInGame={playersInGame}
          you={you}
          onRestartGame={onRestartGame}
          onStartGame={onStartGame}
          onPlay={onPlay}
          onSetFlashMessage={onSetFlashMessage}
        />
      )}
    </Content>
    <FlashMessage message={flashMessage} onClear={onClearFlashMessage} />
  </Container>
);

export default App;
