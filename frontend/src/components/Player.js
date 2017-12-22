import React from "react";
import PropTypes from "prop-types";

const Player = ({ player }) => <div>{player.name}{player.isModerator && " (moderator)"}</div>;

Player.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
    isModerator: PropTypes.bool.isRequired
  }).isRequired
};

export default Player;
