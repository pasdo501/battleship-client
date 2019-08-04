import React from "react";
import PropTypes from "prop-types";

import styles from "./styles/Modal.module.scss";

export default function Modal({ handleHide, children }) {
  const [fadeIn, setFadeIn] = React.useState(false);
  const [hide, setHide] = React.useState(false);

  React.useEffect(() => {
    setFadeIn(true);
  }, []);

  React.useEffect(() => {
    if (!hide) return;

    const id = window.setTimeout(() => {
      handleHide();
    }, 500);

    return () => window.clearTimeout(id);
  }, [hide, handleHide]);

  return (
    <div
      className={`${styles.modal} ${fadeIn && !hide ? styles.visible : null}`}
    >
      <div className={styles.wrapper}>
        <button className={styles.close} onClick={() => setHide(true)}>
          X
        </button>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  handleHide: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),
};
