import React from "react";
import PropTypes from "prop-types";

import InfoColumn from "./InfoColumn";

import styles from "./styles/Board.module.scss";

export default function PrepBoard({
  board,
  placeable,
  handleMouseEnter,
  handleMouseLeave,
  handlePlacement,
  handlePickupShip,
}) {
  return (
    <div className={styles.grid} onMouseLeave={handleMouseLeave}>
      {/* Info Column refers to the first column displaying  A - J */}
      <InfoColumn />
      {board.map((row, index) =>
        row.map((column, cIndex) => {
          let color;
          if (column.hover) {
            color = placeable ? "green" : "red";
          } else {
            // If type is set, something is sitting in this cell, with a color
            // property
            color = column.type ? column.type.color : column.color;
          }
          return (
            <React.Fragment key={`cell-${index}-${cIndex}`}>
              {/* First column = 'info' column (1 - 10) */}
              {cIndex === 0 ? (
                <div className={styles.cell}>
                  <span>{index + 1}</span>
                </div>
              ) : null}
              <div
                className={styles.interactiveCell}
                style={{ backgroundColor: color }}
                onMouseEnter={() => handleMouseEnter(index, cIndex)}
                onClick={
                  // If something is already in this cell, clicking will 
                  // pick it up, otherwise put down what's currently selected
                  column.type
                    ? () => handlePickupShip(column)
                    : () => handlePlacement(index, cIndex)
                }
              />
            </React.Fragment>
          );
        })
      )}
    </div>
  );
}

PrepBoard.propTypes = {
  board: PropTypes.array.isRequired,
  placeable: PropTypes.bool.isRequired,
  handleMouseEnter: PropTypes.func.isRequired,
  handleMouseLeave: PropTypes.func.isRequired,
  handlePlacement: PropTypes.func.isRequired,
  handlePickupShip: PropTypes.func.isRequired,
};
