import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Wordmark from "../svgs/Wordmark";
import SecondaryText from "./common/SecondaryText";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const WordmarkContainer = styled.div`
  width: ${({ mini }) => (mini ? "50%" : "80%")};
  max-width: ${({ mini }) => (mini ? "200px" : "336px")};
`;

const RoomCodeContainer = styled.div`
  text-align: center;
`;

const Code = styled.h1`
  margin-bottom: 0;
  line-height: 1em;
`;

const AppHeader = ({ roomCode }) => (
  <Header>
    <WordmarkContainer mini={!!roomCode}>
      <Wordmark />
    </WordmarkContainer>
    {roomCode && (
      <RoomCodeContainer>
        <SecondaryText>Game Code:</SecondaryText>
        <Code>{roomCode}</Code>
      </RoomCodeContainer>
    )}
  </Header>
);

AppHeader.propTypes = {
  roomCode: PropTypes.string
};

export default AppHeader;
