const players = [
  { id: "1", name: "Timmy Tanker" },
  { id: "2", name: "Billy Jean" },
  { id: "3", name: "Charlie Chapman" },
  { id: "4", name: "Rick Sanchez" },
  { id: "5", name: "Earnest Hemingway" }
];
const you = players[0];
const others = players.slice(1);
const nonGameState = {
  you,
  others,
  roomCode: "FOOB",
  roomJoined: true,
  yourId: "1",
  gameId: "you_bet",
  playersNeeded: 3
};
const defaultGameState = {
  you,
  others,
  round: 1,
  question: "What percentage of US house holds own a dog?",
  scores: { "1": 200, "2": 200, "3": 200, "4": 200, "5": 200 }
};

export const GUESSING_STATE = {
  ...nonGameState,
  gameState: {
    ...defaultGameState,
    stage: "guessing",
    your_guess: 50,
    awaiting_guess: [{ id: "2", name: "Bar" }, { id: "3", name: "Baz" }]
  }
};

export const BETTING_STATE = {
  ...nonGameState,
  gameState: {
    ...defaultGameState,
    stage: "betting",
    bet_options: [
      { guess: 15, odds: 4, players: [players[0], players[1]] },
      { guess: 20, odds: 3, players: [players[2]] },
      { guess: 25, odds: 3, players: [players[3]] },
      { guess: 40, odds: 4, players: [players[4]] }
    ],
    your_bets: [{ guess: 20, wager: 100 }, { guess: 25, wager: 100 }],
    awaiting_bet: [players[2], players[3]]
  }
};

export const REVEAL_STATE = {
  ...nonGameState,
  gameState: {
    ...defaultGameState,
    stage: "reveal",
    answer: 43,
    winning_guess: 40,
    score_updates: [
      { player: players[0], old_score: 200, new_score: 300, winning_guess: true, wagered: 0 },
      { player: players[1], old_score: 200, new_score: 300, winning_guess: false, wagered: 100 },
    ]
  }
};
