import React from "react";
import YouBet from "./components/games/youBet/YouBet";

const gamesList = [
  {
    id: "you_bet",
    displayName: "You Bet",
    description: "Answer general trivia questions and wager on guesses.",
    playerRequirements: <span>Players: 4&ndash;20</span>,
    component: YouBet
  }
];

export default gamesList;
