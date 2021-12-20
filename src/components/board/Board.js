import React from "react";
import Square from "../squares";
import chooseBoardStyle from "../../helper/chooseBoardStyle";

const Board = ({ squares, onMouseEnter, boardType }) => (
  <div className={`board ${chooseBoardStyle(boardType)}`}>
    {squares.map((square, i) => (
      <Square key={i} value={square} onMouseEnter={() => onMouseEnter(i)} />
    ))}
  </div>
);

export default Board;
