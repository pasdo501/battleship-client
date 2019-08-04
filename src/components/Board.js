import React from "react";
import PropTypes from "prop-types";

import InfoRow from "./InfoRow";

import { FREE_CELL, CELL_HIT } from "../util/variables";

import styles from "./styles/Board.module.scss";

export default function Board({ board, interactive, shoot = null }) {
  return (
    <div className={styles.board}>
      <InfoRow />
      {board.map((row, index) => (
        <div key={`row-${index}`} className={styles.row}>
          <div className={styles.infoColumn}>{index + 1}</div>
          {row.map((column, cIndex) => {
            let targeted = false;
            let hit = false;

            if (!interactive) {
              targeted = column.targeted !== undefined;
              // If column type is unset, there is not ship on this square
              hit = targeted && column.type;
            } else {
              targeted = column !== FREE_CELL;
              hit = targeted && column === CELL_HIT;
            }

            return (
              <div
                key={`column-${index}-${cIndex}`}
                className={
                  interactive ? styles.interactiveColumn : styles.column
                }
                style={{
                  backgroundColor: column.type
                    ? column.type.color
                    : column.color,
                }}
                onClick={
                  interactive && !targeted && shoot
                    ? () => shoot(index, cIndex)
                    : null
                }
              >
                {targeted && (
                  <span className={hit ? styles.hit : styles.miss}>
                    {hit ? "X" : "O"}
                  </span>
                )}
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
  shoot: PropTypes.func,
};
