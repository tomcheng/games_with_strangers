import React from "react";
import PropTypes from "prop-types";
import SpeechBubble from "./SpeechBubble";

const NewPlayerBubble = ({ open, newPlayerName, onClose }) => (
  <SpeechBubble
    open={open}
    text={`${newPlayerName} joined`}
    onClose={onClose}
  />
);

NewPlayerBubble.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  newPlayerName: PropTypes.string
};

export default NewPlayerBubble;
