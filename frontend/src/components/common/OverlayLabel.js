import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import DelayShow from "../common/DelayShow";

const Container = styled.div`
  position: relative;
`;

const LabelContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Label = styled.span`
  font-weight: 500;
  font-size: 36px;
  color: yellow;
  transform: rotate(-20deg);
  border: 4px solid yellow;
  padding: 10px;
  border-radius: 6px;
`;

class OverlayLabel extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    label: PropTypes.string
  };

  render() {
    const { children, label } = this.props;

    if (!label) {
      return children;
    }

    return (
      <Container>
        {children}
        <DelayShow delay={2000}>
          <LabelContainer>
            <Label>{label}</Label>
          </LabelContainer>
        </DelayShow>
      </Container>
    );
  }
}

export default OverlayLabel;
