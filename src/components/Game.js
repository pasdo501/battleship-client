import React from "react";
import styles from "./styles/Game.module.scss";

export default function Game({ location }) {
  // const id = location.state !== undefined
  //     ? location.state.id
  //     : 'Nothing'
  const board = Array(10).fill(Array(10).fill(0));
  console.log(board);

  return (
    <div className={styles.board}>
      {board.map((row, index) => (
        <div key={`row-${index}`} className={styles.row}>
          {row.map((column, cIndex) => (
            <div key={`column-${index}-${cIndex}`} className={styles.column} />
          ))}
        </div>
      ))}
      {/* <div className={styles.row}>
        <div className={styles.column} />
        <div className={styles.column} />
        <div className={styles.column} />
        <div className={styles.column} />
        <div className={styles.column} />
        <div className={styles.column} />
        <div className={styles.column} />
        <div className={styles.column} />
        <div className={styles.column} />
        <div className={styles.column} />
      </div>
      <div className={styles.row}>
        <div className={styles.column} />
        <div className={styles.column} />
        <div className={styles.column} />
        <div className={styles.column} />
        <div className={styles.column} />
        <div className={styles.column} />
        <div className={styles.column} />
        <div className={styles.column} />
        <div className={styles.column} />
        <div className={styles.column} />
      </div> */}
    </div>
  );
}
