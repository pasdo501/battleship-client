import React from "react";
import PropTypes from "prop-types";

import InfoRow from "./InfoRow";

import styles from "./styles/Board.module.scss";

export default function Board({ board, yours }) {
  return (
    <div className={styles.board}>
      <InfoRow />
      {board.map((row, index) => (
        <div key={`row-${index}`} className={styles.row}>
          <div className={styles.infoColumn}>{index + 1}</div>
          {row.map((column, cIndex) => (
            <div key={`column-${index}-${cIndex}`} className={styles.column} />
          ))}
        </div>
      ))}
    </div>
  );
}

Board.propTypes = {
  board: PropTypes.array.isRequired,
  yours: PropTypes.bool.isRequired,
};
