import React from "react";
import "./RestartPopup.css";

interface RestartPopupProps {
  onRestart: () => void;
  onClose: () => void;
}

const RestartPopup: React.FC<RestartPopupProps> = ({ onRestart, onClose }) => {
  return (
    <div className="restart-popup-overlay" onClick={onClose}>
      <div className="restart-popup-content" onClick={(e) => e.stopPropagation()}>
        <div className="restart-popup-icon">⚠️</div>
        <h2 className="restart-popup-title">Too Many Wrong Attempts!</h2>
        <p className="restart-popup-message">
          You've made 5 wrong attempts. Would you like to restart the game?
        </p>
        <div className="restart-popup-buttons">
          <button 
            className="restart-popup-btn restart-popup-btn-primary" 
            onClick={onRestart}
            aria-label="Restart Game"
          >
            Restart Game
          </button>
          <button 
            className="restart-popup-btn restart-popup-btn-secondary" 
            onClick={onClose}
            aria-label="Continue"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestartPopup;

