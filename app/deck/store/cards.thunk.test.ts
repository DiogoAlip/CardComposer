import { describe, it, expect, beforeEach, vi } from "vitest";
import { useCardsStore } from "./cards.store";
import {
  flipFrontDeckCards,
  extractByFlip,
  extractByColor,
  resetCode,
} from "./cards.thunk";
import type { Card } from "@/deck/interfaces/card.interface";

const createCard = (overrides: Partial<Card> = {}): Card => ({
  suit: "♠",
  rank: "A",
  color: "black",
  isFaceUp: false,
  isIt: true,
  ...overrides,
});

describe("cards.thunk.ts", () => {
  beforeEach(() => {
    const testCards = Array(8)
      .fill(null)
      .map((_, i) => createCard({ rank: (i + 1).toString() as any }));
    useCardsStore.setState({
      CardsFromPlayer1: {
        FrontRow: testCards.slice(0, 4),
        BackRow: testCards.slice(4, 8),
      },
      CardsFromPlayer2: {
        FrontRow: testCards.slice(0, 4),
        BackRow: testCards.slice(4, 8),
      },
      InitialCardsFromPlayer1: {
        FrontRow: testCards.slice(0, 4),
        BackRow: testCards.slice(4, 8),
      },
      InitialCardsFromPlayer2: {
        FrontRow: testCards.slice(0, 4),
        BackRow: testCards.slice(4, 8),
      },
    });
  });

  describe("flipFrontDeckCards", () => {
    it("should set all cards to faceUp: true when flip is true", () => {
      flipFrontDeckCards(1, { flip: true });
      const frontRow = useCardsStore.getState().CardsFromPlayer1.FrontRow;
      frontRow.forEach((card) => expect(card.isFaceUp).toBe(true));
    });

    it("should set all cards to faceDown when flip is false", () => {
      useCardsStore.setState({
        CardsFromPlayer1: {
          FrontRow: useCardsStore
            .getState()
            .CardsFromPlayer1.FrontRow.map((c) => ({ ...c, isFaceUp: true })),
          BackRow: [],
        },
      });

      flipFrontDeckCards(1, { flip: false });
      const frontRow = useCardsStore.getState().CardsFromPlayer1.FrontRow;
      frontRow.forEach((card) => expect(card.isFaceUp).toBe(false));
    });

    it("should alternate faceUp state when alternate is true", () => {
      const initialFrontRow =
        useCardsStore.getState().CardsFromPlayer1.FrontRow;
      const mixedFrontRow = initialFrontRow.map((c, i) => ({
        ...c,
        isFaceUp: i % 2 === 0,
      }));
      useCardsStore.setState({
        CardsFromPlayer1: { FrontRow: mixedFrontRow, BackRow: [] },
      });

      flipFrontDeckCards(1, { alternate: true });

      const newFrontRow = useCardsStore.getState().CardsFromPlayer1.FrontRow;
      newFrontRow.forEach((card, i) => {
        expect(card.isFaceUp).toBe(i % 2 !== 0);
      });
    });
  });

  describe("extractByFlip", () => {
    it("should set isIt to true for faceUp cards when flip is true", () => {
      const frontRow = useCardsStore.getState().CardsFromPlayer1.FrontRow;
      const mixedFrontRow = frontRow.map((c, i) => ({ ...c, isFaceUp: i < 2 }));
      useCardsStore.setState({
        CardsFromPlayer1: { FrontRow: mixedFrontRow, BackRow: [] },
      });

      extractByFlip(1, true);

      const resultRow = useCardsStore.getState().CardsFromPlayer1.FrontRow;
      expect(resultRow[0].isIt).toBe(true);
      expect(resultRow[1].isIt).toBe(true);
      expect(resultRow[2].isIt).toBe(false);
      expect(resultRow[3].isIt).toBe(false);
    });
  });

  describe("extractByColor", () => {
    it("should set isIt based on card color", () => {
      const frontRow = useCardsStore.getState().CardsFromPlayer1.FrontRow;
      const coloredFrontRow = frontRow.map((c, i) => ({
        ...c,
        color: i < 2 ? "red" : ("black" as any),
      }));
      useCardsStore.setState({
        CardsFromPlayer1: { FrontRow: coloredFrontRow, BackRow: [] },
      });

      extractByColor(1, "red");

      const resultRow = useCardsStore.getState().CardsFromPlayer1.FrontRow;
      expect(resultRow[0].isIt).toBe(true);
      expect(resultRow[1].isIt).toBe(true);
      expect(resultRow[2].isIt).toBe(false);
      expect(resultRow[3].isIt).toBe(false);
    });
  });

  describe("resetCode", () => {
    it("should call SetInitialState for player 2", () => {
      const currentState = useCardsStore.getState().CardsFromPlayer2;
      const modifiedFrontRow = currentState.FrontRow.map((c) => ({
        ...c,
        rank: "Q" as any,
      }));
      useCardsStore.setState({
        CardsFromPlayer2: { ...currentState, FrontRow: modifiedFrontRow },
      });

      resetCode();

      const resetState = useCardsStore.getState().CardsFromPlayer2;
      expect(resetState.FrontRow[0].rank).not.toBe("Q");
      expect(resetState.FrontRow[0].rank).toBe("1");
    });
  });
});
