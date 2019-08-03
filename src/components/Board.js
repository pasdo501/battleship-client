import React from "react";
import PropTypes from "prop-types";

import InfoRow from "./InfoRow";

import styles from "./styles/Board.module.scss";

export default function Board({ board, interactive }) {
  return (
    <div className={styles.board}>
      <InfoRow />
      {board.map((row, index) => (
        <div key={`row-${index}`} className={styles.row}>
          <div className={styles.infoColumn}>{index + 1}</div>
          {row.map((column, cIndex) => {
            return (
              <div
                key={`column-${index}-${cIndex}`}
                className={
                  interactive ? styles.interactiveColumn : styles.column
                }
              >
                {/* Temp, display coords */}
                <span
                  className={styles.targetedColumn}
                >{`${index}, ${cIndex}`}</span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

Board.propTypes = {
  board: PropTypes.array.isRequired,
  interactive: PropTypes.bool.isRequired,
  attrs: PropTypes.object,
};
