import { describe, it, expect, vi, beforeEach } from "vitest";
import { Bot } from "./player.bot";
import type { Card } from "~/deck/interfaces/card.interface";

const createCard = (overrides: Partial<Card> = {}): Card => ({
    suit: "♠",
    rank: "A",
    color: "black",
    isFaceUp: true,
    isIt: true,
    ...overrides
});

const createEmptyCards = () => ({
    FrontRow: Array(4).fill(null).map(() => createCard({ rank: "2", isFaceUp: false })),
    BackRow: Array(4).fill(null).map(() => createCard({ rank: "K", isFaceUp: false }))
});

describe("player.bot.ts", () => {
    describe("Easy difficulty", () => {
        it("should return a random move with -Infinity score", () => {
            const cards = createEmptyCards();
            // Mock Math.random to make it deterministic for this test
            vi.spyOn(Math, 'random').mockReturnValue(0); // Should pick index 0 for both map and filter
            
            const result = Bot({ P1Cards: cards, difficulty: "easy" });
            
            expect(result.score).toBe(-Infinity);
            expect(result.map).toBeDefined();
            expect(result.filter).toBeDefined();
            
            vi.restoreAllMocks();
        });
    });

    describe("Normal difficulty", () => {
        it("should optimize for hand score using evaluateHand", () => {
            const cards = {
                FrontRow: [
                    createCard({ rank: "2", isFaceUp: false }), // value 1 (face down)
                    createCard({ rank: "3", isFaceUp: false }), // value 1 (face down)
                    createCard({ rank: "4", isFaceUp: false }), // value 1 (face down)
                    createCard({ rank: "5", isFaceUp: false })  // value 1 (face down)
                ],
                BackRow: [
                    createCard({ rank: "K", isFaceUp: true }), // value 13
                    createCard({ rank: "Q", isFaceUp: true }), // value 12
                    createCard({ rank: "J", isFaceUp: true }), // value 11
                    createCard({ rank: "10", isFaceUp: true }) // value 10
                ]
            };

            const result = Bot({ P1Cards: cards, difficulty: "normal" });

            // On normal difficulty, it should try to get the highest value cards.
            // "swap" should be one of the map functions to get the high value BackRow to FrontRow.
            expect(result.map).toContain("swap");
            expect(result.score).toBeGreaterThan(4); // Initial score was 4 (all face down)
        });

        it("should handle 'none' filters and maps correctly", () => {
            const cards = createEmptyCards();
            const result = Bot({ P1Cards: cards, difficulty: "normal" });
            
            expect(result.filter).toBeDefined();
            expect(Array.isArray(result.map)).toBe(true);
        });
    });

    describe("Advanced difficulty", () => {
        it("should optimize score against opponent cards", () => {
            const P1Cards = createEmptyCards();
            const P2Cards = {
                FrontRow: Array(4).fill(null).map(() => createCard({ rank: "5", isFaceUp: true })),
                BackRow: Array(4).fill(null).map(() => createCard({ rank: "2", isFaceUp: true }))
            };

            // P1 BackRow has Kings (13). P2 FrontRow has 5s.
            // The bot should swap to its BackRow to win the matchup.
            const result = Bot({ P1Cards, P2Cards, difficulty: "advanced" });

            expect(result.map).toContain("swap");
            expect(result.score).toBeGreaterThan(0);
        });

        it("should use P1Cards as P2Cards if P2Cards is missing", () => {
            const P1Cards = createEmptyCards();
            const result = Bot({ P1Cards, difficulty: "advanced" });
            expect(result).toBeDefined();
        });
    });
});
