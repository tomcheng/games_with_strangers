import React from "react";
import styled from "styled-components";
import Wordmark from "../svgs/Wordmark";

const Header = styled.div`
  margin-bottom: 40px;
`;

const AppHeader = () => <Header><Wordmark /></Header>;

export default AppHeader;