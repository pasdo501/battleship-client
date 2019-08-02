import React from "react";



export default function usePlacement() {
  const [size, setSize] = React.useState(1);
  const [origin, setOrigin] = React.useState([0, 0]);
  const [orientation, setOrientation] = React.useState("vertical");
  const [placeable, setPlaceable] = React.useState(false);

  const onMouseEnter = (row, column) => {
    setOrigin([row, column]);
    setPlaceable(
      orientation === "vertical" ? row + size <= 10 : column + size <= 10
    );
  };

  const toggleOrientation = () =>
    setOrientation((orientation) =>
      orientation === "vertical" ? "horizontal" : "vertical"
    );

  const inRange = (row, column) => {
    if (orientation === "vertical") {
      if (column !== origin[1]) {
        return false;
      }
      return row >= origin[0] && Math.abs(row - origin[0]) < size;
    } else {
      if (row !== origin[0]) {
        return false;
      }
      return column >= origin[1] && Math.abs(column - origin[1]) < size;
    }
  };

  return {
    size,
    setSize,
    origin,
    orientation,
    onMouseEnter,
    toggleOrientation,
    inRange,
  };
}
