import React from "react";

import PropTypes from "prop-types";

import { wrapper } from "./styles/Loading.module.scss";

export default function Loading({ text = "Loading", speed = 300, ...attrs }) {
  const [dots, setDots] = React.useState("");

  React.useEffect(() => {
    const intervalId = window.setInterval(() => {
      setDots((dots) => (dots === "..." ? "" : `${dots}.`));
    }, speed);

    return () => window.clearInterval(intervalId);
  }, [text, speed]);

  return (
    <div className={wrapper} {...attrs}>
      <h2>
        {text}
        {dots}
      </h2>
    </div>
  );
}

Loading.propTypes = {
  text: PropTypes.string,
  speed: PropTypes.number,
};
