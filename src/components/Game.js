import React from "react";
import { Redirect } from "react-router-dom";
import styles from "./styles/Game.module.scss";

import Board from "./Board";

import SocketContext from "../contexts/socket";

import { CELL_HIT, CELL_MISS } from "../util/variables";

function gameReducer(state, action) {
  switch (action.type) {
    case "shotResult": {
      const { row, column, hit } = action;
      const newBoard = state.opponentBoard.map((arr) => arr.slice());

      newBoard[row][column] = hit ? CELL_HIT : CELL_MISS;
      return {
        ...state,
        opponentBoard: newBoard,
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
      };
    }
    default:
      throw new Error("Invalid action type used");
  }
}

export default function Game({ location }) {
  const { socket } = React.useContext(SocketContext);

  const [state, dispatch] = React.useReducer(gameReducer, {
    playerBoard: location.state && location.state.board,
    opponentBoard: React.useMemo(() => Array(10).fill(Array(10).fill(0)), []),
  });

  React.useEffect(() => {
    if (socket === null) return;

    socket.on("shotResult", (row, column, hit) =>
      dispatch({ type: "shotResult", row, column, hit })
    );
    socket.on("receiveShot", (row, column) =>
      dispatch({ type: "receiveShot", row, column })
    );

    return () => {
      socket.off("hitResult");
      socket.off("receiveShot");
    };
  }, [socket]);

  if (socket === null) {
    return <Redirect to="/" />;
  }

  const shoot = (row, column) => socket.emit("shoot", { row, column });

  const { playerBoard, opponentBoard } = state;

  if (playerBoard === undefined) {
    // Get Board state from the Server?
    // At the moment just redirect home
    return <Redirect to="/" />;
  }

  return (
    <div className={styles.table}>
      <h2 className={styles.info}>Test</h2>
      <Board board={playerBoard} interactive={false} />
      <Board board={opponentBoard} interactive={true} shoot={shoot} />
    </div>
  );
}
