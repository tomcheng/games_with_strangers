/* global Rollbar */
import React, { Component } from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    message: PropTypes.string
  };

  static defaultProps = {
    message: "Something went wrong :("
  };

  state = { hasError: false };

  componentDidCatch(error) {
    Rollbar.error(error);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 40, textAlign: "center", fontSize: 16 }}>
          {this.props.message}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
