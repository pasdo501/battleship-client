import React from "react";
import { Redirect } from "react-router-dom"
import styles from "./styles/Game.module.scss";

import Board from "./Board"

import SocketContext from "../contexts/socket"

export default function Game({ location }) {
  const { socket } = React.useContext(SocketContext)

  if (socket === null) {
    return <Redirect to="/" />
  }

  const board = location.state && location.state.board
  if (board === undefined) {
    // Get Board state from the Server?
    // At the moment just redirect home
    return <Redirect to="/" />
  }
  const emptyBoard = Array(10).fill(Array(10).fill(0));

  return (
    <div className={styles.table}>
      <h2 className={styles.info}>Test</h2>
      <Board board={board} interactive={false} />
      <Board board={emptyBoard} interactive={true} />
    </div>
  );
}
