import React from "react";
import PropTypes from "prop-types";
import SpeechBubble from "./SpeechBubble";

const NewPlayerBubble = ({ open, playerName, onClose }) => (
  <SpeechBubble
    open={open}
    text={`${playerName} joined`}
    onClose={onClose}
  />
);

NewPlayerBubble.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  playerName: PropTypes.string
};

export default NewPlayerBubble;
