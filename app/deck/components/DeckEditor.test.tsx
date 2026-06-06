import { render, screen, fireEvent, act } from "@testing-library/react";
import DeckEditor from "./DeckEditor";
import { useCardsStore } from "~/deck/store/cards.store";
import { GameRoundContext } from "~/match/context/GameRound.context";
import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";

// Mock child components
vi.mock("./DeckLayout", () => ({
  default: ({ showNames }: { showNames: boolean }) => (
    <div data-testid="deck-layout">DeckLayout {showNames ? "with names" : ""}</div>
  )
}));

vi.mock("@/code-composer/components/DeckCode", () => ({
  DeckCode: () => <div data-testid="deck-code">DeckCode</div>
}));

vi.mock("~/match/components/MatchDialog", () => ({
  MatchDialog: ({ onFinish }: { onFinish: () => void }) => (
    <div data-testid="match-dialog">
      <button onClick={onFinish} data-testid="finish-match">Finish</button>
    </div>
  )
}));

// Mock Zustand store
vi.mock("~/deck/store/cards.store", () => ({
  useCardsStore: vi.fn()
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
    (useCardsStore as any).mockImplementation((selector: any) => selector({
      CardsFromPlayer1: { FrontRow: [], BackRow: [] },
      CardsFromPlayer2: { FrontRow: [], BackRow: [] },
      ShuffleCards: mockShuffleCards
    }));
  });

  const renderDeckEditor = (contextOverrides = {}) => {
    return render(
      <GameRoundContext.Provider value={{ ...mockContextValue, ...contextOverrides } as any}>
        <DeckEditor />
      </GameRoundContext.Provider>
    );
  };

  it("should render correctly", () => {
    renderDeckEditor();
    expect(screen.getByText("Deck Editor")).toBeDefined();
    expect(screen.getByTestId("deck-code")).toBeDefined();
    expect(screen.getByTestId("deck-layout")).toBeDefined();
  });

  it("should toggle sidebar visibility when menu icon is clicked", () => {
    const { container } = renderDeckEditor();
    const menuIcon = container.querySelector(".lucide-menu");
    expect(menuIcon).toBeTruthy();

    // Initially sidebar is visible
    const sidebar = screen.getByText("Deck Editor").closest(".overflow-auto");
    expect(sidebar?.className).not.toContain("hidden");

    // Click to close
    fireEvent.click(menuIcon!);
    expect(sidebar?.className).toContain("hidden");

    // Menu icon should now be visible in the main area (outside sidebar)
    const absoluteMenu = container.querySelector(".lucide-menu");
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
      gameRounds: [{}, {}, {}, {}] // 4 rounds
    });

    const finishButton = screen.getByTestId("finish-match");
    fireEvent.click(finishButton);

    expect(mockShuffleCards).toHaveBeenCalled();
    expect(setDialogOpen).toHaveBeenCalledWith(false);
    expect(resetGame).toHaveBeenCalled();
  });

  it("should resize the sidebar on mouse move", () => {
    const { container } = renderDeckEditor();
    const resizer = container.querySelector(".cursor-col-resize");
    expect(resizer).toBeTruthy();

    if (resizer) {
      // Simulate mouse down to start resizing
      fireEvent.mouseDown(resizer);
      
      // Simulate mouse move to 500px
      act(() => {
        window.dispatchEvent(new MouseEvent("mousemove", { clientX: 500, bubbles: true }));
      });
      
      const sidebar = screen.getByText("Deck Editor").closest(".overflow-auto");
      expect(sidebar?.style.width).toBe("500px");

      // Simulate mouse up to stop resizing
      act(() => {
        window.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
      });
      
      // Move mouse again, width should not change
      act(() => {
        window.dispatchEvent(new MouseEvent("mousemove", { clientX: 600, bubbles: true }));
      });
      expect(sidebar?.style.width).toBe("500px");
    }
  });

  it("should respect resize boundaries", () => {
    const { container } = renderDeckEditor();
    const resizer = container.querySelector(".cursor-col-resize");

    if (resizer) {
      fireEvent.mouseDown(resizer);
      
      // Try to resize too small (default is 375, min is 350, so let's try 200)
      act(() => {
        window.dispatchEvent(new MouseEvent("mousemove", { clientX: 200, bubbles: true }));
      });
      const sidebar = screen.getByText("Deck Editor").closest(".overflow-auto");
      expect(sidebar?.style.width).toBe("375px"); // Stays default

      // Try to resize too large (max 800, try 1000)
      act(() => {
        window.dispatchEvent(new MouseEvent("mousemove", { clientX: 1000, bubbles: true }));
      });
      expect(sidebar?.style.width).toBe("375px"); // Stays default
    }
  });
});
