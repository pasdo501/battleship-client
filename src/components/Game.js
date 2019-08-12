import React from "react";
import { Redirect } from "react-router-dom";
import styles from "./styles/shared.module.scss";

import Board from "./Board";
import GameOver from "./GameOver";

import SocketContext from "../contexts/socket";

import FlashState from "../util/FlashState";
import { CELL_HIT, CELL_MISS } from "../util/variables";

function gameReducer(state, action) {
  switch (action.type) {
    case "startGame":
      return {
        ...state,
        turn: state.player === action.player,
      };
    case "shotResult": {
      const { row, column, hit, defeated } = action;
      const newBoard = state.opponentBoard.map((arr) => arr.slice());

      newBoard[row][column] = hit ? CELL_HIT : CELL_MISS;

      return {
        ...state,
        opponentBoard: newBoard,
        turn: !state.turn,
        victory: defeated ? true : state.victory,
      };
    }
    case "receiveShot": {
      const { row, column, defeated } = action;
      const newBoard = state.playerBoard.map((arr) => arr.slice());
      newBoard[row][column] = {
        ...state.playerBoard[row][column],
        targeted: true,
      };

      return {
        ...state,
        playerBoard: newBoard,
        turn: !state.turn,
        victory: defeated ? false : state.victory,
      };
    }
    default:
      throw new Error("Invalid action type used");
  }
}

export default function Game({ location }) {
  const { socket, player, opponentName } = React.useContext(SocketContext);

  const [state, dispatch] = React.useReducer(gameReducer, {
    playerBoard: location.state && location.state.board,
    opponentBoard: React.useMemo(() => Array(10).fill(Array(10).fill(0)), []),
    player,
    turn: false,
    victory: null,
  });

  React.useEffect(() => {
    if (socket === null) return;

    socket.on("startGame", (player) => dispatch({ type: "startGame", player }));

    socket.on("shotResult", (row, column, hit, defeated) =>
      dispatch({ type: "shotResult", row, column, hit, defeated })
    );
    socket.on("receiveShot", (row, column, defeated) =>
      dispatch({ type: "receiveShot", row, column, defeated })
    );

    socket.emit("gameReady");

    return () => {
      socket.off("startGame");
      socket.off("shotResult");
      socket.off("receiveShot");
    };
  }, [socket]);

  if (FlashState.get("redirectHome")) {
    return <Redirect to="/" />;
  }

  const shoot =
    state.turn === true
      ? (row, column) => socket.emit("shoot", { row, column })
      : null;

  const { playerBoard, opponentBoard, turn, victory } = state;

  if (playerBoard === undefined) {
    // Get Board state from the Server?
    // At the moment just redirect home
    return <Redirect to="/" />;
  }

  if (victory !== null) {
    return <GameOver victorious={victory} />;
  }

  return (
    <React.Fragment>
      <h2 className={styles.header}>
        {turn ? (
          <span>It's your turn ...</span>
        ) : (
          <span>It's {opponentName}'s turn ...</span>
        )}
      </h2>

      <Board board={playerBoard} interactive={false} />
      <Board board={opponentBoard} interactive={true} shoot={shoot} />
    </React.Fragment>
  );
}
