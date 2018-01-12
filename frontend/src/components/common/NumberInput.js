import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { addCommas } from "../../utils/strings";
import Spacing from "./Spacing";
import StyledInput from "./StyledInput";

const Container = styled.div`
  position: relative;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const TransparentInput = styled(StyledInput)`
  color: transparent;
  caret-color: #fff;
  background-color: transparent;
  border-color: transparent;
  font-size: 27px;
  ::placeholder {
    color: transparent;
  }
`;

class NumberInput extends Component {
  static propTypes = {
    hasError: PropTypes.bool,
    spaceBottom: PropTypes.number,
    spaceTop: PropTypes.number
  };

  state = { focused: false };

  handleFocus = () => {
    this.setState({ focused: true });
  };

  handleBlur = () => {
    this.setState({ focused: false });
  };

  render() {
    const { spaceTop, spaceBottom, value, ...other } = this.props;
    const { focused } = this.state;

    return (
      <Spacing spaceBottom={spaceBottom} spaceTop={spaceTop}>
        {({ spacingStyle }) => (
          <Container style={spacingStyle}>
            <StyledInput
              {...other}
              value={addCommas(value)}
              focused={focused}
              type="text"
              autoComplete="off"
            />
            <Overlay>
              <TransparentInput
                {...other}
                value={value}
                type="number"
                autoComplete="off"
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
              />
            </Overlay>
          </Container>
        )}
      </Spacing>
    );
  }
}

export default NumberInput;
