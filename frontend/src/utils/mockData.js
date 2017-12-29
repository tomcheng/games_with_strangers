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
    question: "How many roads must a man walk down?",
    round: 1,
    stage: "guessing",
    you: { id: "1", name: "Foo" },
    your_guess: 50,
    others: [{ id: "2", name: "Bar" }, { id: "3", name: "Baz" }],
    awaiting_guess: [{ id: "2", name: "Bar" }, { id: "3", name: "Baz" }],
    scores: {
      "1": 200,
      "2": 200,
      "3": 200
    }
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
    you: {
      id: "1",
      name: "Alan Rickman"
    },
    others: [
      { id: "2", name: "Billy Bob Thornton" },
      { id: "3", name: "Charlize Theron" },
      { id: "4", name: "Doug Stanton" },
      { id: "5", name: "Ernie Banks" }
    ],
    question: "What percentage of US house holds own a dog?",
    round: 1,
    stage: "betting",
    bet_options: [
      {
        guess: 15,
        odds: 4,
        players: [
          { id: "1", name: "Alan Rickman" },
          { id: "2", name: "Billy Bob Thornton" }
        ]
      },
      { guess: 20, odds: 3, players: [{ id: "3", name: "Charlize Theron" }] },
      { guess: 25, odds: 3, players: [{ id: "4", name: "Ernie Banks" }] },
      { guess: 40, odds: 4, players: [{ id: "5", name: "Doug Stanton" }] }
    ],
    your_bets: [{ guess: 20, wager: 100 }, { guess: 25, wager: 100 }],
    awaiting_bet: [
      { id: "2", name: "Billy Bob Thornton" },
      { id: "4", name: "Doug Stanton" }
    ]
  }
};
