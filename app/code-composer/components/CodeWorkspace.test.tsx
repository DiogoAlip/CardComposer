import { render, screen, fireEvent } from "@testing-library/react";
import { CodeWorkspace } from "./CodeWorkspace";
import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";

describe("CodeWorkspace", () => {
  const mockHandleRemoveBlock = vi.fn();
  const mockOnSelectFilter = vi.fn();
  const mockOnSelectMap = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render accordion sections for filter and map functions", () => {
    render(
      <CodeWorkspace
        mapFunctions={[]}
        handleRemoveBlock={mockHandleRemoveBlock}
      />,
    );

    expect(screen.getByText("Filter Functions")).toBeDefined();
    expect(screen.getByText("Map Functions")).toBeDefined();
  });

  it("should toggle accordion sections when clicked", () => {
    render(
      <CodeWorkspace
        mapFunctions={[]}
        handleRemoveBlock={mockHandleRemoveBlock}
      />,
    );

    expect(screen.queryByText("isRed")).toBeNull();

    // Open Filter accordion
    fireEvent.click(screen.getByText("Filter Functions"));
    expect(screen.getByText("isRed")).toBeDefined();

    // Open Map accordion
    fireEvent.click(screen.getByText("Map Functions"));
    expect(screen.getByText("swap")).toBeDefined();
  });

  it("should render the provided filter function when accordion is open", () => {
    render(
      <CodeWorkspace
        mapFunctions={[]}
        filterFunction="isRed"
        handleRemoveBlock={mockHandleRemoveBlock}
      />,
    );

    fireEvent.click(screen.getByText("Filter Functions"));
    const isRedBtn = screen.getByRole("button", { name: /isRed/i });
    expect(isRedBtn).toBeDefined();
  });

  it("should render multiple map functions when accordion is open", () => {
    const mapFunctions = ["swap", "faceUp"] as any[];
    render(
      <CodeWorkspace
        mapFunctions={mapFunctions}
        handleRemoveBlock={mockHandleRemoveBlock}
      />,
    );

    fireEvent.click(screen.getByText("Map Functions"));
    expect(screen.getByText(/swap/i)).toBeDefined();
    expect(screen.getByText(/faceUp/i)).toBeDefined();
  });

  it("should call handleRemoveBlock when a selected block is removed", () => {
    render(
      <CodeWorkspace
        mapFunctions={["swap" as any]}
        filterFunction="isRed"
        handleRemoveBlock={mockHandleRemoveBlock}
      />,
    );

    // Remove filter (when onSelectFilter is not passed)
    fireEvent.click(screen.getByText("Filter Functions"));
    fireEvent.click(screen.getByRole("button", { name: /isRed/i }));
    expect(mockHandleRemoveBlock).toHaveBeenCalledWith("isRed");

    // Remove map
    fireEvent.click(screen.getByText("Map Functions"));
    fireEvent.click(screen.getByRole("button", { name: /swap/i }));
    expect(mockHandleRemoveBlock).toHaveBeenCalledWith("swap");
  });

  it("should render the correct code structure", () => {
    render(
      <CodeWorkspace
        mapFunctions={[]}
        handleRemoveBlock={mockHandleRemoveBlock}
      />,
    );

    expect(screen.getByText("filter (")).toBeDefined();
    expect(screen.getByText("map (")).toBeDefined();
    expect(screen.getByText(")")).toBeDefined();
    expect(screen.getByText(");")).toBeDefined();
  });

  it("should call onSelectFilter when a filter option is clicked", () => {
    render(
      <CodeWorkspace
        mapFunctions={[]}
        handleRemoveBlock={mockHandleRemoveBlock}
        onSelectFilter={mockOnSelectFilter}
        onSelectMap={mockOnSelectMap}
      />,
    );

    fireEvent.click(screen.getByText("Filter Functions"));
    const isRedButton = screen.getByRole("button", { name: /isRed/i });
    fireEvent.click(isRedButton);
    expect(mockOnSelectFilter).toHaveBeenCalledWith("isRed");
  });

  it("should call onSelectMap when an available map option is clicked", () => {
    render(
      <CodeWorkspace
        mapFunctions={[]}
        handleRemoveBlock={mockHandleRemoveBlock}
        onSelectFilter={mockOnSelectFilter}
        onSelectMap={mockOnSelectMap}
      />,
    );

    fireEvent.click(screen.getByText("Map Functions"));
    const swapButton = screen.getByRole("button", { name: /swap/i });
    fireEvent.click(swapButton);
    expect(mockOnSelectMap).toHaveBeenCalledWith("swap");
  });

  it("should display selected state for selected map functions in accordion", () => {
    render(
      <CodeWorkspace
        mapFunctions={["swap" as any]}
        handleRemoveBlock={mockHandleRemoveBlock}
        onSelectFilter={mockOnSelectFilter}
        onSelectMap={mockOnSelectMap}
      />,
    );

    fireEvent.click(screen.getByText("Map Functions"));
    const swapButton = screen.getByRole("button", { name: /1 swap/i });
    expect(swapButton).toBeDefined();
  });
});
