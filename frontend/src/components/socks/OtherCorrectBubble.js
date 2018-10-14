import React from "react";
import PropTypes from "prop-types";
import SpeechBubble from "./SpeechBubble";

const OtherCorrectBubble = ({ open, playerName, onClose }) => (
  <SpeechBubble
    open={open}
    text={`${playerName} got a match`}
    onClose={onClose}
  />
);

OtherCorrectBubble.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  playerName: PropTypes.string
};

export default OtherCorrectBubble;
