import React from "react";
import { Link } from "react-router-dom";

import InfoRow from "./InfoRow";

import styles from "./styles/Prep.module.scss";

import { FREE_CELL } from "../util/variables";
import usePlacement from "../hooks/usePlacement";

function getHoverCoordinates({ row, column, orientation, size }) {
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
      const origin = {
        ...action.origin,
        row: action.row,
        column: action.column,
      };
      let head = null;
      for (let [row, column] of getHoverCoordinates(origin)) {
        newBoard[row][column] = {
          ...newBoard[row][column],
          type: state.shipType,
          head: head === null ? [row, column] : head,
          orientation: origin.orientation,
        };
        if (head === null) {
          head = [row, column];
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
    case "pickup":
      const [row, column] = action.head;
      const coords = getHoverCoordinates({
        row,
        column,
        orientation: action.orientation,
        size: action.shipType.size,
      });
      const newBoard = [...state.board];

      for (let [row, column] of coords) {
        newBoard[row][column] = {
          type: FREE_CELL,
          hover: false,
          color: "white",
        };
      }
      action.increment();

      return {
        ...state,
        board: newBoard,
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
  const [
    placementObjects,
    decrementType,
    incrementType,
    shipsLeft,
  ] = usePlacement();
  const [state, dispatch] = React.useReducer(prepReducer, {
    board: React.useMemo(() => constructEmptyBoard(), []),
    hoverCoordinates: [],
    placeable: true,
    shipType: null,
  });

  // [row, column, orientation, size]
  const [origin, setOrigin] = React.useState({
    row: -1,
    column: -1,
    orientation: "v",
    size: 0,
  });

  const onMouseEnter = (row, column) => {
    if (state.shipType === null) {
      return;
    }
    setOrigin((origin) => ({ ...origin, row, column }));
  };

  const resetOriginCoords = () =>
    setOrigin((origin) => ({ ...origin, row: -1, column: -1 }));

  const toggleOrientation = () =>
    setOrigin((origin) => ({
      ...origin,
      orientation: origin.orientation === "h" ? "v" : "h",
    }));

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
    setOrigin((origin) => ({ ...origin, size: type.size }));
  };

  const pickupShip = ({ type, head, orientation }) => {
    const increment = () => incrementType(type.type);
    dispatch({ type: "pickup", shipType: type, head, orientation, increment });
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
                let color;
                if (column.hover) {
                  color = placeable ? "green" : "red";
                } else {
                  color = column.type ? column.type.color : column.color;
                }
                return (
                  <div
                    style={{ backgroundColor: color }}
                    key={`column-${index}-${cIndex}`}
                    className={styles.interactiveColumn}
                    onMouseEnter={() => onMouseEnter(index, cIndex)}
                    onClick={
                      column.type
                        ? () => pickupShip(column)
                        : () => handlePlacement(index, cIndex)
                    }
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
                      state.shipType &&
                      state.shipType.type === type.type &&
                      state.shipType.quantity > 0
                        ? { fontWeight: `bold` }
                        : {}
                    }
                  >
                    {type.name} x {type.quantity}
                  </td>
                  <td className={styles.typeVisualisation}>
                    {/* TODO: Make this less gross */}
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
          {shipsLeft > 0 || (
            <Link
              to={{
                pathname: "/game",
                state: {
                  board,
                },
              }}
            >
              Done
            </Link>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
