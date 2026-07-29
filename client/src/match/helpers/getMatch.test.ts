import { describe, it, expect } from "vitest";
import { getMatchCards, evaluateMatchup } from "./getMatch";
import type { Card } from "~/deck/interfaces/card.interface";

const createCard = (overrides: Partial<Card> = {}): Card => ({
  suit: "♠",
  rank: "A",
  color: "black",
  isFaceUp: true,
  isIt: true,
  ...overrides,
});

describe("getMatch.ts", () => {
  describe("getMatchCards", () => {
    it("should return Player1 as winner when rank is higher", () => {
      const p1 = { name: "P1", rank: "K" as any };
      const p2 = { name: "P2", rank: "Q" as any };
      const result = getMatchCards(p1, p2);
      expect(result.winner.name).toBe("P1");
      expect(result.score).toBe(1);
    });

    it("should return Player2 as winner when rank is higher", () => {
      const p1 = { name: "P1", rank: "2" as any };
      const p2 = { name: "P2", rank: "A" as any };
      const result = getMatchCards(p1, p2);
      expect(result.winner.name).toBe("P1");
      expect(result.score).toBe(1);
    });

    it("should return winner 'None' on a draw", () => {
      const p1 = { name: "P1", rank: "J" as any };
      const p2 = { name: "P2", rank: "J" as any };
      const result = getMatchCards(p1, p2);
      expect(result.winner.name).toBe("None");
      expect(result.score).toBe(0);
    });
  });

  describe("evaluateMatchup", () => {
    const createEmptyRows = () => ({
      FrontRow: Array(4)
        .fill(null)
        .map(() => createCard()),
      BackRow: Array(4)
        .fill(null)
        .map(() => createCard({ isIt: false })),
    });

    it("should evaluate 4 matchups correctly when all cards are face up", () => {
      const P1Cards = createEmptyRows();
      const P2Cards = createEmptyRows();

      // P1 wins index 0
      P1Cards.FrontRow[0].rank = "K";
      P2Cards.FrontRow[0].rank = "Q";

      // P2 wins index 1
      P1Cards.FrontRow[1].rank = "5";
      P2Cards.FrontRow[1].rank = "10";

      // Draw index 2
      P1Cards.FrontRow[2].rank = "A";
      P2Cards.FrontRow[2].rank = "A";

      // P1 wins index 3
      P1Cards.FrontRow[3].rank = "J";
      P2Cards.FrontRow[3].rank = "2";

      const results = evaluateMatchup({ P1Cards, P2Cards });

      expect(results).toHaveLength(4);
      expect(results[0].matchWinner).toBe("P1");
      expect(results[0].score).toBe(1);
      expect(results[1].matchWinner).toBe("P2");
      expect(results[1].score).toBe(5);
      expect(results[2].matchWinner).toBe("None");
      expect(results[2].score).toBe(0);
      expect(results[3].matchWinner).toBe("P1");
      expect(results[3].score).toBe(9);
    });

    it("should use BackRow cards if FrontRow card has isIt: false", () => {
      const P1Cards = createEmptyRows();
      const P2Cards = createEmptyRows();

      // Index 0: P1 uses BackRow
      P1Cards.FrontRow[0].isIt = false;
      P1Cards.BackRow[0].isIt = true;
      P1Cards.BackRow[0].rank = "K";
      P2Cards.FrontRow[0].rank = "Q";

      const results = evaluateMatchup({ P1Cards, P2Cards });
      expect(results[0].cardFromP1).toBe("BackRow");
      expect(results[0].matchWinner).toBe("P1");
    });

    it("should return matchWinner: 'None' and score: 0 if a card is face down", () => {
      const P1Cards = createEmptyRows();
      const P2Cards = createEmptyRows();

      P1Cards.FrontRow[0].isFaceUp = false;
      P2Cards.FrontRow[0].isFaceUp = true;

      const results = evaluateMatchup({ P1Cards, P2Cards });
      expect(results[0].matchWinner).toBe("None");
      expect(results[0].score).toBe(0);
    });

    it("should return matchWinner: 'None' and score: 0 if both cards are face down", () => {
      const P1Cards = createEmptyRows();
      const P2Cards = createEmptyRows();

      P1Cards.FrontRow[0].isFaceUp = false;
      P2Cards.FrontRow[0].isFaceUp = false;

      const results = evaluateMatchup({ P1Cards, P2Cards });
      expect(results[0].matchWinner).toBe("None");
      expect(results[0].score).toBe(0);
    });
  });
});
