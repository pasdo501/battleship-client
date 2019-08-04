import React from "react";
import PropTypes from "prop-types";

import styles from "./styles/Modal.module.scss";

export default function Modal({
  children,
  handleHide = null,
  withCloseButton = true,
  speed = 500,
}) {
  console.log(speed)
  const [fadeIn, setFadeIn] = React.useState(false);
  const [hide, setHide] = React.useState(false);

  React.useEffect(() => {
    setFadeIn(true);
  }, []);

  React.useEffect(() => {
    if (!hide) return;

    const id = window.setTimeout(() => {
      handleHide();
    }, speed);

    return () => window.clearTimeout(id);
  }, [hide, handleHide, speed]);

  return (
    <div
      className={`${styles.modal} ${fadeIn && !hide ? styles.visible : null}`}
      style={{ transition: `opacity ${speed}ms ease` }}
    >
      <div className={styles.wrapper}>
        {withCloseButton && (
          <button className={styles.close} onClick={() => setHide(true)}>
            X
          </button>
        )}
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),
  handleHide: PropTypes.func,
  withCloseButton: PropTypes.bool,
  speed: PropTypes.number,
};
