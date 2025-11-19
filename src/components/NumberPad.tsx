import React, { useEffect, useRef } from "react";

interface NumberPadProps {
  onPadCreated?: () => void;
}

const NumberPad: React.FC<NumberPadProps> = ({ onPadCreated }) => {
  const btnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!btnRef.current) return;

    btnRef.current.innerHTML = "";
    createNumberPad();
    if (onPadCreated) {
      onPadCreated();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createNumberPad = () => {
    if (!btnRef.current) return;

    let btnNumber = 0;
    for (let i = 0; i < 3; i++) {
      const divRowElement = document.createElement("div");
      divRowElement.classList.add("number-pad-row");
      btnRef.current.appendChild(divRowElement);
      for (let j = 0; j < 3; j++) {
        btnNumber += 1;
        const buttonElement = document.createElement("button");
        buttonElement.value = String(btnNumber);
        buttonElement.innerHTML = String(btnNumber);
        divRowElement.appendChild(buttonElement);
      }
    }
  };

  return <div id="btns" ref={btnRef}></div>;
};

export default NumberPad;

