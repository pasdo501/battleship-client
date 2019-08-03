import React from "react";

import InfoRow from "./InfoRow";

import styles from "./styles/Board.module.scss";

import { FREE_CELL, PLACED_CELL } from "../util/variables";

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
      if (!state.placeable) {
        return state;
      }
      const newBoard = [...state.board];
      const [, , orientation, size] = action.origin;
      const origin = [action.row, action.column, orientation, size];
      for (let [row, column] of getHoverCoordinates(origin)) {
        newBoard[row][column] = {
          ...newBoard[row][column],
          type: PLACED_CELL,
          color: "black",
        };
      }

      return {
        ...state,
        board: newBoard,
      };
    }
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
  const [state, dispatch] = React.useReducer(prepReducer, {
    board: React.useMemo(() => constructEmptyBoard(), []),
    hoverCoordinates: [],
    placeable: true,
  });

  // [row, column, orientation, size]
  const [origin, setOrigin] = React.useState([-1, -1, "v", 2]);

  const onMouseEnter = (row, column) => {
    setOrigin((origin) => {
      const [, , orientation, size] = origin;
      return [row, column, orientation, size];
    });
  };

  const handleLeaveBoard = () => {
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

  const handleClick = (row, column) =>
    dispatch({ type: "place", row, column, origin });

  const { board, placeable } = state;

  return (
    <div>
      <div style={{ textAlign: `center` }}>Prep Component</div>
      <button onClick={toggleOrientation}>TOGGLE</button>
      <div className={styles.board} onMouseLeave={handleLeaveBoard}>
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
                  onClick={() => handleClick(index, cIndex)}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
