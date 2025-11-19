import React, { useEffect, useState } from "react";
import "./WinningAnimation.css";

interface WinningAnimationProps {
  onClose?: () => void;
  onNewGame?: () => void;
}

const WinningAnimation: React.FC<WinningAnimationProps> = ({ onClose, onNewGame }) => {
  const [cards, setCards] = useState<Array<{ id: number; left: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    const cardCount = 50;
    const newCards = Array.from({ length: cardCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
    }));
    setCards(newCards);
  }, []);

  return (
    <div className="winning-animation-overlay">
      <div className="winning-message">
        <h2 className="winning-title">🎉 Congratulations! 🎉</h2>
        <p className="winning-subtitle">You've completed the Sudoku puzzle!</p>
        
        <div className="winning-buttons">
          {onClose && (
            <button 
              className="winning-btn winning-btn-cancel" 
              onClick={onClose}
              aria-label="Close"
            >
              Cancel
            </button>
          )}
          {onNewGame && (
            <button 
              className="winning-btn winning-btn-new-game" 
              onClick={onNewGame}
              aria-label="New Game"
            >
              New Game
            </button>
          )}
        </div>
      </div>
      <div className="cards-container">
        {cards.map((card) => (
          <div
            key={card.id}
            className="falling-card"
            style={{
              left: `${card.left}%`,
              animationDelay: `${card.delay}s`,
              animationDuration: `${card.duration}s`,
            }}
          >
            {["🎴", "🎯", "⭐", "🎊", "🎉", "🏆", "💎", "🎁"][Math.floor(Math.random() * 8)]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WinningAnimation;

