import React from "react";
import { v4 as uuidv4 } from "uuid";

const SelectForm = ({ mode, onSelect }) => (
  <select name="select" onChange={onSelect} className="select">
    <option key={uuidv4()} value="Pick mode" defaultChecked className="disable">
      Pick mode
    </option>
    {Object.entries(mode).map((el) => (
      <option key={uuidv4()} value={el[1]}>
        {el[0]}
      </option>
    ))}
  </select>
);
export default SelectForm;
