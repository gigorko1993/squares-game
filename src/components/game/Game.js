import React, { useState, useEffect } from "react";
import axios from "axios";
import calculateHoverSquares from "../../helper/calculateHoverSquares";
import Board from "../board";
import SelectForm from "../selectForm";
import convertData from "../../helper/convertData";
import { v4 as uuidv4 } from "uuid";

const Game = () => {
  const [mode, setMode] = useState("");
  const [history, setHistory] = useState([Array(Number(25)).fill(null)]);
  const [type, setType] = useState("5");
  const [stepNumber, setStepNumber] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredSquares, setHoveredSquares] = useState([]);
  // const stopGame = calculateHoverSquares(history[stepNumber], type);
  const hoveredState = isHovered ? false : true;

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
    setStepNumber(0);
    setHoveredSquares([]);
  };

  const handleMouseMove = (i) => {
    if (!history[stepNumber]) {
      setStepNumber(0);
    }
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current];
    squares[i] ? (squares[i] = false) : (squares[i] = hoveredState);
    setIsHovered(!hoveredState);
    setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    console.log(`squares[i]`, squares[i]);
    const choosenSquare = calculateHoverSquares(i, type);
    setHoveredSquares([
      ...hoveredSquares,
      { ...choosenSquare, status: squares[i] },
    ]);
  };
  return (
    <>
      <h1>React Squares Game</h1>
      <div className="container">
        <div>
          <div className="nav-thumb">
            <SelectForm mode={mode} onSelect={handleSelect} />
            <button>Start</button>
          </div>
          <Board
            squares={history[stepNumber] ? history[stepNumber] : history[0]}
            boardType={type}
            onMouseEnter={handleMouseMove}
          />
        </div>
        <div className="info-wrapper">
          <h3 className="sub-title">Hover squares</h3>
          {hoveredSquares.length > 0 && (
            <ul>
              {hoveredSquares.map((el) => {
                const style = el.status ? "info-add" : "info-delete";
                return (
                  <li key={uuidv4()} className="list">
                    <p className={`info ${style}`}>
                      row {el.row} col {el.col}
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Game;
