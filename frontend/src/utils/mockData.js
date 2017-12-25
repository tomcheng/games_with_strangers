export const FAKE_STATE = {
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
    you: { id: "1", name: "Foo", guessed: true },
    others: [
      { id: "2", name: "Bar", guessed: false },
      { id: "3", name: "Baz", guessed: false }
    ],
    question: "How many roads must a man walk down?",
    round: 1,
    stage: "guessing"
  }
};
