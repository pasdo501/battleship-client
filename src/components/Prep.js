import React from "react";

import Board from "./Board";

import usePlacement from "../hooks/usePlacement"

export default function Prep() {
  const board = Array(10).fill(Array(10).fill(0));

  const { toggleOrientation, size, setSize, onMouseEnter, inRange } = usePlacement();

  console.log(`Size is ${size}`)
  return (
    <div>
      <div style={{ textAlign: `center` }}>Prep Component</div>
      <Board board={board} interactive={true} attrs={{ onMouseEnter, inRange }} />
      <button onClick={toggleOrientation}>Toggle Orientation</button>
      <button onClick={() => setSize(size => size + 1)}>+</button>
      <button onClick={() => setSize(size => size - 1)}>-</button>
    </div>
  );
}
