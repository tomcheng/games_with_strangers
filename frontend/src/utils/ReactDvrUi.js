import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  bottom: 10px;
  left: 10px;
  z-index: 999999;
  background-color: rgba(0,0,0,0.8);
  border: 2px solid #000;
  padding: 15px;
  border-radius: 4px;
  color: #fff;
`;

class ReactDvrUi extends Component {
  static propTypes = {
    isShowing: PropTypes.bool.isRequired,
    isOverriding: PropTypes.bool.isRequired,
    states: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        props: PropTypes.object.isRequired
      })
    ).isRequired,
    onAddState: PropTypes.func.isRequired,
    onRemoveState: PropTypes.func.isRequired,
    onSetActiveState: PropTypes.func.isRequired,
    activeState: PropTypes.string
  };

  state = { name: "", isAdding: false };

  handleClickAdd = () => {
    this.setState({ isAdding: true });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.onAddState(this.state.name);
  };

  render() {
    const { isShowing, activeState, states, onSetActiveState, onRemoveState } = this.props;
    const { name, isAdding } = this.state;

    if (!isShowing) {
      return <noscript />;
    }

    return (
      <Container>
        <div>
          <label>
            <input
              type="radio"
              checked={!activeState}
              onChange={() => {
                onSetActiveState(null);
              }}
            />{" "}
            None
          </label>
        </div>
        {states.map(({ name }) => (
          <div key={name}>
            <label>
              <input
                type="radio"
                checked={activeState === name}
                onChange={() => {
                  onSetActiveState(name);
                }}
              />{" "}
              {name} <span onClick={() => { onRemoveState(name) }}>remove</span>
            </label>
          </div>
        ))}
        {isAdding ? (
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name this State"
              value={name}
              onChange={this.handleChange}
            />
            <button>Save Props</button>
          </form>
        ) : (
          <button onClick={this.handleClickAdd}>Add State</button>
        )}
      </Container>
    );
  }
}

export default ReactDvrUi;
