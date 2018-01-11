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
export const waitingForPlayers = {
  ...nonGameState
};

const defaultYouBetGameState = {
  you,
  others,
  round: 2,
  question: "What percentage of US house holds own a dog?",
  scores: players.map(player => ({ player, score: 1500 }))
};

export const youBet = {};
youBet.guessing = {
  ...nonGameState,
  gameState: {
    ...defaultYouBetGameState,
    stage: "guessing",
    your_guess: null,
    awaiting_guess: [players[2], players[3]]
  }
};
youBet.guessed = {
  ...youBet.guessing,
  gameState: {
    ...youBet.guessing.gameState,
    your_guess: 50
  }
};
youBet.betting = {
  ...nonGameState,
  gameState: {
    ...defaultYouBetGameState,
    stage: "betting",
    bet_options: [
      { guess: 15, odds: 4, players: [players[0], players[1]], bets: 0 },
      { guess: 20, odds: 3, players: [players[2]], bets: 0 },
      { guess: 25, odds: 3, players: [players[3]], bets: 200 },
      { guess: 40, odds: 4, players: [players[4]], bets: 0 }
    ],
    your_bets: null,
    awaiting_bet: [players[2], players[3]],
    your_score: 5200
  }
};
youBet.betted = {
  ...youBet.betting,
  gameState: {
    ...youBet.betting.gameState,
    your_bets: [{ guess: 20, wager: 100 }, { guess: 25, wager: 100 }],
    your_score: 1500
  }
};
youBet.reveal = {
  ...nonGameState,
  gameState: {
    ...defaultYouBetGameState,
    stage: "reveal",
    answer: 1,
    closest_guess: null,
    payouts: [
      { player: players[0], delta: 200, closest: false },
      { player: players[1], delta: 100, closest: false },
      { player: players[2], delta: -200, closest: false },
      { player: players[3], delta: 0, closest: false },
      { player: players[4], delta: 0, closest: false }
    ]
  }
};
youBet.end = {
  ...nonGameState,
  gameState: {
    stage: "end",
    scores: players.map(player => ({ player, score: 1500 }))
  }
};

const defaultFunPromptsGameState = {
  round: 1,
  stage: "writing",
  scores: players.map(player => ({ player, score: 0 })),
  prompts: [
    {
      id: 1,
      prompt:
        "<i>The Empire Strikes Back</i> would\u2019ve been ruined if Darth Vader said \u201cLuke, I am <BLANK>\u201d"
    },
    { id: 2, prompt: "Worst thing to hear your pilot say" }
  ],
  awaiting_answer: []
};

export const funPrompts = {};
funPrompts.writing = {
  ...nonGameState,
  gameId: "fun_prompts",
  gameState: {
    ...defaultFunPromptsGameState
  }
};
funPrompts.waitingForAnswers = {
  ...funPrompts.writing,
  gameState: {
    ...defaultFunPromptsGameState,
    prompts: [],
    awaiting_answer: players
  }
};
funPrompts.voting = {
  ...funPrompts.writing,
  gameState: {
    ...defaultFunPromptsGameState,
    stage: "voting",
    prompt: "What you shouldn't say at a funeral",
    choices: [
      { answer: "fart", player: players[0], your_answer: true, votes: [] },
      { answer: "well then", player: players[1], your_answer: false, votes: [] }
    ],
    you_answered: true,
    you_voted: false,
    awaiting_vote: players
  }
};
funPrompts.voted = {
  ...funPrompts.writing,
  gameState: {
    ...defaultFunPromptsGameState,
    stage: "voting",
    prompt: "What you shouldn't say at a funeral",
    choices: [
      {
        answer: "fart",
        player: players[0],
        your_answer: false,
        votes: players.slice(2)
      },
      { answer: "well then", player: players[1], your_answer: false, votes: [] }
    ],
    you_answered: false,
    you_voted: true,
    awaiting_vote: players.slice(3, 5)
  }
};
funPrompts.showWinner = {
  ...funPrompts.writing,
  gameState: {
    ...defaultFunPromptsGameState,
    stage: "voting",
    prompt: "What you shouldn't say at a funeral",
    choices: [
      {
        answer: "fart",
        player: players[0],
        your_answer: false,
        votes: players.slice(2)
      },
      { answer: "well then", player: players[1], your_answer: false, votes: [] }
    ],
    you_answered: false,
    you_voted: true,
    awaiting_vote: []
  }
};
funPrompts.showScores = {
  ...funPrompts.writing,
  gameState: {
    ...defaultFunPromptsGameState,
    stage: "show_scores",
    scores: players.map(p => ({ player: p, score: 100 }))
  }
};
