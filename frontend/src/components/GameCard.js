import React from "react";

const GameCard = ({ title, description, playerRequirements, onSelect }) => (
  <div>
    <div>{title}</div>
    <div>{description}</div>
    <div>{playerRequirements}</div>
    <button onClick={onSelect}>Play Now</button>
  </div>
);

export default GameCard;
