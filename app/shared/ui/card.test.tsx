import { render, screen } from "@testing-library/react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "./card";
import { describe, it, expect } from "vitest";
import React from "react";

describe("Card components", () => {
  it("should render Card correctly", () => {
    render(<Card className="custom-card">Card Content</Card>);
    const element = screen.getByText("Card Content");
    expect(element.getAttribute("data-slot")).toBe("card");
    expect(element.className).toContain("custom-card");
    expect(element.className).toContain("bg-card");
  });

  it("should render CardHeader correctly", () => {
    render(<CardHeader className="custom-header">Header Content</CardHeader>);
    const element = screen.getByText("Header Content");
    expect(element.getAttribute("data-slot")).toBe("card-header");
    expect(element.className).toContain("custom-header");
  });

  it("should render CardTitle correctly", () => {
    render(<CardTitle className="custom-title">Title</CardTitle>);
    const element = screen.getByText("Title");
    expect(element.getAttribute("data-slot")).toBe("card-title");
    expect(element.className).toContain("custom-title");
  });

  it("should render CardDescription correctly", () => {
    render(<CardDescription className="custom-desc">Description</CardDescription>);
    const element = screen.getByText("Description");
    expect(element.getAttribute("data-slot")).toBe("card-description");
    expect(element.className).toContain("custom-desc");
  });

  it("should render CardAction correctly", () => {
    render(<CardAction className="custom-action">Action</CardAction>);
    const element = screen.getByText("Action");
    expect(element.getAttribute("data-slot")).toBe("card-action");
    expect(element.className).toContain("custom-action");
  });

  it("should render CardContent correctly", () => {
    render(<CardContent className="custom-content">Content</CardContent>);
    const element = screen.getByText("Content");
    expect(element.getAttribute("data-slot")).toBe("card-content");
    expect(element.className).toContain("custom-content");
  });

  it("should render CardFooter correctly", () => {
    render(<CardFooter className="custom-footer">Footer</CardFooter>);
    const element = screen.getByText("Footer");
    expect(element.getAttribute("data-slot")).toBe("card-footer");
    expect(element.className).toContain("custom-footer");
  });

  it("should render a full card structure correctly", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>My Card</CardTitle>
          <CardDescription>A brief description</CardDescription>
          <CardAction><button>X</button></CardAction>
        </CardHeader>
        <CardContent>Main content here</CardContent>
        <CardFooter>Footer info</CardFooter>
      </Card>
    );

    expect(screen.getByText("My Card")).toBeDefined();
    expect(screen.getByText("A brief description")).toBeDefined();
    expect(screen.getByText("X")).toBeDefined();
    expect(screen.getByText("Main content here")).toBeDefined();
    expect(screen.getByText("Footer info")).toBeDefined();
  });
});
