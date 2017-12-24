import React from "react";
import styled from "styled-components";
import Wordmark from "../svgs/Wordmark";

const Header = styled.div`
  margin-bottom: 40px;
`;
const TitleContainer = styled.div`
  width: 80%;
  max-width: 336px;
`;

const AppHeader = () => <Header>
  <TitleContainer>
    <Wordmark />
  </TitleContainer>
</Header>;

export default AppHeader;