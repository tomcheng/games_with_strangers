import React from "react";
import PropTypes from "prop-types";

const SuspendedModal = ({ open }) => <div>{open && "WRONG!"}</div>;

SuspendedModal.propTypes = {
  open: PropTypes.bool.isRequired
};

export default SuspendedModal;
