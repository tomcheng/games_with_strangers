import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const Rule = styled.div`
  flex-grow: 1;
  border-top: 1px solid rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const Text = styled.div`
  padding: 0 8px;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 12px;
`;

const SectionHeader = ({ children }) => (
  <Container>
    <Rule />
    <Text>{children}</Text>
    <Rule />
  </Container>
);

export default SectionHeader;
