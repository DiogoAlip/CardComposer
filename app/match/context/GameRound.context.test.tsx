import { renderHook, act } from "@testing-library/react";
import { GameRoundProvider, GameRoundContext } from "./GameRound.context";
import { useContext } from "react";
import { describe, it, expect } from "vitest";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <GameRoundProvider>{children}</GameRoundProvider>
);

describe("GameRoundContext", () => {
  it("should initialize with correct default values", () => {
    const { result } = renderHook(() => useContext(GameRoundContext), { wrapper });

    expect(result.current.gameRounds).toHaveLength(1);
    expect(result.current.gameRounds[0].round).toBe(1);
    expect(result.current.gameRounds[0].isMatched).toBe(false);
    expect(result.current.playersName).toEqual({});
    expect(result.current.dialogOpen).toBe(false);
  });

  it("should update player names using setOnePlayersName", () => {
    const { result } = renderHook(() => useContext(GameRoundContext), { wrapper });

    act(() => {
      result.current.setOnePlayersName("Alice", 1);
    });
    expect(result.current.playersName.P1Name).toBe("Alice");

    act(() => {
      result.current.setOnePlayersName("Bob", 2);
    });
    expect(result.current.playersName.P1Name).toBe("Alice");
    expect(result.current.playersName.P2Name).toBe("Bob");
  });

  it("should update both player names using setBothPlayersNames", () => {
    const { result } = renderHook(() => useContext(GameRoundContext), { wrapper });

    act(() => {
      result.current.setBothPlayersNames({ player1: "Alice", player2: "Bob" });
    });
    expect(result.current.playersName).toEqual({ P1Name: "Alice", P2Name: "Bob" });
  });

  it("should open dialog and add a new round when newGameRound is called", () => {
    const { result } = renderHook(() => useContext(GameRoundContext), { wrapper });

    const roundResult = {
      winner: "P1",
      P1score: 10,
      P2score: 5,
      P1code: { mapFunctions: ["swap" as any], filterFunction: "isRed" as any },
      P2code: { mapFunctions: ["none" as any], filterFunction: "none" as any },
    };

    act(() => {
      result.current.newGameRound(roundResult);
    });

    // Should have 2 rounds now: the completed one and the next one
    expect(result.current.gameRounds).toHaveLength(2);
    
    // Check first round completion
    expect(result.current.gameRounds[0].isMatched).toBe(true);
    expect(result.current.gameRounds[0].winner).toBe("P1");
    expect(result.current.gameRounds[0].scorePerRound.player1).toBe(10);
    
    // Check second round initialization
    expect(result.current.gameRounds[1].round).toBe(2);
    expect(result.current.gameRounds[1].isMatched).toBe(false);
    
    // Check dialog open
    expect(result.current.dialogOpen).toBe(true);
  });

  it("should update dialog open state", () => {
    const { result } = renderHook(() => useContext(GameRoundContext), { wrapper });

    act(() => {
      result.current.setDialogOpen(true);
    });
    expect(result.current.dialogOpen).toBe(true);

    act(() => {
      result.current.setDialogOpen(false);
    });
    expect(result.current.dialogOpen).toBe(false);
  });

  it("should reset the game to initial state", () => {
    const { result } = renderHook(() => useContext(GameRoundContext), { wrapper });

    // Modify state
    act(() => {
      result.current.newGameRound({
        winner: "P1",
        P1score: 10,
        P2score: 5,
        P1code: { mapFunctions: [], filterFunction: "none" as any },
        P2code: { mapFunctions: [], filterFunction: "none" as any },
      });
    });
    expect(result.current.gameRounds).toHaveLength(2);

    // Reset
    act(() => {
      result.current.resetGame();
    });

    expect(result.current.gameRounds).toHaveLength(1);
    expect(result.current.gameRounds[0].round).toBe(1);
    expect(result.current.gameRounds[0].isMatched).toBe(false);
  });
});
