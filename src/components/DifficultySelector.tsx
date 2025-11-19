import React from "react";
import type { Difficulty } from "../types";

interface DifficultySelectorProps {
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  difficulty,
  onDifficultyChange,
}) => {
  const handleDifficultyClick = (selectedDifficulty: Difficulty) => {
    onDifficultyChange(selectedDifficulty);
  };

  return (
    <div className="difficulty-selector">
      <div className="difficulty-bar">
        <span className="difficulty-label">Difficulty:</span>
        <div className="difficulty-buttons">
          <button
            className={`difficulty-btn ${difficulty === "easy" ? "active" : ""}`}
            onClick={() => handleDifficultyClick("easy")}
            aria-label="Easy difficulty"
          >
            Easy
          </button>
          <button
            className={`difficulty-btn ${difficulty === "medium" ? "active" : ""}`}
            onClick={() => handleDifficultyClick("medium")}
            aria-label="Medium difficulty"
          >
            Medium
          </button>
          <button
            className={`difficulty-btn ${difficulty === "hard" ? "active" : ""}`}
            onClick={() => handleDifficultyClick("hard")}
            aria-label="Hard difficulty"
          >
            Hard
          </button>
          <button
            className={`difficulty-btn ${difficulty === "expert" ? "active" : ""}`}
            onClick={() => handleDifficultyClick("expert")}
            aria-label="Expert difficulty"
          >
            Expert
          </button>
          <button
            className={`difficulty-btn ${difficulty === "master" ? "active" : ""}`}
            onClick={() => handleDifficultyClick("master")}
            aria-label="Master difficulty"
          >
            Master
          </button>
          <button
            className={`difficulty-btn ${difficulty === "extreme" ? "active" : ""}`}
            onClick={() => handleDifficultyClick("extreme")}
            aria-label="Extreme difficulty"
          >
            Extreme
          </button>
        </div>
      </div>
    </div>
  );
};

export default DifficultySelector;

