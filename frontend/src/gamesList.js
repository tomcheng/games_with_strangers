import React from "react";
import YouBet from "./components/games/youBet/YouBet";
import FunPrompts from "./components/games/funPrompts/FunPrompts";

const gamesList = [
  {
    id: "you_bet",
    displayName: "You Bet",
    description: "Answer general trivia questions and wager on guesses.",
    playerRequirements: <span>Players: 3&ndash;7</span>,
    component: YouBet
  },
  {
    id: "fun_prompts",
    displayName: "Fun Prompts",
    description: "Write funny responses to prompts and vote on which responses you like best.",
    playerRequirements: <span>Players: 4&ndash;8</span>,
    component: FunPrompts
  }
];

export default gamesList;
