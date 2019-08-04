import React from "react";
import { Redirect } from "react-router-dom";
import styles from "./styles/Game.module.scss";

import Board from "./Board";

import SocketContext from "../contexts/socket";

import { CELL_HIT, CELL_MISS } from "../util/variables";

function gameReducer(state, action) {
  switch (action.type) {
    case "startGame":
      return {
        ...state,
        turn: state.player === action.player,
      };
    case "shotResult": {
      const { row, column, hit } = action;
      const newBoard = state.opponentBoard.map((arr) => arr.slice());

      newBoard[row][column] = hit ? CELL_HIT : CELL_MISS;

      return {
        ...state,
        opponentBoard: newBoard,
        message: action.message,
        turn: !state.turn,
      };
    }
    case "receiveShot": {
      const { row, column } = action;
      const newBoard = state.playerBoard.map((arr) => arr.slice());
      newBoard[row][column] = {
        ...state.playerBoard[row][column],
        targeted: true,
      };

      return {
        ...state,
        playerBoard: newBoard,
        message: action.message,
        turn: !state.turn,
      };
    }
    default:
      throw new Error("Invalid action type used");
  }
}

export default function Game({ location }) {
  const { socket, player } = React.useContext(SocketContext);

  const [state, dispatch] = React.useReducer(gameReducer, {
    playerBoard: location.state && location.state.board,
    opponentBoard: React.useMemo(() => Array(10).fill(Array(10).fill(0)), []),
    player,
    turn: false,
    message: "",
  });

  React.useEffect(() => {
    if (socket === null) return;

    socket.on("startGame", (player) => dispatch({ type: "startGame", player }));

    socket.on("shotResult", (row, column, hit, message) =>
      dispatch({ type: "shotResult", row, column, hit, message })
    );
    socket.on("receiveShot", (row, column, message) =>
      dispatch({ type: "receiveShot", row, column, message })
    );

    socket.emit("gameReady");

    return () => {
      socket.off("hitResult");
      socket.off("receiveShot");
      socket.off("startGame");
    };
  }, [socket]);

  if (socket === null) {
    return <Redirect to="/" />;
  }

  const shoot =
    state.turn === true
      ? (row, column) => socket.emit("shoot", { row, column })
      : null;

  const { playerBoard, opponentBoard, turn, message } = state;

  if (playerBoard === undefined) {
    // Get Board state from the Server?
    // At the moment just redirect home
    return <Redirect to="/" />;
  }

  return (
    <div className={styles.table}>
      <h2 className={styles.info}>
        {turn ? (
          <span>It's your turn</span>
        ) : (
          <span>It's the other player's turn</span>
        )}
        {message && <span style={{ display: `block` }}>{message}</span>}
      </h2>
      <Board board={playerBoard} interactive={false} />
      <Board board={opponentBoard} interactive={true} shoot={shoot} />
    </div>
  );
}
