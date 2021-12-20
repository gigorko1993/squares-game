import React, { useState, useEffect } from "react";
import axios from "axios";
import calculateHoverSquares from "../../helper/calculateHoverSquares";
import Board from "../board";
import SelectForm from "../selectForm";
import convertData from "../../helper/convertData";

const Game = () => {
  const [mode, setMode] = useState("");
  const [history, setHistory] = useState([Array(Number(25)).fill(null)]);
  const [type, setType] = useState(5);
  const [stepNumber, setStepNumber] = useState(0);
  const [isHovered, setIsHovered] = useState(true);
  const stopGame = calculateHoverSquares(history[stepNumber], type);
  const hoveredState = isHovered ? true : false;

  axios.defaults.baseURL = "http://demo1030918.mockable.io/";

  useEffect(() => {
    if (!mode) {
      (async () => {
        const { data } = await axios.get();
        return setMode(convertData(data));
      })();
    }
    return;
  }, [mode]);

  const handleSelect = (e) => {
    setHistory([Array(Number(e.target.value * e.target.value)).fill(null)]);
    setType(e.target.value);
  };

  const handleMouseMove = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current];
    if (stopGame || squares[i]) return;
    squares[i] = hoveredState;
    setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    setIsHovered(hoveredState);
  };

  return (
    <>
      <h1>React Squares Game</h1>
      <div>
        <SelectForm mode={mode} onSelect={handleSelect} />
        <button>Start</button>
      </div>
      <Board
        squares={history[stepNumber]}
        boardType={type}
        onMouseEnter={handleMouseMove}
      />
      <div className="info-wrapper">
        <h3>Hover squares</h3>
      </div>
    </>
  );
};

export default Game;
