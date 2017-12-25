export const FAKE_STATE = {
  roomCode: "FOOB",
  roomJoined: true,
  yourId: "1",
  you: {
    id: "1",
    name: "Foo"
  },
  others: {
    2: { id: "2", name: "Bar" },
    3: { id: "3", name: "Baz" }
  },
  gameId: "you_bet",
  playersNeeded: 3,
  gameState: {
    players: {
      "1": { guessed: false },
      "2": { guessed: false },
      "3": { guessed: false }
    },
    question: "How many roads must a man walk down?",
    round: 1,
    stage: "guessing"
  }
};
