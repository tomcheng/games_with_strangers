import React from "react";
import styled from "styled-components";
import AppHeader from "./AppHeader";
import Lobby from "./Lobby";
import Room from "./Room";
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

const App = ({
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
}) => (
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
        />
      )}
    </Content>
  </Container>
);

export default App;
