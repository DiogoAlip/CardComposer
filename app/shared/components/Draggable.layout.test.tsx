import { render, screen } from "@testing-library/react";
import { Draggable } from "./Draggable.layout";
import { useDraggable } from "@dnd-kit/core";
import { describe, it, expect, vi } from "vitest";
import React from "react";

// Mock @dnd-kit/core
vi.mock("@dnd-kit/core", () => ({
  useDraggable: vi.fn()
}));

describe("Draggable layout component", () => {
  it("should render correctly and apply style when transformed", () => {
    const mockSetNodeRef = vi.fn();
    (useDraggable as any).mockReturnValue({
      attributes: { "data-testid": "draggable-attr" },
      listeners: { onMouseDown: vi.fn() },
      setNodeRef: mockSetNodeRef,
      transform: { x: 10, y: 20 }
    });

    render(
      <Draggable id="test-draggable" className="custom-drag">
        <span>Drag Me</span>
      </Draggable>
    );

    const button = screen.getByRole("button");
    expect(button).toBeDefined();
    expect(button.className).toContain("custom-drag");
    expect(button.style.transform).toBe("translate3d(10px, 20px, 0)");
    expect(button.getAttribute("data-testid")).toBe("draggable-attr");
    expect(mockSetNodeRef).toHaveBeenCalled();
  });

  it("should render correctly without transformation", () => {
    (useDraggable as any).mockReturnValue({
      attributes: {},
      listeners: {},
      setNodeRef: vi.fn(),
      transform: null
    });

    render(<Draggable id="test-draggable">Content</Draggable>);
    const button = screen.getByRole("button");
    expect(button.style.transform).toBe("");
  });
});
