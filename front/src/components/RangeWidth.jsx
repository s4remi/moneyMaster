import { useState } from "react";

export function RangeWidth() {
  let [width, setWidth] = useState(10);

  function onInput(evt) {
    setWidth(+evt.target.value);
  }

  return (
    <label>
      <input type="range" value={width} min="40" max="300" onInput={onInput} />
      <output> Value: {width} </output>
    </label>
  );
}
