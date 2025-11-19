import React, { useEffect, useRef } from "react";

interface GameBoardProps {
  onBoardCreated?: () => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ onBoardCreated }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = "";
    createGameBox();
    if (onBoardCreated) {
      onBoardCreated();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createGameBox = () => {
    if (!containerRef.current) return;

    let inputId = 0;
    for (let i = 0; i < 3; i++) {
      const divRowElement = document.createElement("div");
      divRowElement.className = "div-row";
      if (i === 2) {
        divRowElement.style.borderRight = "2px solid black";
      }
      containerRef.current.appendChild(divRowElement);
      for (let j = 0; j < 9; j++) {
        const divColElement = document.createElement("div");
        divColElement.classList.add("col-4");
        if ((j + 1) % 2 !== 0) {
          divColElement.classList.add(`border-${j}`);
        }
        divRowElement.appendChild(divColElement);
        for (let j = 0; j < 3; j++) {
          inputId += 1;
          const inputElement = document.createElement("input");
          inputElement.className = "input-style";
          inputElement.maxLength = 1;
          inputElement.type = "text";
          inputElement.inputMode = "numeric";
          inputElement.setAttribute("id", `${inputId}`);
          inputElement.setAttribute("autocomplete", "off");
          inputElement.setAttribute("title", "");
          inputElement.setAttribute("spellcheck", "false");
          
          inputElement.addEventListener("keydown", (e) => {
            const key = e.key;
            if (
              key === "Backspace" ||
              key === "Delete" ||
              key === "Tab" ||
              key === "Escape" ||
              key === "Enter" ||
              key === "ArrowLeft" ||
              key === "ArrowRight" ||
              key === "ArrowUp" ||
              key === "ArrowDown"
            ) {
              return;
            }
            if (!/^[1-9]$/.test(key)) {
              e.preventDefault();
              return false;
            }
          });
          
          inputElement.addEventListener("paste", (e) => {
            e.preventDefault();
            const paste = (e.clipboardData || (window as any).clipboardData).getData("text");
            const numericValue = paste.replace(/[^1-9]/g, "");
            if (numericValue.length > 0) {
              inputElement.value = numericValue[0];
              const inputEvent = new Event("input", { bubbles: true });
              inputElement.dispatchEvent(inputEvent);
            }
          });
          
          inputElement.addEventListener("input", (e) => {
            const target = e.target as HTMLInputElement;
            const value = target.value;
            const numericValue = value.replace(/[^1-9]/g, "");
            if (numericValue.length > 1) {
              target.value = numericValue[0];
            } else {
              target.value = numericValue;
            }
          });
          
          divColElement.appendChild(inputElement);
        }
      }
    }
  };

  return <div id="container" ref={containerRef}></div>;
};

export default GameBoard;

