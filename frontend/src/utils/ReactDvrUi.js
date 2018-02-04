import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  bottom: 15px;
  left: 15px;
  z-index: 999999;
  background-color: rgba(0, 0, 0, 0.8);
  border: 2px solid #000;
  padding: 12px 15px 15px;
  border-radius: 4px;
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  line-height: 24px;
  -webkit-font-smoothing: antialiased;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 5px;
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

  state = { name: "", isAdding: false, addError: null };

  handleClickAdd = () => {
    this.setState({ isAdding: true });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmitAdd = event => {
    event.preventDefault();

    const { states } = this.props;
    const name = this.state.name.trim();

    if (name === "") {
      this.setState({ addError: "Name is required" });
      return;
    }

    if (states.some(s => s.name === name)) {
      this.setState({ addError: "Name is already used" });
      return;
    }

    this.props.onAddState(name);
  };

  handleClickCancelAdd = () => {
    this.setState({ isAdding: false });
  };

  render() {
    const {
      isShowing,
      activeState,
      states,
      onSetActiveState,
      onRemoveState
    } = this.props;
    const { name, isAdding, addError } = this.state;

    if (!isShowing) {
      return <noscript />;
    }

    return (
      <Container>
        <Title>React DVR</Title>
        <div>
          <label>
            <input
              type="radio"
              checked={!activeState}
              onChange={() => {
                onSetActiveState(null);
              }}
            />{" "}
            Not using saved state
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
              {name}{" "}
              <span
                onClick={() => {
                  onRemoveState(name);
                }}
              >
                remove
              </span>
            </label>
          </div>
        ))}
        {isAdding ? (
          <form onSubmit={this.handleSubmitAdd}>
            <input
              type="text"
              name="name"
              placeholder="Name this State"
              value={name}
              onChange={this.handleChange}
            />
            {addError && <div>{addError}</div>}
            <button>Save Props</button>
            <button onClick={this.handleClickCancelAdd}>Cancel</button>
          </form>
        ) : (
          <button onClick={this.handleClickAdd} disabled={!!activeState}>
            Add State
          </button>
        )}
      </Container>
    );
  }
}

export default ReactDvrUi;
