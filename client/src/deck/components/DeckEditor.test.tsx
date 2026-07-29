import { render, screen, fireEvent } from "@testing-library/react";
import DeckEditor from "./DeckEditor";
import { useCardsStore } from "~/deck/store/cards.store";
import { GameRoundContext } from "~/match/context/GameRound.context";
import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";

vi.mock("./DeckLayout", () => ({
  default: ({ showNames }: { showNames: boolean }) => (
    <div data-testid="deck-layout">
      DeckLayout {showNames ? "with names" : ""}
    </div>
  ),
}));

vi.mock("@/code-composer/components/DeckCode", () => ({
  DeckCode: () => <div data-testid="deck-code">DeckCode</div>,
}));

vi.mock("~/match/components/MatchDialog", () => ({
  MatchDialog: ({ onFinish }: { onFinish: () => void }) => (
    <div data-testid="match-dialog">
      <button onClick={onFinish} data-testid="finish-match">
        Finish
      </button>
    </div>
  ),
}));

vi.mock("~/shared/components/TutorialPopup", () => ({
  TutorialPopup: ({ stage }: { stage: number }) => (
    <div data-testid="tutorial-popup">Tutorial Stage {stage}</div>
  ),
}));

vi.mock("~/deck/store/cards.store", () => ({
  useCardsStore: vi.fn(),
}));

const mockContextValue = {
  dialogOpen: false,
  setDialogOpen: vi.fn(),
  gameRounds: [],
  resetGame: vi.fn(),
  playersName: { P1Name: "P1", P2Name: "P2" },
  newGameRound: vi.fn(),
  setOnePlayersName: vi.fn(),
  setBothPlayersNames: vi.fn(),
};

describe("DeckEditor", () => {
  const mockShuffleCards = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useCardsStore as any).mockImplementation((selector: any) =>
      selector({
        CardsFromPlayer1: { FrontRow: [], BackRow: [] },
        CardsFromPlayer2: { FrontRow: [], BackRow: [] },
        ShuffleCards: mockShuffleCards,
      }),
    );
  });

  const renderDeckEditor = (contextOverrides = {}) => {
    return render(
      <GameRoundContext.Provider
        value={{ ...mockContextValue, ...contextOverrides } as any}
      >
        <DeckEditor />
      </GameRoundContext.Provider>,
    );
  };

  it("should render correctly", () => {
    renderDeckEditor();
    expect(screen.getByText("Deck Editor")).toBeDefined();
    expect(screen.getByTestId("deck-code")).toBeDefined();
    expect(screen.getByTestId("deck-layout")).toBeDefined();
    expect(screen.getByTestId("tutorial-popup")).toBeDefined();
  });

  it("should toggle sidebar visibility when menu icon is clicked", () => {
    const { container } = renderDeckEditor();
    const menuIcon = container.querySelector(".lucide-panel-left-open") || container.querySelector("svg");
    expect(menuIcon).toBeTruthy();

    const sidebar = screen.getByText("Deck Editor").closest(".overflow-auto");
    expect(sidebar?.className).not.toContain("hidden");

    fireEvent.click(menuIcon!);
    expect(sidebar?.className).toContain("hidden");
    expect(screen.getByTestId("deck-layout").textContent).toContain("with names");

    const absoluteMenu = container.querySelector(".lucide-panel-left-open") || container.querySelector("svg");
    expect(absoluteMenu).toBeTruthy();
  });

  it("should show MatchDialog when dialogOpen is true", () => {
    renderDeckEditor({ dialogOpen: true });
    expect(screen.getByTestId("match-dialog")).toBeDefined();
  });

  it("should handle onFinish correctly", async () => {
    const setDialogOpen = vi.fn();
    const resetGame = vi.fn();

    renderDeckEditor({
      dialogOpen: true,
      setDialogOpen,
      resetGame,
      gameRounds: [{}, {}, {}, {}], // 4 rounds
    });

    const finishButton = screen.getByTestId("finish-match");
    fireEvent.click(finishButton);

    expect(mockShuffleCards).toHaveBeenCalled();
    expect(setDialogOpen).toHaveBeenCalledWith(false);
    expect(resetGame).toHaveBeenCalled();
  });
});
