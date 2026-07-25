import { render, screen, fireEvent } from "@testing-library/react";
import { CodeWorkspace } from "./CodeWorkspace";
import { describe, it, expect, vi } from "vitest";
import React from "react";

// Mock child components
vi.mock("@/shared/components/DroppableButton", () => ({
  DroppableButton: ({ paragraph, handleRemoveBlock }: { paragraph: string; handleRemoveBlock: () => void }) => (
    <div data-testid={`button-${paragraph}`}>
      <span>{paragraph}</span>
      <button onClick={handleRemoveBlock} data-testid={`remove-${paragraph}`}>Remove</button>
    </div>
  )
}));

describe("CodeWorkspace", () => {
  const mockHandleRemoveBlock = vi.fn();
  const mockOnSelectFilter = vi.fn();
  const mockOnSelectMap = vi.fn();

  it("should render placeholder text when empty", () => {
    render(
      <CodeWorkspace 
        mapFunctions={[]} 
        handleRemoveBlock={mockHandleRemoveBlock} 
      />
    );

    expect(screen.getByText("Filter function here...")).toBeDefined();
    expect(screen.getByText("Map functions here...")).toBeDefined();
  });

  it("should render the provided filter function", () => {
    render(
      <CodeWorkspace 
        mapFunctions={[]} 
        filterFunction="isRed" 
        handleRemoveBlock={mockHandleRemoveBlock} 
      />
    );

    expect(screen.queryByText("Filter function here...")).toBeNull();
    expect(screen.getByTestId("button-isRed")).toBeDefined();
  });

  it("should render multiple map functions", () => {
    const mapFunctions = ["swap", "faceUp"] as any[];
    render(
      <CodeWorkspace 
        mapFunctions={mapFunctions} 
        handleRemoveBlock={mockHandleRemoveBlock} 
      />
    );

    expect(screen.queryByText("Map functions here...")).toBeNull();
    expect(screen.getByTestId("button-swap")).toBeDefined();
    expect(screen.getByTestId("button-faceUp")).toBeDefined();
  });

  it("should call handleRemoveBlock when a block is removed", () => {
    render(
      <CodeWorkspace 
        mapFunctions={["swap" as any]} 
        filterFunction="isRed" 
        handleRemoveBlock={mockHandleRemoveBlock} 
      />
    );

    // Remove filter
    fireEvent.click(screen.getByTestId("remove-isRed"));
    expect(mockHandleRemoveBlock).toHaveBeenCalledWith("isRed");

    // Remove map
    fireEvent.click(screen.getByTestId("remove-swap"));
    expect(mockHandleRemoveBlock).toHaveBeenCalledWith("swap");
  });

  it("should render the correct code structure", () => {
    render(
      <CodeWorkspace 
        mapFunctions={[]} 
        handleRemoveBlock={mockHandleRemoveBlock} 
      />
    );

    expect(screen.getByText("filter (")).toBeDefined();
    expect(screen.getByText("map (")).toBeDefined();
    expect(screen.getByText(")")).toBeDefined();
    expect(screen.getByText(");")).toBeDefined();
  });

  it("should render accordion sections for filter and map functions", () => {
    render(
      <CodeWorkspace
        mapFunctions={[]}
        handleRemoveBlock={mockHandleRemoveBlock}
        onSelectFilter={mockOnSelectFilter}
        onSelectMap={mockOnSelectMap}
      />
    );

    expect(screen.getByText("Filter Functions")).toBeDefined();
    expect(screen.getByText("Map Functions")).toBeDefined();
  });

  it("should call onSelectFilter when a filter option is clicked", () => {
    render(
      <CodeWorkspace
        mapFunctions={[]}
        handleRemoveBlock={mockHandleRemoveBlock}
        onSelectFilter={mockOnSelectFilter}
        onSelectMap={mockOnSelectMap}
      />
    );

    const isRedButton = screen.getAllByRole("button").find(b => b.textContent?.includes("isRed"));
    expect(isRedButton).toBeDefined();
    if (isRedButton) {
      fireEvent.click(isRedButton);
      expect(mockOnSelectFilter).toHaveBeenCalledWith("isRed");
    }
  });

  it("should call onSelectMap when an available map option is clicked", () => {
    render(
      <CodeWorkspace
        mapFunctions={[]}
        handleRemoveBlock={mockHandleRemoveBlock}
        onSelectFilter={mockOnSelectFilter}
        onSelectMap={mockOnSelectMap}
      />
    );

    const swapButton = screen.getAllByRole("button").find(b => b.textContent?.includes("swap"));
    expect(swapButton).toBeDefined();
    if (swapButton) {
      fireEvent.click(swapButton);
      expect(mockOnSelectMap).toHaveBeenCalledWith("swap");
    }
  });

  it("should disable already selected map functions to prevent duplicates", () => {
    render(
      <CodeWorkspace
        mapFunctions={["swap"]}
        handleRemoveBlock={mockHandleRemoveBlock}
        onSelectFilter={mockOnSelectFilter}
        onSelectMap={mockOnSelectMap}
      />
    );

    const swapButton = screen.getAllByRole("button").find(b => b.textContent?.includes("swap"));
    expect(swapButton).toBeDefined();
    expect(swapButton?.hasAttribute("disabled")).toBe(true);
  });
});
