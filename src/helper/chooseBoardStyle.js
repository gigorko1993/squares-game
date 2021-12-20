const chooseBoardStyle = (a) => {
  switch (a) {
    case "10":
      return "board-10";
    case "15":
      return "board-15";

    default:
      return "board-5";
  }
};
export default chooseBoardStyle;
