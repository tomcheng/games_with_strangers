import React from "react";
import styled from "styled-components";
import Spacing from "./Spacing";
import Divider from "./Divider";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Rule = styled(Divider)`
  flex-grow: 1;
`;

const Text = styled.div`
  padding: 0 8px;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 12px;
`;

const SectionHeader = ({ children }) => (
  <Spacing spaceBottom={2}>
    {({ spacingStyle }) => (
      <Container style={spacingStyle}>
        <Rule spaceBottom={0} spaceTop={0} />
        <Text>{children}</Text>
        <Rule spaceBottom={0} spaceTop={0} />
      </Container>
    )}
  </Spacing>
);

export default SectionHeader;
