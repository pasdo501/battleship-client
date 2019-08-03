import React from "react";

import InfoRow from "./InfoRow";

import styles from "./styles/Prep.module.scss";

import { FREE_CELL } from "../util/variables";
import usePlacement from "../hooks/usePlacement";

function getHoverCoordinates(origin) {
  const [row, column, orientation, size] = origin;
  if (row === -1 || column === -1) {
    return [];
  }
  const coords = [[row, column]];

  if (orientation === "v") {
    for (let i = 1; i < size; i++) {
      coords.push([row + i, column]);
    }
  } else if (orientation === "h") {
    for (let i = 1; i < size; i++) {
      coords.push([row, column + i]);
    }
  }

  return coords;
}

function prepReducer(state, action) {
  switch (action.type) {
    case "hover": {
      let placeable = true;

      const newBoard = [...state.board];
      const hoverCoordinates = getHoverCoordinates(action.origin);
      if (hoverCoordinates.length === 0) {
        return {
          ...state,
        };
      }

      for (let [row, column] of hoverCoordinates) {
        if (row > 9 || column > 9) {
          placeable = false;
          continue;
        }
        if (newBoard[row][column].type !== FREE_CELL) {
          placeable = false;
        }

        newBoard[row][column].hover = true;
      }

      return {
        ...state,
        placeable,
        hoverCoordinates,
        board: newBoard,
      };
    }
    case "hoverEnd": {
      const newBoard = [...state.board];
      for (let [row, column] of state.hoverCoordinates) {
        if (row > 9 || column > 9) {
          continue;
        }
        newBoard[row][column].hover = false;
      }
      return {
        ...state,
        board: newBoard,
      };
    }
    case "place": {
      if (!state.placeable || state.shipType === null) {
        return state;
      }

      const newBoard = [...state.board];
      const [, , orientation, size] = action.origin;
      const origin = [action.row, action.column, orientation, size];
      let head = null;
      for (let [row, column] of getHoverCoordinates(origin)) {
        newBoard[row][column] = {
          ...newBoard[row][column],
          type: state.shipType.type,
          color: state.shipType.color,
          head: head === null
            ? [row, column]
            : head
        };
        if (head === null) {
          head = [row, column]
        }
      }

      const newQuantity = state.shipType.quantity - 1;
      action.decrement();
      action.reset();

      return {
        ...state,
        board: newBoard,
        placeable: false,
        shipType:
          newQuantity === 0
            ? null
            : {
                ...state.shipType,
                quantity: state.shipType.quantity - 1,
              },
      };
    }
    case "shipType":
      return {
        ...state,
        shipType: action.shipType,
      };
    default:
      throw new Error("Invalid action type used");
  }
}

function constructEmptyBoard() {
  let board = [];
  for (let i = 0; i < 10; i++) {
    let row = [];
    for (let j = 0; j < 10; j++) {
      row.push({ type: FREE_CELL, hover: false, color: "white" });
    }
    board.push(row);
  }

  return board;
}

export default function Prep() {
  const [placementObjects, decrementType, shipsLeft] = usePlacement();
  const [state, dispatch] = React.useReducer(prepReducer, {
    board: React.useMemo(() => constructEmptyBoard(), []),
    hoverCoordinates: [],
    placeable: true,
    shipType: null,
  });

  // [row, column, orientation, size]
  const [origin, setOrigin] = React.useState([-1, -1, "v", 0]);

  const onMouseEnter = (row, column) => {
    if (state.shipType === null) {
      return;
    }
    setOrigin((origin) => {
      const [, , orientation, size] = origin;
      return [row, column, orientation, size];
    });
  };

  const resetOriginCoords = () => {
    setOrigin((origin) => {
      const [, , orientation, size] = origin;
      return [-1, -1, orientation, size];
    });
  };

  const toggleOrientation = () => {
    setOrigin((origin) => {
      const originCopy = [...origin];
      originCopy[2] === "v" ? (originCopy[2] = "h") : (originCopy[2] = "v");

      return originCopy;
    });
  };

  React.useEffect(() => {
    dispatch({ type: "hover", origin });

    return () => dispatch({ type: "hoverEnd", origin });
  }, [origin]);

  const handlePlacement = (row, column) => {
    if (state.shipType === null) return;

    const { type, quantity } = state.shipType;
    if (quantity <= 0) {
      return;
    }
    const decrement = () => decrementType(type);
    const reset = () => resetOriginCoords();
    dispatch({ type: "place", row, column, origin, decrement, reset });
  };

  const handleTypeChange = (type) => {
    if (type.quantity < 1) return;
    dispatch({ type: "shipType", shipType: type });
    setOrigin((origin) => {
      const [row, column, orientation] = origin;
      return [row, column, orientation, type.size];
    });
  };

  React.useEffect(() => {
    const listener = (e) => {
      // T
      if (e.keyCode === 84) {
        toggleOrientation();
      }
    };
    document.addEventListener("keydown", listener);

    return () => document.removeEventListener("keydown", listener);
  });

  const { board, placeable } = state;

  return (
    <React.Fragment>
      <h2 style={{ textAlign: `center` }}>Prepare your Ships!</h2>

      <div className={styles.wrapper}>
        <div className={styles.board} onMouseLeave={resetOriginCoords}>
          <InfoRow />
          {board.map((row, index) => (
            <div key={`row-${index}`} className={styles.row}>
              <div className={styles.infoColumn}>{index + 1}</div>
              {row.map((column, cIndex) => {
                return (
                  <div
                    style={{
                      backgroundColor: `${
                        column.hover
                          ? placeable
                            ? "green"
                            : "red"
                          : column.color
                      }`,
                    }}
                    key={`column-${index}-${cIndex}`}
                    className={styles.interactiveColumn}
                    onMouseEnter={() => onMouseEnter(index, cIndex)}
                    onClick={() => handlePlacement(index, cIndex)}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <div className={styles.options}>
          <table className={styles.table}>
            <tbody>
              {placementObjects.map((type, index) => (
                <tr key={type.name} onClick={() => handleTypeChange(type)}>
                  <td
                    style={
                      state.shipType === type && state.shipType.quantity > 0
                        ? { fontWeight: `bold` }
                        : {}
                    }
                  >
                    {type.name} x {type.quantity}
                  </td>
                  <td className={styles.typeVisualisation}>
                    {Array(type.size)
                      .fill(0)
                      .map((_, index) => (
                        <div
                          key={index}
                          style={{ backgroundColor: type.color }}
                        />
                      ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={toggleOrientation}>Toggle Rotation (T)</button>
          {shipsLeft > 0 || <button>Done</button>}
        </div>
      </div>
    </React.Fragment>
  );
}
