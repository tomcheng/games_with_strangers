import React, { Component } from "react";
import Modal from "./Modal";
import PropTypes from "prop-types";

class SuspendedModal extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired
  };

  render() {
    return (
      <Modal open={this.props.open} title="Wrong!">
        You're on a time-out for 7&nbsp;seconds.
      </Modal>
    );
  }
}

export default SuspendedModal;
