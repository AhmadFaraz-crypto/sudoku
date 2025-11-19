import React, { useState, useEffect } from "react";
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
  const [shouldHideNumberPad, setShouldHideNumberPad] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth <= 1045;
      const isLandscape = window.innerHeight < window.innerWidth;
      const shouldHide = isMobileDevice && isLandscape;
      setShouldHideNumberPad(shouldHide);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    window.addEventListener("orientationchange", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("orientationchange", checkMobile);
    };
  }, []);

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

      {!shouldHideNumberPad && (
        <div className="number-pad-container">
          <div className="number-pad-label">Number Pad</div>
          <NumberPad />
        </div>
      )}

      <button className="new-game-btn" onClick={onNewGame}>
        New Game
      </button>
    </div>
  );
};

export default GameControls;

