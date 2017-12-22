import React from "react";
import PropTypes from "prop-types";

const YouBet = ({ state }) => {
  const { round } = state;

  return (
    <div>
      <div>Round: {round}</div>
    </div>
  );
};

YouBet.propsTypes = {
  state: PropTypes.shape({
    round: PropTypes.number.isRequired
  }).isRequired
};

export default YouBet;
