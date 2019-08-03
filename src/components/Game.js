import React from "react";
import styles from "./styles/Game.module.scss";

import Board from "./Board"

export default function Game({ location }) {
  const { board } = location.state
  const emptyBoard = Array(10).fill(Array(10).fill(0));

  return (
    <div className={styles.table}>
      <h2 className={styles.info}>Test</h2>
      <Board board={board} interactive={false} />
      <Board board={emptyBoard} interactive={true} />
    </div>
  );
}
