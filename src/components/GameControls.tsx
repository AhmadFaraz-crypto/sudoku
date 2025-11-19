import React from "react";
import NumberPad from "./NumberPad";

interface GameControlsProps {
  onHint: () => void;
  onNewGame: () => void;
  wrongAttempts: number;
  hintCount?: number;
}

const GameControls: React.FC<GameControlsProps> = ({
  onHint,
  onNewGame,
  wrongAttempts,
  hintCount = 3,
}) => {
  return (
    <div className="game-controls-panel">
      <div className="action-buttons">
        <button 
          className="action-btn hint-action-btn" 
          onClick={onHint}
          disabled={hintCount <= 0}
          aria-label="Hint"
        >
          <span className="action-icon">💡</span>
          {hintCount > 0 && <span className="hint-badge">{hintCount}</span>}
        </button>
        <button 
          className="action-btn mistakes-action-btn" 
          disabled
          aria-label="Mistakes"
        >
          <span className="action-icon">❌</span>
          {wrongAttempts > 0 && <span className="mistakes-badge">{wrongAttempts}</span>}
        </button>
      </div>

      <div className="number-pad-container">
        <div className="number-pad-label">Number Pad</div>
        <NumberPad />
      </div>

      <button className="new-game-btn" onClick={onNewGame}>
        New Game
      </button>
    </div>
  );
};

export default GameControls;

