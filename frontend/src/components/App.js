import React from "react";
import styled from "styled-components";
import AppHeader from "./AppHeader";
import Lobby from "./Lobby";
import Room from "./Room";
import "./App.css";

const Container = styled.div`
  padding: 40px 50px;
`;

const App = ({
  roomReady,
  roomCode,
  you,
  others,
  game,
  playersNeeded,
  gameState,
  onSelectGame,
  onStartGame,
  onPlay,
  onCreateRoom,
  onJoinRoom
}) => (
  <Container>
    <AppHeader />
    {roomReady ? (
      <Room
        roomCode={roomCode}
        you={you}
        others={others}
        game={game}
        playersNeeded={playersNeeded}
        gameState={gameState}
        onSelectGame={onSelectGame}
        onStartGame={onStartGame}
        onPlay={onPlay}
      />
    ) : (
      <Lobby onCreateRoom={onCreateRoom} onJoinRoom={onJoinRoom} />
    )}
  </Container>
);

export default App;
