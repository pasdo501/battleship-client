import React from "react";
import PropTypes from "prop-types";

import styles from "./styles/Board.module.scss";

export default function InfoColumn({ length = 10 }) {
  const cells = [];
  for (let i = 0; i <= length; i++) {
    cells.push(i === 0 ? "" : String.fromCharCode(64 + i));
  }

  return (
    <React.Fragment>
      {cells.map((cell) => (
        <div key={cell} className={styles.cell}>
          <span>{cell}</span>
        </div>
      ))}
    </React.Fragment>
  );
}

InfoColumn.propTypes = {
  length: PropTypes.number,
};
