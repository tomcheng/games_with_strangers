import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  transition: opacity 0.1s ease-in-out;
`;

class DelayShow extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    delay: PropTypes.number.isRequired,
    style: PropTypes.object
  };

  state = { show: false };

  componentDidMount() {
    const { delay } = this.props;

    this.timer = setTimeout(() => {
      this.setState({ show: true });
    }, delay);
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  render() {
    const { children, style } = this.props;
    const { show } = this.state;

    return (
      <Container style={{ ...style, opacity: show ? 1 : 0 }}>
        {children}
      </Container>
    );
  }
}

export default DelayShow;
