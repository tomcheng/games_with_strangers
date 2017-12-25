export const GUESSING_STATE = {
  roomCode: "FOOB",
  roomJoined: true,
  yourId: "1",
  you: {
    id: "1",
    name: "Foo"
  },
  others: [{ id: "2", name: "Bar" }, { id: "3", name: "Baz" }],
  gameId: "you_bet",
  playersNeeded: 3,
  gameState: {
    you: { id: "1", name: "Foo", guess: null },
    others: [
      { id: "2", name: "Bar", guessed: false },
      { id: "3", name: "Baz", guessed: false }
    ],
    question: "How many roads must a man walk down?",
    round: 1,
    stage: "guessing"
  }
};

export const BETTING_STATE = {
  roomCode: "FOOB",
  roomJoined: true,
  yourId: "1",
  you: {
    id: "1",
    name: "Foo"
  },
  others: [{ id: "2", name: "Bar" }, { id: "3", name: "Baz" }],
  gameId: "you_bet",
  playersNeeded: 3,
  gameState: {
    you: { id: "1", name: "Foo", bet: null },
    others: [
      { id: "2", name: "Bar", bet: null },
      { id: "3", name: "Baz", bet: null }
    ],
    question: "How many roads must a man walk down?",
    round: 1,
    stage: "betting",
    guesses: [
      { guess: 3, odds: 3, players: ["Foo", "Bar"]},
      { guess: 5, odds: 3, players: ["Baz"]}
    ]
  }
};
