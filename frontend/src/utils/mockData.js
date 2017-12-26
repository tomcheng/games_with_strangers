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
    you: { id: "1", name: "Alan Rickman", bet: null },
    others: [
      { id: "2", name: "Billy Bob Thornton", bet: null },
      { id: "3", name: "Charlize Theron", bet: null },
      { id: "4", name: "Doug Stanton", bet: null },
      { id: "5", name: "Ernie Banks", bet: null }
    ],
    question: "What percentage of US house holds own a dog?",
    round: 1,
    stage: "betting",
    guesses: [
      { guess: 15, odds: 4, players: ["Alan Rickman", "Billy Bob Thornton"]},
      { guess: 20, odds: 3, players: ["Charlize Theron"]},
      { guess: 25, odds: 3, players: ["Ernie Banks"]},
      { guess: 40, odds: 4, players: ["Doug Stanton"]},
    ]
  }
};
