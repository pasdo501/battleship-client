import React from "react";
import PropTypes from "prop-types";

import InfoColumn from "./InfoColumn";

import { FREE_CELL, CELL_HIT } from "../util/variables";

import styles from "./styles/Board.module.scss";

export default function Board({ board, interactive, shoot = null }) {
  return (
    <div className={styles.board}>
      <div className={styles.grid}>
        <InfoColumn />
        {board.map((row, index) => (
          <React.Fragment key={`row-${index}`}>
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
                <React.Fragment key={`cell-${index}-${cIndex}`}>
                  {cIndex === 0 ? (
                    <div className={styles.cell}>
                      <span>{index + 1}</span>
                    </div>
                  ) : null}
                  <div
                    className={
                      interactive ? styles.interactiveCell : styles.cell
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
                </React.Fragment>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

Board.propTypes = {
  board: PropTypes.array.isRequired,
  interactive: PropTypes.bool.isRequired,
  shoot: PropTypes.func,
};
