import React from "react";
import styles from "./styles/Game.module.scss";

import Board from "./Board"

export default function Game({ location }) {
  // const id = location.state !== undefined
  //     ? location.state.id
  //     : 'Nothing'
  const board = Array(10).fill(Array(10).fill(0));

  return (
    <div className={styles.table}>
      <Board board={board} interactive={false} />
      <Board board={board} interactive={true} />
    </div>
  );
}
