import React from "react";
import { v4 as uuidv4 } from "uuid";

const InfoCard = ({ hoveredSquares }) => (
  <ul className="list-thumb">
    {hoveredSquares.slice(-6).map((el) => {
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
);
export default InfoCard;
