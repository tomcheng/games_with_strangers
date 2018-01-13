import YouBet from "./components/youBet/YouBet";
import FunPrompts from "./components/funPrompts/FunPrompts";

const gamesList = [
  {
    id: "fun_prompts",
    displayName: "Fun Prompts",
    description:
      "Write funny responses to prompts and vote on which responses you like best.",
    options: [
      {
        name: "rounds",
        options: [
          { value: 2, label: "2 Rounds" },
          { value: 3, label: "3 Rounds" },
          { value: 4, label: "4 Rounds" }
        ],
        defaultValue: 3
      }
    ],
    component: FunPrompts
  },
  {
    id: "you_bet",
    displayName: "You Bet",
    description: "Answer general trivia questions and wager on guesses.",
    options: [
      {
        name: "rounds",
        options: [
          { value: 3, label: "3 Rounds" },
          { value: 5, label: "5 Rounds" },
          { value: 7, label: "7 Rounds" }
        ],
        defaultValue: 7
      }
    ],
    component: YouBet
  }
];

export default gamesList;
