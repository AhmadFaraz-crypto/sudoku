import React, { useEffect, useState } from "react";
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
import { pattern_1 } from "../constants/patterns";

// all filled cells
let filledIds = [] as any[];
// wrongValue
let wrongVal = [] as any[];
// all input Ids
let inputId: string;
const Sudoku = () => {
  const [idsLength, setIdsLength] = useState<any>([]);
  useEffect(() => {
    const containerId = document.getElementById("container") as HTMLDivElement;
    const btnId = document.getElementById("btns") as HTMLButtonElement;
    if (containerId) {
      containerId.innerHTML = "";
    }
    if (btnId) {
      btnId.innerHTML = "";
    }
    createGameBox();
  }, []);

  // creating dynamically cells
  const createGameBox = () => {
    const containerId = document.getElementById("container") as HTMLDivElement;
    const btnId = document.getElementById("btns") as HTMLButtonElement;

    let inputId = 0;
    let btnNumber = 0;
    for (let i = 0; i < 3; i++) {
      const divRowElement = document.createElement("div");
      divRowElement.className = "div-row";
      if (i === 2) {
        divRowElement.style.borderRight = "2px solid black";
      }
      containerId.appendChild(divRowElement);
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
          inputElement.type = "number";
          inputElement.setAttribute("id", `${inputId}`);
          divColElement.appendChild(inputElement);
        }
      }
    }

    for (let i = 0; i < 1; i++) {
      const divRowElement = document.createElement("div");
      divRowElement.classList.add("row");
      divRowElement.classList.add("btn-row");
      btnId.appendChild(divRowElement);
      for (let j = 0; j < 3; j++) {
        const divColElement = document.createElement("div");
        divColElement.classList.add("col-12");
        divRowElement.appendChild(divColElement);
        for (let k = 0; k < 3; k++) {
          btnNumber += 1;
          const buttonElement = document.createElement("button");
          buttonElement.value = String(btnNumber);
          buttonElement.innerHTML = String(btnNumber);
          divColElement.appendChild(buttonElement);
        }
      }
    }
  };

  const removeDuplicates = (arr: any) => {
    let newArr = [] as any[];
    arr.forEach((element: any) => {
      if (!newArr.includes(element)) {
        newArr.push(element);
      }
    });
    return newArr;
  };

  // added colors according to active cell
  const setColor = (id: string, color: string) => {
    const values = removeDuplicates(wrongVal);
    const eleId = document.getElementById(`${id}`) as HTMLInputElement;
    if (!values.includes(String(id))) {
      if (color === "completed") {
        eleId.style.backgroundColor = "#C0C0C0";
        eleId.style.color = "#000";
      } else if (color === "mercuryCol") {
        eleId.setAttribute("color", "mercuryCol");
        eleId.style.backgroundColor = "#5f6368";
        eleId.style.color = "#e8eaed";
      } else if (color === "mercuryRow") {
        eleId.setAttribute("color", "mercuryRow");
        eleId.style.backgroundColor = "#5f6368";
        eleId.style.color = "#e8eaed";
      } else {
        return null;
      }
    }
  };

  // highlight cells for other columns and rows
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

  // active cells box
  const activeCell = (first: number, last: number, id: number) => {
    for (let index = first; index < last; index++) {
      if (index + 1 !== id) {
        setColor(`${index + 1}`, "mercuryCol");
      }
    }
  };

  // remove highlighted classes on changing
  const removeHighLightCssClasses = () => {
    const values = removeDuplicates(wrongVal);
    for (let index = 1; index <= 81; index++) {
      const eleId = document.getElementById(`${index}`) as HTMLInputElement;
      if (filledIds.includes(String(index))) {
        eleId.style.backgroundColor = "#C0C0C0";
        eleId.style.color = "#000";
      } else {
        if (!values.includes(String(index))) {
          eleId.style.color = "";
          const filterData = values.filter((i) => i !== String(index));
          wrongVal = filterData;
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
    eleId.style.backgroundColor = "#C0C0C0";
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
    let count = [] as any[];
    filledIds.forEach((element: any) => {
      if (!count.includes(element)) {
        count.push(element);
      }
    });
    setIdsLength(count);
  };

  const checkValue = (event: any) => {
    const values = removeDuplicates(wrongVal);
    const elementId = document.getElementById(
      `${event.target.id}`
    ) as HTMLInputElement;
    if (event.target.id) {
      if (elementId.value.length) {
        elementId.value = elementId.value[0];
        for (let index = 0; index < pattern_1.length; index++) {
          const col_1 = pattern_1[index].col_1;
          if (col_1) {
            for (let j = 0; j < col_1.length; j++) {
              if (col_1[j].id === Number(event.target.id)) {
                if (col_1[j].val !== Number(elementId.value)) {
                  elementId.style.color = "red";
                  wrongVal.push(event.target.id);
                } else {
                  elementId.style.color = "";
                  const filterData = values.filter(
                    (i) => i !== String(col_1[j].id)
                  );
                  wrongVal = filterData;
                  checkCompletedCells();
                  countIds();
                }
                return;
              }
            }
          }
          const col_2 = pattern_1[index].col_2 as any;
          if (col_2) {
            for (let j = 0; j < col_2.length; j++) {
              if (col_2[j].id === Number(event.target.id)) {
                if (col_2[j].val !== Number(elementId.value)) {
                  elementId.style.color = "red";
                  wrongVal.push(event.target.id);
                } else {
                  elementId.style.color = "";
                  const filterData = values.filter(
                    (i) => i !== String(col_2[j].id)
                  );
                  wrongVal = filterData;
                  checkCompletedCells();
                  countIds();
                }
                return;
              }
            }
          }
          const col_3 = pattern_1[index].col_3 as any;
          if (col_3) {
            for (let j = 0; j < col_3.length; j++) {
              if (col_3[j].id === Number(event.target.id)) {
                if (col_3[j].val !== Number(elementId.value)) {
                  elementId.style.color = "red";
                  wrongVal.push(event.target.id);
                } else {
                  elementId.style.color = "";
                  const filterData = values.filter(
                    (i) => i !== String(col_3[j].id)
                  );
                  wrongVal = filterData;
                  checkCompletedCells();
                  countIds();
                }
                return;
              }
            }
          }
          const col_4 = pattern_1[index].col_4 as any;
          if (col_4) {
            for (let j = 0; j < col_4.length; j++) {
              if (col_4[j].id === Number(event.target.id)) {
                if (col_4[j].val !== Number(elementId.value)) {
                  elementId.style.color = "red";
                  wrongVal.push(event.target.id);
                } else {
                  elementId.style.color = "";
                  const filterData = values.filter(
                    (i) => i !== String(col_4[j].id)
                  );
                  wrongVal = filterData;
                  checkCompletedCells();
                  countIds();
                }
                return;
              }
            }
          }
          const col_5 = pattern_1[index].col_5 as any;
          if (col_5) {
            for (let j = 0; j < col_5.length; j++) {
              if (col_5[j].id === Number(event.target.id)) {
                if (col_5[j].val !== Number(elementId.value)) {
                  elementId.style.color = "red";
                  wrongVal.push(event.target.id);
                } else {
                  elementId.style.color = "";
                  const filterData = values.filter(
                    (i) => i !== String(col_5[j].id)
                  );
                  wrongVal = filterData;
                  checkCompletedCells();
                  countIds();
                }
                return;
              }
            }
          }
          const col_6 = pattern_1[index].col_6 as any;
          if (col_6) {
            for (let j = 0; j < col_6.length; j++) {
              if (col_6[j].id === Number(event.target.id)) {
                if (col_6[j].val !== Number(elementId.value)) {
                  elementId.style.color = "red";
                  wrongVal.push(event.target.id);
                } else {
                  elementId.style.color = "";
                  const filterData = values.filter(
                    (i) => i !== String(col_6[j].id)
                  );
                  wrongVal = filterData;
                  checkCompletedCells();
                  countIds();
                }
                return;
              }
            }
          }
          const col_7 = pattern_1[index].col_7 as any;
          if (col_7) {
            for (let j = 0; j < col_7.length; j++) {
              if (col_7[j].id === Number(event.target.id)) {
                if (col_7[j].val !== Number(elementId.value)) {
                  elementId.style.color = "red";
                  wrongVal.push(event.target.id);
                } else {
                  elementId.style.color = "";
                  const filterData = values.filter(
                    (i) => i !== String(col_7[j].id)
                  );
                  wrongVal = filterData;
                  checkCompletedCells();
                  countIds();
                }
                return;
              }
            }
          }
          const col_8 = pattern_1[index].col_8 as any;
          if (col_8) {
            for (let j = 0; j < col_8.length; j++) {
              if (col_8[j].id === Number(event.target.id)) {
                if (col_8[j].val !== Number(elementId.value)) {
                  elementId.style.color = "red";
                  wrongVal.push(event.target.id);
                } else {
                  elementId.style.color = "";
                  const filterData = values.filter(
                    (i) => i !== String(col_8[j].id)
                  );
                  wrongVal = filterData;
                  checkCompletedCells();
                  countIds();
                }
                return;
              }
            }
          }
          const col_9 = pattern_1[index].col_9 as any;
          if (col_9) {
            for (let j = 0; j < col_9.length; j++) {
              if (col_9[j].id === Number(event.target.id)) {
                if (col_9[j].val !== Number(elementId.value)) {
                  elementId.style.color = "red";
                  wrongVal.push(event.target.id);
                } else {
                  elementId.style.color = "";
                  const filterData = values.filter(
                    (i) => i !== String(col_9[j].id)
                  );
                  wrongVal = filterData;
                  checkCompletedCells();
                  countIds();
                }
                return;
              }
            }
          }
        }
      }
    }
  };

  // collecting random objects for showing on UI
  let randomObj = [] as any[];

  const clearAllValues = () => {
    for (let index = 1; index <= 81; index++) {
      const element = document.getElementById(`${index}`) as HTMLInputElement;
      element.value = "";
      element.style.color = "";
    }
    filledIds = [];
    newGame();
    setIdsLength([]);
    wrongVal = [];
  };

  const addRandomItems = (item: { id: number; val: number }) => {
    if (randomObj.length <= 25) {
      if (!randomObj.includes(item)) {
        randomObj.push(item);
      }
    }
  };

  const newGame = () => {
    randomObj = [];
    for (let index = 0; index < 6; index++) {
      if (pattern_1[0].col_1) {
        const item =
          pattern_1[0].col_1[
            Math.floor(Math.random() * pattern_1[0].col_1.length)
          ];
        addRandomItems(item);
      }
      if (pattern_1[1].col_2) {
        const item =
          pattern_1[1].col_2[
            Math.floor(Math.random() * pattern_1[1].col_2.length)
          ];
        addRandomItems(item);
      }
      if (pattern_1[2].col_3) {
        const item =
          pattern_1[2].col_3[
            Math.floor(Math.random() * pattern_1[2].col_3.length)
          ];
        addRandomItems(item);
      }
      if (pattern_1[3].col_4) {
        const item =
          pattern_1[3].col_4[
            Math.floor(Math.random() * pattern_1[3].col_4.length)
          ];
        addRandomItems(item);
      }
      if (pattern_1[4].col_5) {
        const item =
          pattern_1[4].col_5[
            Math.floor(Math.random() * pattern_1[4].col_5.length)
          ];
        addRandomItems(item);
      }
      if (pattern_1[5].col_6) {
        const item =
          pattern_1[5].col_6[
            Math.floor(Math.random() * pattern_1[5].col_6.length)
          ];
        addRandomItems(item);
      }
      if (pattern_1[6].col_7) {
        const item =
          pattern_1[6].col_7[
            Math.floor(Math.random() * pattern_1[6].col_7.length)
          ];
        addRandomItems(item);
      }
      if (pattern_1[7].col_8) {
        const item =
          pattern_1[7].col_8[
            Math.floor(Math.random() * pattern_1[7].col_8.length)
          ];
        addRandomItems(item);
      }
      if (pattern_1[8].col_7) {
        const item =
          pattern_1[8].col_7[
            Math.floor(Math.random() * pattern_1[8].col_7.length)
          ];
        addRandomItems(item);
      }
    }
    for (let index = 0; index < randomObj.length; index++) {
      const elementId = document.getElementById(
        `${randomObj[index].id}`
      ) as HTMLInputElement;
      elementId.value = randomObj[index].val;
      if (index === 0) {
        onClick(Number(randomObj[index].id));
      }
    }
  };

  useEffect(() => {
    clearAllValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    addEventListener(
      "keydown",
      function (e) {
        if (
          ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(
            e.code
          ) > -1
        ) {
          e.preventDefault();
          return;
        }
      },
      false
    );
    // eslint-disable-next-line no-restricted-globals
    addEventListener("input", (event) => {
      checkValue(event);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    addEventListener("click", (event: any) => {
      if (event.target.id) {
        if (!isNaN(event.target.id)) {
          onClick(Number(event.target.id));
          inputId = event.target.id;
        }
      } else if (event.target.localName === "button") {
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        if (numbers.includes(Number(event.target.value))) {
          let e = {
            ...event,
            target: { id: inputId },
            value: event.target.value,
          };
          const elementId = document.getElementById(
            `${inputId}`
          ) as HTMLInputElement;
          if (inputId) {
            elementId.value = event.target.value;
          }
          inputId = "";
          checkValue(e);
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filledCells = (start: number, end: number) => {
    let count = [];
    for (let index = start; index <= end; index++) {
      const element = document.getElementById(`${index}`) as HTMLInputElement;
      if (element?.value) {
        count.push(element.id);
      }
    }
    if (count.length === 9) {
      for (let index = 0; index < count.length; index++) {
        if (!filledIds.includes(count[index])) {
          setColor(count[index], "completed");
          filledIds.push(count[index]);
        }
      }
    }
  };

  const filledRowsAndCols = (row: any) => {
    let count = [];
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
        if (!filledIds.includes(count[index])) {
          setColor(count[index], "completed");
          filledIds.push(count[index]);
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
  };

  return (
    <div>
      <div className="heading">
        <h3>
          This game is like{" "}
          <a href="https://sudoku.com" target="_blank" rel="noreferrer">
            sudoku
          </a>
          , you can read more about this game{" "}
          <a href="https://sudoku.com" target="_blank" rel="noreferrer">
            click here
          </a>
        </h3>
      </div>
      <div id="main-container">
        {idsLength.length === 91 ? (
          <h3>Congratulations, You have completed this game.</h3>
        ) : (
          <>
            <div id="container"></div>
            <div style={{ display: "none" }} id="btns"></div>
          </>
        )}
      </div>
      <button className="new-game" onClick={clearAllValues}>
        New Game
      </button>
    </div>
  );
};

export default Sudoku;
