import YouBet from "./components/games/youBet/YouBet";
import FunPrompts from "./components/games/funPrompts/FunPrompts";

const gamesList = [
  {
    id: "you_bet",
    displayName: "You Bet",
    description: "Answer general trivia questions and wager on guesses.",
    component: YouBet
  },
  {
    id: "fun_prompts",
    displayName: "Fun Prompts",
    description: "Write funny responses to prompts and vote on which responses you like best.",
    component: FunPrompts
  }
];

export default gamesList;
