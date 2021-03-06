import { gatherChips } from "./YouBetBetting";

describe("getting bets from chips", () => {
  it("handles an empty array", () => {
    const chips = [];
    const bets = gatherChips(chips);

    expect(bets).toEqual([]);
  });

  it("handles base bets on different guesses", () => {
    const chips = [
      { guess: 10, base: true, amount: 100 },
      { guess: 20, base: true, amount: 100 }
    ];
    const bets = gatherChips(chips);

    expect(bets).toEqual([
      { guess: 10, base_wager: 100, extra_wager: 0 },
      { guess: 20, base_wager: 100, extra_wager: 0 }
    ]);
  });

  it("handles base bets on same guess", () => {
    const chips = [
      { guess: 10, base: true, amount: 100 },
      { guess: 10, base: true, amount: 100 }
    ];
    const bets = gatherChips(chips);

    expect(bets).toEqual([{ guess: 10, base_wager: 200, extra_wager: 0 }]);
  });

  it("handles non-base bets", () => {
    const chips = [
      { guess: 10, base: true, amount: 100 },
      { guess: 20, base: true, amount: 100 },
      { guess: 10, base: false, amount: 100 },
      { guess: 10, base: false, amount: 500 }
    ];
    const bets = gatherChips(chips);

    expect(bets).toEqual([
      { guess: 10, base_wager: 100, extra_wager: 600 },
      { guess: 20, base_wager: 100, extra_wager: 0 }
    ]);
  });

  it("handles chips that aren't bet", () => {
    const chips = [
      { guess: 10, base: true, amount: 100 },
      { guess: 20, base: true, amount: 100 },
      { guess: null, base: false, amount: 100 },
      { guess: null, base: false, amount: 500 }
    ];
    const bets = gatherChips(chips);

    expect(bets).toEqual([
      { guess: 10, base_wager: 100, extra_wager: 0 },
      { guess: 20, base_wager: 100, extra_wager: 0 }
    ]);
  })
});
