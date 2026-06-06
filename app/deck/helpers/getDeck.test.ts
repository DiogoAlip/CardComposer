import { describe, it, expect } from "vitest";
import getDeck from "./getDeck";

describe("getDeck", () => {
  it("should generate a base deck with 52 cards", () => {
    const { baseDeck } = getDeck();
    expect(baseDeck).toHaveLength(52);
  });

  it("should have 13 cards of each suit", () => {
    const { baseDeck, SUITS } = getDeck();
    SUITS.forEach((suit) => {
      const suitCards = baseDeck.filter((card) => card.suit === suit);
      expect(suitCards).toHaveLength(13);
    });
  });

  it("should assign correct colors to suits", () => {
    const { baseDeck } = getDeck();

    const blackSuits = ["♠", "♣"];
    const redSuits = ["♥", "♦"];

    baseDeck.forEach((card) => {
      if (blackSuits.includes(card.suit)) {
        expect(card.color).toBe("black");
      } else if (redSuits.includes(card.suit)) {
        expect(card.color).toBe("red");
      }
    });
  });

  it("should initialize cards as face down and with isIt true", () => {
    const { baseDeck } = getDeck();
    baseDeck.forEach((card) => {
      expect(card.isFaceUp).toBe(false);
      expect(card.isIt).toBe(true);
    });
  });

  describe("shuffleDeck", () => {
    it("should return a new array with the same number of cards", () => {
      const { shuffleDeck, baseDeck } = getDeck();
      const shuffled = shuffleDeck();

      expect(shuffled).toHaveLength(baseDeck.length);
      expect(shuffled).not.toBe(baseDeck);
    });

    it("should contain all the same cards as the base deck", () => {
      const { shuffleDeck, baseDeck } = getDeck();
      const shuffled = shuffleDeck();

      const sortFn = (a: any, b: any) =>
        (a.suit + a.rank).localeCompare(b.suit + b.rank);
      const sortedBase = [...baseDeck].sort(sortFn);
      const sortedShuffled = [...shuffled].sort(sortFn);

      expect(sortedShuffled).toEqual(sortedBase);
    });

    it("should randomize the order (probabilistic)", () => {
      const { shuffleDeck } = getDeck();
      const shuffled1 = shuffleDeck();
      const shuffled2 = shuffleDeck();

      expect(shuffled1).not.toEqual(shuffled2);
    });
  });
});
