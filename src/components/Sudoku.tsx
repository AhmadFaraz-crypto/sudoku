import React, { useEffect, useState, useRef } from "react";
import {
  col_1_ids,
  col_2_ids,
  col_3_ids,
  col_4_ids,
  col_5_ids,
  col_6_ids,
  col_7_ids,
  col_8_ids,
  col_9_ids,
} from "../constants/cols";
import {
  row_1_ids,
  row_2_ids,
  row_3_ids,
  row_4_ids,
  row_5_ids,
  row_6_ids,
  row_7_ids,
  row_8_ids,
  row_9_ids,
} from "../constants/rows";
import { easyPatterns, mediumPatterns, hardPatterns, expertPatterns, masterPatterns, extremePatterns } from "../constants/patterns";
import { removeDuplicates } from "../utils";
import type { Difficulty, DifficultyConfig } from "../types";
import GameBoard from "./GameBoard";
import DifficultySelector from "./DifficultySelector";
import RestartPopup from "./RestartPopup";
import GameControls from "./GameControls";
import WinningAnimation from "./WinningAnimation";
import OrientationPrompt from "./OrientationPrompt";

const Sudoku: React.FC = () => {
  const [idsLength, setIdsLength] = useState<any[]>([]);
  const [boardReady, setBoardReady] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [wrongAttempts, setWrongAttempts] = useState<number>(0);
  const [showRestartPopup, setShowRestartPopup] = useState<boolean>(false);
  const [hintCount, setHintCount] = useState<number>(3);
  const [isPortrait, setIsPortrait] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const filledIdsRef = useRef<any[]>([]);
  const wrongValRef = useRef<any[]>([]);
  const inputIdRef = useRef<string>("");
  const currentPatternRef = useRef<any>(null);
  const revealedCellsRef = useRef<Set<number>>(new Set());
  const isInitializingRef = useRef<boolean>(false);

  const difficultyConfig: Record<Difficulty, DifficultyConfig> = {
    easy: { minCells: 40, maxCells: 45, label: "Easy" },
    medium: { minCells: 30, maxCells: 35, label: "Medium" },
    hard: { minCells: 20, maxCells: 25, label: "Hard" },
    expert: { minCells: 17, maxCells: 19, label: "Expert" },
    master: { minCells: 15, maxCells: 17, label: "Master" },
    extreme: { minCells: 13, maxCells: 15, label: "Extreme" },
  };

  const handleBoardCreated = () => {
    setBoardReady(true);
  };

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    if (boardReady) {
      clearAllValues(newDifficulty);
    }
  };

  useEffect(() => {
    if (boardReady && !isInitializingRef.current) {
      isInitializingRef.current = true;
      clearAllValues();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardReady]);

  useEffect(() => {
    const checkOrientation = () => {
      const isPortraitMode = window.innerHeight > window.innerWidth;
      const isMobileDevice = window.innerWidth <= 1045;
      setIsPortrait(isPortraitMode);
      setIsMobile(isMobileDevice);
    };

    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);

    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
    };
  }, []);

  useEffect(() => {
    if ((!isPortrait || !isMobile) && boardReady && !isInitializingRef.current) {
      const hasValues = filledIdsRef.current.length > 0;
      const hasInitialValues = Array.from({ length: 81 }, (_, i) => {
        const element = document.getElementById(`${i + 1}`) as HTMLInputElement;
        return element && element.value !== "";
      }).some(Boolean);
      
      if (!hasValues && !hasInitialValues) {
        isInitializingRef.current = true;
        setTimeout(() => {
          newGame();
        }, 200);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPortrait, isMobile, boardReady]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(
          e.code
        ) > -1
      ) {
        e.preventDefault();
        return;
      }
    };

    // eslint-disable-next-line no-restricted-globals
    addEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line no-restricted-globals
    addEventListener("input", (event) => {
      checkValue(event);
    });
    
    return () => {
      // eslint-disable-next-line no-restricted-globals
      removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    addEventListener("click", (event: any) => {
      if (event.target.id) {
        if (!isNaN(event.target.id)) {
          const cellId = Number(event.target.id);
          onClick(cellId);
          inputIdRef.current = event.target.id;
        }
      } else if (event.target.localName === "button") {
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        if (numbers.includes(Number(event.target.value))) {
          let e = {
            ...event,
            target: { id: inputIdRef.current },
            value: event.target.value,
          };
          const elementId = document.getElementById(
            `${inputIdRef.current}`
          ) as HTMLInputElement;
          if (inputIdRef.current) {
            elementId.value = event.target.value;
          }
          inputIdRef.current = "";
          checkValue(e);
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setColor = (id: string, color: string) => {
    const values = removeDuplicates(wrongValRef.current);
    const eleId = document.getElementById(`${id}`) as HTMLInputElement;
    if (!values.includes(String(id))) {
      if (color === "completed") {
        eleId.style.backgroundColor = "#cbd5e0";
        eleId.style.color = "#2d3748";
      } else if (color === "mercuryCol") {
        eleId.setAttribute("color", "mercuryCol");
        eleId.style.backgroundColor = "#e2e8f0";
        eleId.style.color = "#4a5568";
      } else if (color === "mercuryRow") {
        eleId.setAttribute("color", "mercuryRow");
        eleId.style.backgroundColor = "#e2e8f0";
        eleId.style.color = "#4a5568";
      } else {
        return null;
      }
    }
  };

  const highLightArea = (id: number) => {
    let countFirstColHighlighted = id;
    let countSecondColHighlighted = id;
    let countFirstRowHighlighted = id;
    let countSecondRowHighlighted = id;
    for (let index = 0; index < 9; index++) {
      if (!col_1_ids.includes(countFirstColHighlighted)) {
        countFirstColHighlighted = countFirstColHighlighted - 3;
        setColor(String(countFirstColHighlighted), "mercuryCol");
      }
      if (!row_1_ids.includes(countFirstRowHighlighted)) {
        if (id <= 27 || countFirstRowHighlighted <= 27) {
          countFirstRowHighlighted = countFirstRowHighlighted - 1;
        } else if (id <= 52 || countFirstRowHighlighted <= 52) {
          if (row_4_ids.includes(countFirstRowHighlighted)) {
            countFirstRowHighlighted = countFirstRowHighlighted - 25;
          } else {
            countFirstRowHighlighted = countFirstRowHighlighted - 1;
          }
        } else {
          if (row_7_ids.includes(countFirstRowHighlighted)) {
            countFirstRowHighlighted = countFirstRowHighlighted - 25;
          } else {
            countFirstRowHighlighted = countFirstRowHighlighted - 1;
          }
        }
        setColor(String(countFirstRowHighlighted), "mercuryRow");
      }
      if (!col_9_ids.includes(countSecondColHighlighted)) {
        countSecondColHighlighted = countSecondColHighlighted + 3;
        setColor(String(countSecondColHighlighted), "mercuryCol");
      }
      if (!row_9_ids.includes(countSecondRowHighlighted)) {
        if (countSecondRowHighlighted % 3 === 0) {
          countSecondRowHighlighted = countSecondRowHighlighted + 25;
        } else {
          countSecondRowHighlighted = countSecondRowHighlighted + 1;
        }
        setColor(String(countSecondRowHighlighted), "mercuryRow");
      }
    }
  };

  const activeCell = (first: number, last: number, id: number) => {
    for (let index = first; index < last; index++) {
      if (index + 1 !== id) {
        setColor(`${index + 1}`, "mercuryCol");
      }
    }
  };

  const removeHighLightCssClasses = () => {
    const values = removeDuplicates(wrongValRef.current);
    for (let index = 1; index <= 81; index++) {
      const eleId = document.getElementById(`${index}`) as HTMLInputElement;
      if (filledIdsRef.current.includes(String(index))) {
        eleId.style.backgroundColor = "#cbd5e0";
        eleId.style.color = "#2d3748";
      } else {
        if (!values.includes(String(index))) {
          eleId.style.color = "";
          const filterData = values.filter((i) => i !== String(index));
          wrongValRef.current = filterData;
        }
        eleId.setAttribute("color", "null");
        eleId.style.backgroundColor = "";
      }
    }
  };

  const onClick = (id: number) => {
    removeHighLightCssClasses();
    const eleId = document.getElementById(`${id}`) as HTMLInputElement;
    eleId.setAttribute("color", "silverSolidBox");
    eleId.style.backgroundColor = "#cbd5e0";
    highLightArea(id);
    if (id >= 1 && id <= 9) {
      activeCell(0, 9, id);
    } else if (id >= 9 && id <= 18) {
      activeCell(9, 18, id);
    } else if (id >= 18 && id <= 27) {
      activeCell(18, 27, id);
    } else if (id >= 27 && id <= 36) {
      activeCell(27, 36, id);
    } else if (id >= 36 && id <= 45) {
      activeCell(36, 45, id);
    } else if (id >= 45 && id <= 54) {
      activeCell(45, 54, id);
    } else if (id >= 54 && id <= 63) {
      activeCell(54, 63, id);
    } else if (id >= 63 && id <= 72) {
      activeCell(63, 72, id);
    } else if (id >= 72 && id <= 81) {
      activeCell(72, 81, id);
    } else {
      return;
    }
  };

  const countIds = () => {
    const count: any[] = [];
    filledIdsRef.current.forEach((element: any) => {
      if (!count.includes(element)) {
        count.push(element);
      }
    });
    setIdsLength(count);
  };

  const checkValue = (event: any) => {
    const values = removeDuplicates(wrongValRef.current);
    const elementId = document.getElementById(
      `${event.target.id}`
    ) as HTMLInputElement;
    if (event.target.id && currentPatternRef.current) {
      if (elementId.value.length) {
        const numericValue = elementId.value.replace(/[^1-9]/g, "");
        if (numericValue.length > 0) {
          elementId.value = numericValue[0];
        } else {
          elementId.value = "";
          return;
        }
        const currentPattern = currentPatternRef.current;
        const cellId = Number(event.target.id);
        const enteredValue = Number(elementId.value);
        
        let correctValue: number | null = null;
        for (let index = 0; index < currentPattern.length; index++) {
          const col = currentPattern[index];
          const keys = Object.keys(col);
          for (let keyIndex = 0; keyIndex < keys.length; keyIndex++) {
            const key = keys[keyIndex];
            if (key.startsWith("col_") && col[key]) {
              for (let j = 0; j < col[key].length; j++) {
                if (col[key][j].id === cellId) {
                  correctValue = col[key][j].val;
                  break;
                }
              }
            }
            if (correctValue !== null) break;
          }
          if (correctValue !== null) break;
        }
        
        if (correctValue !== null) {
          if (correctValue !== enteredValue) {
            elementId.style.color = "red";
            const cellIdString = String(cellId);
            const lastValue = elementId.getAttribute("data-last-value");
            const isNewValue = lastValue !== elementId.value;
            
            if (!wrongValRef.current.includes(cellIdString)) {
              wrongValRef.current.push(cellIdString);
            }
            
            if (isNewValue) {
              setWrongAttempts((prev) => {
                const newCount = prev + 1;
                if (newCount >= 5) {
                  setShowRestartPopup(true);
                }
                return newCount;
              });
              elementId.setAttribute("data-last-value", elementId.value);
            }
          } else {
            elementId.style.color = "";
            elementId.removeAttribute("data-last-value");
            const filterData = values.filter(
              (i) => i !== String(cellId)
            );
            wrongValRef.current = filterData;
            checkCompletedCells();
            countIds();
          }
        }
      }
    }
  };

  const randomObjRef = useRef<any[]>([]);

  const clearAllValues = (newDifficulty?: Difficulty) => {
    setIdsLength([]);
    
    for (let index = 1; index <= 81; index++) {
      const element = document.getElementById(`${index}`) as HTMLInputElement;
      if (element) {
        element.value = "";
        element.style.color = "";
        element.style.fontWeight = "";
        element.removeAttribute("data-hint");
        element.setAttribute("title", "");
        element.removeAttribute("data-last-value");
      }
    }
    
    filledIdsRef.current = [];
    wrongValRef.current = [];
    setWrongAttempts(0);
    setShowRestartPopup(false);
    setHintCount(3);
    revealedCellsRef.current.clear();
    
    const difficultyToUse: Difficulty = newDifficulty || difficulty || "easy";
    setTimeout(() => {
      newGame(difficultyToUse);
    }, 50);
  };

  const newGame = (gameDifficulty?: Difficulty) => {
    let currentDifficulty: Difficulty = "easy";
    if (gameDifficulty && typeof gameDifficulty === "string" && gameDifficulty.length > 0) {
      currentDifficulty = gameDifficulty;
    } else if (difficulty && typeof difficulty === "string" && difficulty.length > 0) {
      currentDifficulty = difficulty;
    }
    
    for (let index = 1; index <= 81; index++) {
      const element = document.getElementById(`${index}`) as HTMLInputElement;
      if (element) {
        element.value = "";
        element.style.color = "";
        element.style.fontWeight = "";
        element.removeAttribute("data-hint");
        element.setAttribute("title", "");
        element.removeAttribute("data-last-value");
      }
    }
    
    filledIdsRef.current = [];
    wrongValRef.current = [];
    let patterns: any[];
    if (currentDifficulty === "easy") {
      patterns = easyPatterns;
    } else if (currentDifficulty === "medium") {
      patterns = mediumPatterns;
    } else if (currentDifficulty === "hard") {
      patterns = hardPatterns;
    } else if (currentDifficulty === "expert") {
      patterns = expertPatterns;
    } else if (currentDifficulty === "master") {
      patterns = masterPatterns;
    } else {
      patterns = extremePatterns;
    }
    
    if (!patterns || patterns.length === 0) {
      console.error("No patterns available for difficulty:", currentDifficulty);
      return;
    }
    
    const selectedPattern =
      patterns[Math.floor(Math.random() * patterns.length)];
    currentPatternRef.current = selectedPattern;

    const allCellsMap = new Map<number, { id: number; val: number }>();
    for (let patternIndex = 0; patternIndex < selectedPattern.length; patternIndex++) {
      const col = selectedPattern[patternIndex];
      const keys = Object.keys(col);
      for (let keyIndex = 0; keyIndex < keys.length; keyIndex++) {
        const key = keys[keyIndex];
        if (key.startsWith("col_") && col[key]) {
          for (let cellIndex = 0; cellIndex < col[key].length; cellIndex++) {
            const cell = col[key][cellIndex];
            allCellsMap.set(cell.id, cell);
          }
        }
      }
    }
    const allCells = Array.from(allCellsMap.values());

    const shuffledCells = [...allCells].sort(() => Math.random() - 0.5);

    const config = difficultyConfig[currentDifficulty];
    if (!config) {
      console.error("No config found for difficulty:", currentDifficulty);
      return;
    }
    const targetCells =
      Math.floor(Math.random() * (config.maxCells - config.minCells + 1)) +
      config.minCells;

    randomObjRef.current = shuffledCells.slice(0, targetCells);

    const initialFilledIds = new Set<number>();
    randomObjRef.current.forEach((cell) => {
      initialFilledIds.add(cell.id);
    });

    for (let index = 0; index < randomObjRef.current.length; index++) {
      const elementId = document.getElementById(
        `${randomObjRef.current[index].id}`
      ) as HTMLInputElement;
      if (elementId) {
        elementId.value = String(randomObjRef.current[index].val);
        elementId.style.color = "#333";
        elementId.style.fontWeight = "";
        elementId.removeAttribute("data-hint");
        elementId.setAttribute("title", "");
        initialFilledIds.add(randomObjRef.current[index].id);
        if (index === 0) {
          onClick(Number(randomObjRef.current[index].id));
        }
      }
    }
    
    revealedCellsRef.current = initialFilledIds;
    setHintCount(3);
    isInitializingRef.current = false;
  };

  const handleHint = () => {
    if (!currentPatternRef.current || hintCount <= 0) return;

    const allCellsMap = new Map<number, { id: number; val: number }>();
    for (let patternIndex = 0; patternIndex < currentPatternRef.current.length; patternIndex++) {
      const col = currentPatternRef.current[patternIndex];
      const keys = Object.keys(col);
      for (let keyIndex = 0; keyIndex < keys.length; keyIndex++) {
        const key = keys[keyIndex];
        if (key.startsWith("col_") && col[key]) {
          for (let cellIndex = 0; cellIndex < col[key].length; cellIndex++) {
            const cell = col[key][cellIndex];
            allCellsMap.set(cell.id, cell);
          }
        }
      }
    }
    const allCells = Array.from(allCellsMap.values());

    const emptyCells = allCells.filter((cell) => {
      if (revealedCellsRef.current.has(cell.id)) {
        return false;
      }
      const elementId = document.getElementById(
        `${cell.id}`
      ) as HTMLInputElement;
      return elementId && !elementId.value;
    });

    if (emptyCells.length === 0) {
      return;
    }

    const randomCell =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];

    const elementId = document.getElementById(
      `${randomCell.id}`
    ) as HTMLInputElement;
    if (elementId) {
      elementId.value = String(randomCell.val);
      elementId.style.color = "#667eea";
      elementId.style.fontWeight = "600";
      elementId.setAttribute("data-hint", "true");
      revealedCellsRef.current.add(randomCell.id);
      setHintCount((prev) => Math.max(0, prev - 1));
      if (!filledIdsRef.current.includes(String(randomCell.id))) {
        setColor(String(randomCell.id), "completed");
        filledIdsRef.current.push(String(randomCell.id));
        checkCompletedCells();
        countIds();
      }
    }
  };


  const filledCells = (start: number, end: number) => {
    const count: any[] = [];
    for (let index = start; index <= end; index++) {
      const element = document.getElementById(`${index}`) as HTMLInputElement;
      if (element?.value) {
        count.push(element.id);
      }
    }
    if (count.length === 9) {
      for (let index = 0; index < count.length; index++) {
        if (!filledIdsRef.current.includes(count[index])) {
          setColor(count[index], "completed");
          filledIdsRef.current.push(count[index]);
        }
      }
    }
  };

  const filledRowsAndCols = (row: any) => {
    const count: any[] = [];
    for (let index = 0; index < 9; index++) {
      const element = document.getElementById(
        `${row[index]}`
      ) as HTMLInputElement;
      if (element?.value) {
        count.push(element.id);
      }
    }
    if (count.length === 9) {
      for (let index = 0; index < count.length; index++) {
        if (!filledIdsRef.current.includes(count[index])) {
          setColor(count[index], "completed");
          filledIdsRef.current.push(count[index]);
        }
      }
    }
  };

  const checkCompletedCells = () => {
    filledCells(1, 9);
    filledCells(9, 18);
    filledCells(19, 27);
    filledCells(28, 36);
    filledCells(37, 45);
    filledCells(46, 54);
    filledCells(55, 63);
    filledCells(64, 72);
    filledCells(73, 81);
    filledRowsAndCols(row_1_ids);
    filledRowsAndCols(row_2_ids);
    filledRowsAndCols(row_3_ids);
    filledRowsAndCols(row_4_ids);
    filledRowsAndCols(row_5_ids);
    filledRowsAndCols(row_6_ids);
    filledRowsAndCols(row_7_ids);
    filledRowsAndCols(row_8_ids);
    filledRowsAndCols(row_9_ids);
    filledRowsAndCols(col_1_ids);
    filledRowsAndCols(col_2_ids);
    filledRowsAndCols(col_3_ids);
    filledRowsAndCols(col_4_ids);
    filledRowsAndCols(col_5_ids);
    filledRowsAndCols(col_6_ids);
    filledRowsAndCols(col_7_ids);
    filledRowsAndCols(col_8_ids);
    filledRowsAndCols(col_9_ids);
    
    checkIfGameWon();
  };

  const checkIfGameWon = () => {
    if (!currentPatternRef.current) return;
    
    setTimeout(() => {
      let filledCount = 0;
      let correctCount = 0;
      let hasWrongValue = false;
      
      for (let cellId = 1; cellId <= 81; cellId++) {
        const element = document.getElementById(`${cellId}`) as HTMLInputElement;
        if (element?.value) {
          filledCount++;
          
          const enteredValue = Number(element.value);
          let correctValue: number | null = null;
          
          for (let index = 0; index < currentPatternRef.current.length; index++) {
            const col = currentPatternRef.current[index];
            const keys = Object.keys(col);
            for (let keyIndex = 0; keyIndex < keys.length; keyIndex++) {
              const key = keys[keyIndex];
              if (key.startsWith("col_") && col[key]) {
                for (let j = 0; j < col[key].length; j++) {
                  if (col[key][j].id === cellId) {
                    correctValue = col[key][j].val;
                    break;
                  }
                }
              }
              if (correctValue !== null) break;
            }
            if (correctValue !== null) break;
          }
          
          if (correctValue !== null && correctValue === enteredValue) {
            if (element.style.color === "red") {
              hasWrongValue = true;
            } else {
              correctCount++;
            }
          } else {
            hasWrongValue = true;
          }
        }
      }
      
      if (filledCount === 81 && correctCount === 81 && !hasWrongValue) {
        setIdsLength(Array(81).fill(0));
      }
    }, 100);
  };

  return (
    <div className="sudoku-app">
      <OrientationPrompt />
      {(!isPortrait || !isMobile) && (
        <>
          <div className="heading">
            <h1>Sudoku</h1>
          </div>
          <div className="game-layout">
            <div id="main-container">
              <DifficultySelector
                difficulty={difficulty}
                onDifficultyChange={handleDifficultyChange}
              />
              {idsLength.length === 81 ? (
                <>
                  <div className="success-message">
                    <h3>Congratulations, You have completed this game!</h3>
                  </div>
                  <WinningAnimation 
                    onClose={() => setIdsLength([])}
                    onNewGame={clearAllValues}
                  />
                </>
              ) : (
                <div className="game-content">
                  <div className="game-board-section">
                    <GameBoard onBoardCreated={handleBoardCreated} />
                  </div>
                  <GameControls
                    onHint={handleHint}
                    onNewGame={clearAllValues}
                    wrongAttempts={wrongAttempts}
                    hintCount={hintCount}
                  />
                </div>
              )}
            </div>
          </div>
          {showRestartPopup && (
            <RestartPopup
              onRestart={clearAllValues}
              onClose={() => setShowRestartPopup(false)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Sudoku;
