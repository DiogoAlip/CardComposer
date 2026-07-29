import { render, screen } from "@testing-library/react";
import { Droppable } from "./Droppable.layout";
import { useDroppable } from "@dnd-kit/core";
import { describe, it, expect, vi } from "vitest";
import React from "react";

// Mock @dnd-kit/core
vi.mock("@dnd-kit/core", () => ({
  useDroppable: vi.fn()
}));

describe("Droppable layout component", () => {
  it("should render correctly and change background when isOver is true", () => {
    const mockSetNodeRef = vi.fn();
    (useDroppable as any).mockReturnValue({
      isOver: true,
      setNodeRef: mockSetNodeRef,
    });

    const { container } = render(
      <Droppable id="test-droppable" className="custom-drop">
        <span>Drop Here</span>
      </Droppable>
    );

    const droppableDiv = container.firstChild as HTMLElement;
    expect(droppableDiv).toBeDefined();
    expect(droppableDiv.className).toContain("bg-primary");
    expect(droppableDiv.className).toContain("custom-drop");
    expect(mockSetNodeRef).toHaveBeenCalled();
  });

  it("should render with default background when isOver is false", () => {
    (useDroppable as any).mockReturnValue({
      isOver: false,
      setNodeRef: vi.fn(),
    });

    const { container } = render(
      <Droppable id="test-droppable">Content</Droppable>
    );

    const droppableDiv = container.firstChild as HTMLElement;
    expect(droppableDiv.className).toContain("bg-white/10");
  });
});
