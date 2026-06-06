import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "./input";
import { describe, it, expect, vi } from "vitest";
import React from "react";

describe("Input component", () => {
  it("should render correctly with default props", () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText("Enter text");
    expect(input).toBeDefined();
    expect(input.getAttribute("data-slot")).toBe("input");
  });

  it("should handle different input types", () => {
    const { rerender } = render(<Input type="password" placeholder="Password" />);
    let input = screen.getByPlaceholderText("Password");
    expect(input.getAttribute("type")).toBe("password");

    rerender(<Input type="number" placeholder="Number" />);
    input = screen.getByPlaceholderText("Number");
    expect(input.getAttribute("type")).toBe("number");
  });

  it("should merge custom classNames", () => {
    render(<Input className="custom-input-class" placeholder="Custom" />);
    const input = screen.getByPlaceholderText("Custom");
    expect(input.className).toContain("custom-input-class");
  });

  it("should handle value changes", () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} placeholder="Change" />);
    const input = screen.getByPlaceholderText("Change");
    
    fireEvent.change(input, { target: { value: "new value" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect((input as HTMLInputElement).value).toBe("new value");
  });

  it("should be disabled when the disabled prop is passed", () => {
    render(<Input disabled placeholder="Disabled" />);
    const input = screen.getByPlaceholderText("Disabled");
    expect(input).toBeDisabled();
    expect(input.className).toContain("disabled:opacity-50");
  });

  it("should forward additional props to the input element", () => {
    render(<Input name="test-input" id="test-id" placeholder="Forward" />);
    const input = screen.getByPlaceholderText("Forward");
    expect(input.getAttribute("name")).toBe("test-input");
    expect(input.getAttribute("id")).toBe("test-id");
  });
});
