const players = [
  { id: "1", name: "Timmy Tanker", isModerator: true },
  { id: "2", name: "Billy Jean", isModerator: false },
  { id: "3", name: "Charlie Chapman", isModerator: false },
  { id: "4", name: "Rick Sanchez", isModerator: false },
  { id: "5", name: "Earnest Hemingway", isModerator: false }
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
  round: 2,
  question: "What percentage of US house holds own a dog?",
  scores: players.map(player => ({ player, score: 1500 }))
};

export const WAITING_FOR_PLAYERS = {
  ...nonGameState
};

export const GUESSING = {
  ...nonGameState,
  gameState: {
    ...defaultGameState,
    stage: "guessing",
    your_guess: null,
    awaiting_guess: [players[2], players[3]]
  }
};

export const GUESSED = {
  ...GUESSING,
  gameState: {
    ...GUESSING.gameState,
    your_guess: 50
  }
};

export const BETTING = {
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
    your_bets: null,
    awaiting_bet: [players[2], players[3]],
    your_score: 1500
  }
};

export const BETTED = {
  ...BETTING,
  gameState: {
    ...BETTING.gameState,
    your_bets: [{ guess: 20, wager: 100 }, { guess: 25, wager: 100 }],
    your_score: 1500
  }
};

export const REVEAL = {
  ...nonGameState,
  gameState: {
    ...defaultGameState,
    stage: "reveal",
    answer: 43,
    closest_guess: 40,
    payouts: [
      { player: players[0], delta: 300, closest: true },
      { player: players[1], delta: 600, closest: false },
      { player: players[2], delta: 0, closest: false },
      { player: players[3], delta: 0, closest: false },
      { player: players[4], delta: -200, closest: false },
    ]
  }
};

export const END_GAME = {
  ...nonGameState,
  gameState: {
    stage: "end",
    scores: players.map(player => ({ player, score: 1500 }))
  }
};
