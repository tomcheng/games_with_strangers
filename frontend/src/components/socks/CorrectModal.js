import React, { Component } from "react";
import Modal from "./Modal";
import PropTypes from "prop-types";

class CorrectModal extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired
  };

  render() {
    return (
      <Modal open={this.props.open} title="Good Job!">
        You did a good job.
      </Modal>
    );
  }
}

export default CorrectModal;
