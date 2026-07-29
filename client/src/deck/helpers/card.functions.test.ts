import { describe, it, expect } from "vitest";
import { simulateMap, simulateFilter } from "./card.functions";
import type { Card } from "~/deck/interfaces/card.interface";
import type { mapFunctions, filterFunctions } from "~/code-composer/interfaces/functions.type";

const createCard = (overrides: Partial<Card> = {}): Card => ({
    suit: "♠",
    rank: "A",
    color: "black",
    isFaceUp: false,
    isIt: true,
    ...overrides
});

describe("card.functions", () => {
    describe("simulateMap", () => {
        it("should swap FrontRow and BackRow when type is 'swap'", () => {
            const frontCard = createCard({ rank: "A" });
            const backCard = createCard({ rank: "K" });
            const cards = {
                FrontRow: [frontCard],
                BackRow: [backCard]
            };
            const result = simulateMap(cards, ["swap"]);
            expect(result.FrontRow).toEqual([backCard]);
            expect(result.BackRow).toEqual([frontCard]);
        });

        it("should set faceUp for FrontRow cards when type is 'faceUp'", () => {
            const cards = {
                FrontRow: [createCard({ isFaceUp: false })],
                BackRow: []
            };
            const result = simulateMap(cards, ["faceUp"]);
            expect(result.FrontRow[0].isFaceUp).toBe(true);
        });

        it("should set faceDown for FrontRow cards when type is 'faceDown'", () => {
            const cards = {
                FrontRow: [createCard({ isFaceUp: true })],
                BackRow: []
            };
            const result = simulateMap(cards, ["faceDown"]);
            expect(result.FrontRow[0].isFaceUp).toBe(false);
        });

        it("should flip cards in FrontRow when type is 'flipOver'", () => {
            const cards = {
                FrontRow: [
                    createCard({ isFaceUp: true }),
                    createCard({ isFaceUp: false })
                ],
                BackRow: []
            };
            const result = simulateMap(cards, ["flipOver"]);
            expect(result.FrontRow[0].isFaceUp).toBe(false);
            expect(result.FrontRow[1].isFaceUp).toBe(true);
        });

        it("should return unchanged cards for 'none'", () => {
            const cards = {
                FrontRow: [createCard()],
                BackRow: []
            };
            const result = simulateMap(cards, ["none" as mapFunctions]);
            expect(result).toEqual(cards);
        });

        it("should apply multiple operations in order", () => {
            const cards = {
                FrontRow: [createCard({ isFaceUp: false })],
                BackRow: [createCard({ isFaceUp: true, rank: "Q" })]
            };
            // 1. faceUp -> FrontRow card is now Up
            // 2. swap -> FrontRow has the rank "Q" card (which was Up), BackRow has the rank "A" card (now Up)
            const result = simulateMap(cards, ["faceUp", "swap"]);
            expect(result.FrontRow[0].rank).toBe("Q");
            expect(result.BackRow[0].rank).toBe("A");
            expect(result.BackRow[0].isFaceUp).toBe(true);
        });
    });

    describe("simulateFilter", () => {
        it("should filter red cards correctly with 'isRed'", () => {
            const cards = [
                createCard({ color: "red", isFaceUp: true }),
                createCard({ color: "black", isFaceUp: true }),
                createCard({ color: "red", isFaceUp: false })
            ];
            const result = simulateFilter(cards, "isRed");
            expect(result[0].isIt).toBe(true);
            expect(result[1].isIt).toBe(false);
            expect(result[2].isIt).toBe(false);
        });

        it("should filter black cards correctly with 'isBlack'", () => {
            const cards = [
                createCard({ color: "red", isFaceUp: true }),
                createCard({ color: "black", isFaceUp: true }),
                createCard({ color: "black", isFaceUp: false })
            ];
            const result = simulateFilter(cards, "isBlack");
            expect(result[0].isIt).toBe(false);
            expect(result[1].isIt).toBe(true);
            expect(result[2].isIt).toBe(false);
        });

        it("should filter face up cards with 'isUp'", () => {
            const cards = [
                createCard({ isFaceUp: true }),
                createCard({ isFaceUp: false })
            ];
            const result = simulateFilter(cards, "isUp");
            expect(result[0].isIt).toBe(true);
            expect(result[1].isIt).toBe(false);
        });

        it("should filter face down cards with 'isDown'", () => {
            const cards = [
                createCard({ isFaceUp: true }),
                createCard({ isFaceUp: false })
            ];
            const result = simulateFilter(cards, "isDown");
            expect(result[0].isIt).toBe(false);
            expect(result[1].isIt).toBe(true);
        });

        it("should return unchanged cards for 'none'", () => {
            const cards = [createCard({ isIt: true })];
            const result = simulateFilter(cards, "none" as filterFunctions);
            expect(result).toEqual(cards);
        });
    });
});
