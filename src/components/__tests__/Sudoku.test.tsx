import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Sudoku from "../Sudoku";

// Mock the GameBoard and other components to avoid DOM manipulation issues in tests
jest.mock("../GameBoard", () => {
  return function MockGameBoard() {
    return <div data-testid="game-board">Game Board</div>;
  };
});

jest.mock("../NumberPad", () => {
  return function MockNumberPad() {
    return <div data-testid="number-pad">Number Pad</div>;
  };
});

describe("Sudoku Component", () => {
  test("renders Sudoku heading", () => {
    render(<Sudoku />);
    const heading = screen.getByText(/Sudoku/i);
    expect(heading).toBeInTheDocument();
  });

  test("renders difficulty selector", () => {
    render(<Sudoku />);
    const difficultyLabel = screen.getByText(/Difficulty:/i);
    expect(difficultyLabel).toBeInTheDocument();
  });

  test("renders all difficulty levels", () => {
    render(<Sudoku />);
    expect(screen.getByText(/Easy/i)).toBeInTheDocument();
    expect(screen.getByText(/Medium/i)).toBeInTheDocument();
    expect(screen.getByText(/Hard/i)).toBeInTheDocument();
    expect(screen.getByText(/Expert/i)).toBeInTheDocument();
    expect(screen.getByText(/Master/i)).toBeInTheDocument();
    expect(screen.getByText(/Extreme/i)).toBeInTheDocument();
  });

  test("renders game controls", () => {
    render(<Sudoku />);
    const hintButton = screen.getByLabelText(/Hint/i);
    expect(hintButton).toBeInTheDocument();
  });

  test("renders instruction bar", () => {
    render(<Sudoku />);
    const instruction = screen.getByText(
      /Select a cell, then tap a number to fill in the cell/i
    );
    expect(instruction).toBeInTheDocument();
  });
});

