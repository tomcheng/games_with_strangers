import React, { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Transition, Spring, config } from "react-spring";

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const Background = styled.div`
  background-color: #fff;
  position: absolute;
  opacity: 0.8;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;
const Content = styled.div`
  color: #333;
  position: relative;
  z-index: 1;
  padding: 0 30px;
`;

const Title = styled.div`
  font-family: "Amatic SC", sans-serif;
  font-size: 42px;
  font-weight: 700;
  line-height: 48px;
  margin-bottom: 12px;
`;

const Body = styled.div`
  font-family: "Amatic SC", sans-serif;
  font-size: 36px;
  font-weight: 400;
  line-height: 40px;
`;

class Modal extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    open: PropTypes.bool.isRequired
  };

  el = document.createElement("div");

  componentDidMount() {
    document.body.appendChild(this.el);
  }

  componentWillUnmount() {
    document.body.removeChild(this.el);
  }

  render() {
    const { title, children, open } = this.props;

    return createPortal(
      <Transition
        from={{ opacity: 0 }}
        enter={{ opacity: 1 }}
        leave={{ opacity: 0 }}
        config={config.stiff}
      >
        {open &&
          (containerStyle => (
            <Container style={containerStyle}>
              <Background />
              <Content>
                <Spring
                  from={{
                    opacity: 0,
                    transform: "translate3d(0, -30px, 0)"
                  }}
                  to={{
                    opacity: 1,
                    transform: "translate3d(0, 0, 0)"
                  }}
                  delay={600}
                  config={config.stiff}
                >
                  {style => <Title style={style}>{title}</Title>}
                </Spring>
                <Spring from={{ opacity: 0 }} to={{ opacity: 1 }} delay={1500}>
                  {bodyStyle => <Body style={bodyStyle}>{children}</Body>}
                </Spring>
              </Content>
            </Container>
          ))}
      </Transition>,
      this.el
    );
  }
}

export default Modal;
