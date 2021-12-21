const calculateHoverSquares = (element, type) => {
  const number = Number(type);
  let row = Math.ceil((element + 1) / number);
  let col = row === 1 ? (element + 1) / row : element + 1 - type * (row - 1);
  const res = { row: row, col: col };
  return res;
};

export default calculateHoverSquares;
