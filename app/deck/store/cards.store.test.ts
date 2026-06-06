import { describe, it, expect, beforeEach } from "vitest";
import { useCardsStore } from "./cards.store";
import type { Card } from "@/deck/interfaces/card.interface";

const createCard = (overrides: Partial<Card> = {}): Card => ({
  suit: "♠",
  rank: "A",
  color: "black",
  isFaceUp: false,
  isIt: true,
  ...overrides,
});

describe("cards.store.ts", () => {
  beforeEach(() => {
    const testCards = Array(16)
      .fill(null)
      .map((_, i) => createCard({ rank: (i + 1).toString() as any }));
    useCardsStore.setState({
      CardsFromPlayer1: {
        FrontRow: testCards.slice(0, 4),
        BackRow: testCards.slice(4, 8),
      },
      CardsFromPlayer2: {
        FrontRow: testCards.slice(8, 12),
        BackRow: testCards.slice(12, 16),
      },
      InitialCardsFromPlayer1: {
        FrontRow: testCards.slice(0, 4),
        BackRow: testCards.slice(4, 8),
      },
      InitialCardsFromPlayer2: {
        FrontRow: testCards.slice(8, 12),
        BackRow: testCards.slice(12, 16),
      },
    });
  });

  it("should initialize with 4 cards per row", () => {
    const state = useCardsStore.getState();
    expect(state.CardsFromPlayer1.FrontRow).toHaveLength(4);
    expect(state.CardsFromPlayer1.BackRow).toHaveLength(4);
    expect(state.CardsFromPlayer2.FrontRow).toHaveLength(4);
    expect(state.CardsFromPlayer2.BackRow).toHaveLength(4);
  });

  it("ShuffleCards should update all rows and initial states", () => {
    const initialState = { ...useCardsStore.getState() };
    useCardsStore.getState().ShuffleCards();
    const newState = useCardsStore.getState();

    expect(newState.CardsFromPlayer1).not.toEqual(
      initialState.CardsFromPlayer1,
    );
    expect(newState.InitialCardsFromPlayer1).toEqual(newState.CardsFromPlayer1);
  });

  it("SwapFrontToBack should swap rows for player 1", () => {
    const state = useCardsStore.getState();
    const initialFront = state.CardsFromPlayer1.FrontRow;
    const initialBack = state.CardsFromPlayer1.BackRow;

    state.SwapFrontToBack(1);

    const newState = useCardsStore.getState();
    expect(newState.CardsFromPlayer1.FrontRow).toEqual(initialBack);
    expect(newState.CardsFromPlayer1.BackRow).toEqual(initialFront);
    expect(newState.CardsFromPlayer2).toEqual(state.CardsFromPlayer2);
  });

  it("SetCardsInOnePlayer should update FrontRow only if BackRow not provided", () => {
    const newFront = [
      createCard({ rank: "K" }),
      createCard({ rank: "K" }),
      createCard({ rank: "K" }),
      createCard({ rank: "K" }),
    ];
    const initialBack = useCardsStore.getState().CardsFromPlayer1.BackRow;

    useCardsStore.getState().SetCardsInOnePlayer(1, newFront);

    const state = useCardsStore.getState();
    expect(state.CardsFromPlayer1.FrontRow).toEqual(newFront);
    expect(state.CardsFromPlayer1.BackRow).toEqual(initialBack);
  });

  it("SetCardsInOnePlayer should update both rows if provided", () => {
    const newFront = Array(4).fill(createCard({ rank: "K" }));
    const newBack = Array(4).fill(createCard({ rank: "Q" }));

    useCardsStore.getState().SetCardsInOnePlayer(2, newFront, newBack);

    const state = useCardsStore.getState();
    expect(state.CardsFromPlayer2.FrontRow).toEqual(newFront);
    expect(state.CardsFromPlayer2.BackRow).toEqual(newBack);
  });

  it("SetCardsInBothPlayers should update both players", () => {
    const p1Cards = Array(8)
      .fill(null)
      .map(() => createCard({ rank: "2" }));
    const p2Cards = Array(8)
      .fill(null)
      .map(() => createCard({ rank: "3" }));

    useCardsStore.getState().SetCardsInBothPlayers(p1Cards, p2Cards);

    const state = useCardsStore.getState();
    expect(state.CardsFromPlayer1.FrontRow).toHaveLength(4);
    expect(state.CardsFromPlayer1.FrontRow[0].rank).toBe("2");
    expect(state.CardsFromPlayer2.FrontRow[0].rank).toBe("3");
  });

  it("SetInitialState should revert cards to initial cards", () => {
    const state = useCardsStore.getState();
    const initialFront = state.InitialCardsFromPlayer1.FrontRow;

    useCardsStore.setState({
      CardsFromPlayer1: {
        FrontRow: Array(4).fill(createCard({ rank: "J" })),
        BackRow: [],
      },
    });

    useCardsStore.getState().SetInitialState(1);

    const newState = useCardsStore.getState();
    expect(newState.CardsFromPlayer1.FrontRow).toEqual(initialFront);
  });
});
