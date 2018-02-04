import React, { Component } from "react";
import PropTypes from "prop-types";

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
    onSaveProps: PropTypes.func.isRequired,
    onSetActiveState: PropTypes.func.isRequired,
    activeState: PropTypes.string
  };

  state = { name: "" };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.onSaveProps({ name: this.state.name });
  };

  render() {
    const { isShowing, activeState, states, onSetActiveState } = this.props;
    const { name } = this.state;

    if (!isShowing) {
      return <noscript />;
    }

    return (
      <div>
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
              {name}
            </label>
          </div>
        ))}
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
          />
          <button>Save Props</button>
        </form>
      </div>
    );
  }
}

export default ReactDvrUi;
