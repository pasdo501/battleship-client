import React from "react";
import { Redirect } from "react-router-dom";

import PrepBoard from "./PrepBoard";
import PrepOptions from "./PrepOptions";
import Loading from "./Loading";

import styles from "./styles/shared.module.scss";

import FlashState from "../util/FlashState";
import { FREE_CELL } from "../util/variables";
import usePlacement from "../hooks/usePlacement";
import SocketContex from "../contexts/socket";

function getCoords({ row, column, orientation, size }) {
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
      const hoverCoordinates = getCoords(action.origin);
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
      for (let [row, column] of getCoords(origin)) {
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
        shipType: action.shipType === state.shipType ? null : action.shipType,
      };
    case "pickup":
      const [row, column] = action.head;
      const coords = getCoords({
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
  const { socket, opponentName } = React.useContext(SocketContex);
  const [waiting, setWaiting] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false);

  React.useEffect(() => {
    if (socket === null) return;

    socket.on("redirect", () => {
      setRedirect(true);
    });
  }, [socket]);

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
    // Bail out early if already holding a ship
    if (state.shipType !== null) return;

    const increment = () => incrementType(type.type);
    dispatch({ type: "pickup", shipType: type, head, orientation, increment });
    setOrigin((origin) => ({ ...origin, size: type.size }));
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

  const handleReady = () => {
    if (socket === null) return;

    socket.emit("initialise_board", board);
    setWaiting(true);
  };

  const { board, placeable } = state;

  if (FlashState.get("redirectHome")) {
    return <Redirect to="/" />;
  }

  if (redirect) {
    return <Redirect to={{ pathname: "/game", state: { board } }} />;
  }

  return (
    <React.Fragment>
      {waiting && <Loading text={`Waiting for ${opponentName} `} speed={400} />}
      <h2 className={styles.header}>Prepare your Ships!</h2>

      <PrepBoard
        board={board}
        placeable={placeable}
        handleMouseEnter={onMouseEnter}
        handleMouseLeave={resetOriginCoords}
        handlePlacement={handlePlacement}
        handlePickupShip={pickupShip}
      />
      <PrepOptions
        placementObjects={placementObjects}
        handleTypeChange={handleTypeChange}
        toggleOrientation={toggleOrientation}
        shipsLeft={shipsLeft}
        handleReady={handleReady}
        shipType={state.shipType}
      />
    </React.Fragment>
  );
}
