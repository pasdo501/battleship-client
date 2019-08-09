import React from "react";
import PropTypes from "prop-types";

import styles from "./styles/PrepOptions.module.scss";

function getTypeBlocks(type) {
  const blocks = [];
  for (let i = 0; i < type.size; i++) {
    blocks.push(
      <div key={type.name + i} style={{ backgroundColor: type.color }} />
    );
  }

  return blocks;
}

export default function PrepOptions({
  placementObjects,
  handleTypeChange,
  toggleOrientation,
  shipsLeft,
  handleReady,
  shipType,
}) {
  return (
    <div>
      {placementObjects.map((type) => (
        <div
          key={type.name}
          className={styles.row}
          onClick={() => handleTypeChange(type)}
        >
          <div
            style={
              shipType && shipType.type === type.type && shipType.quantity > 0
                ? { fontWeight: `bold` }
                : {}
            }
          >
            {type.name} x {type.quantity}
          </div>
          <div className={styles.typeVisualisation}>
            {getTypeBlocks(type).map((block) => block)}
          </div>
        </div>
      ))}
      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={toggleOrientation}>
          Toggle Rotation (T)
        </button>
        <button
          className={styles.button}
          onClick={shipsLeft > 0 ? null : handleReady}
          disabled={shipsLeft > 0 ? true : false}
        >
          Ready!
        </button>
      </div>
    </div>
  );
}

PrepOptions.propTypes = {
  placementObjects: PropTypes.array.isRequired,
  handleTypeChange: PropTypes.func.isRequired,
  toggleOrientation: PropTypes.func.isRequired,
  shipsLeft: PropTypes.number.isRequired,
  handleReady: PropTypes.func.isRequired,
  shipType: PropTypes.object,
};
