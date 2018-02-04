import React, { Component } from "react";
import PropTypes from "prop-types";

class AddStateForm extends Component {
  static propTypes = {
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  state = { name: "", error: null };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { onSubmit } = this.props;
    const name = this.state.name.trim();

    console.log("on submit");

    if (name === "") {
      this.setState({ error: "Name is required" });
      return;
    }

    onSubmit({
      name,
      onError: ({ message }) => {
        this.setState({ error: message });
      }
    });
  };

  render() {
    const { onCancel } = this.props;
    const { name, error } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name this State"
          value={name}
          onChange={this.handleChange}
        />
        {error && <div>{error}</div>}
        <button>Save Props</button>
        <button onClick={onCancel}>Cancel</button>
      </form>
    );
  }
}

export default AddStateForm;
