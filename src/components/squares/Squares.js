import React from "react";

const Square = ({ value, onMouseEnter }) => {
  const style = value ? `squares hovered` : `squares`;

  return (
    <button className={style} onMouseEnter={onMouseEnter}>
      {value}
    </button>
  );
};

export default Square;
