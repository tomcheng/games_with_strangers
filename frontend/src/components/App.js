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
  roomReady,
  roomCode,
  you,
  others,
  game,
  playersNeeded,
  gameState,
  onStartGame,
  onPlay,
  onCreateRoom,
  onJoinRoom
}) => (
  <Container>
    <Content>
      <AppHeader />
      {roomReady ? (
        <Room
          roomCode={roomCode}
          you={you}
          others={others}
          game={game}
          playersNeeded={playersNeeded}
          gameState={gameState}
          onStartGame={onStartGame}
          onPlay={onPlay}
        />
      ) : (
        <Lobby
          previousRoomCode={previousRoomCode}
          onCreateRoom={onCreateRoom}
          onJoinRoom={onJoinRoom}
        />
      )}
    </Content>
  </Container>
);

export default App;
