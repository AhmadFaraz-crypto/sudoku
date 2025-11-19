import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import WinningAnimation from "../WinningAnimation";

describe("WinningAnimation Component", () => {
  test("renders winning title", () => {
    render(<WinningAnimation />);
    const title = screen.getByText(/🎉 Congratulations! 🎉/i);
    expect(title).toBeInTheDocument();
  });

  test("renders subtitle message", () => {
    render(<WinningAnimation />);
    const subtitle = screen.getByText(/You've completed the Sudoku puzzle!/i);
    expect(subtitle).toBeInTheDocument();
  });

  test("renders overlay with correct class", () => {
    const { container } = render(<WinningAnimation />);
    const overlay = container.querySelector(".winning-animation-overlay");
    expect(overlay).toBeInTheDocument();
  });

  test("renders cards container", async () => {
    const { container } = render(<WinningAnimation />);
    await waitFor(() => {
      const cardsContainer = container.querySelector(".cards-container");
      expect(cardsContainer).toBeInTheDocument();
    });
  });

  test("generates falling cards", async () => {
    const { container } = render(<WinningAnimation />);
    await waitFor(() => {
      const fallingCards = container.querySelectorAll(".falling-card");
      expect(fallingCards.length).toBe(50);
    });
  });

  test("winning message has correct structure", () => {
    const { container } = render(<WinningAnimation />);
    const message = container.querySelector(".winning-message");
    expect(message).toBeInTheDocument();
    expect(message).toHaveClass("winning-message");
  });

  test("cards have correct styling attributes", async () => {
    const { container } = render(<WinningAnimation />);
    await waitFor(() => {
      const fallingCard = container.querySelector(".falling-card");
      expect(fallingCard).toBeInTheDocument();
      const style = fallingCard?.getAttribute("style");
      expect(style).toBeTruthy();
      expect(style).toContain("left:");
      expect(style).toContain("animation-delay:");
      expect(style).toContain("animation-duration:");
    });
  });
});

