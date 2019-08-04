import React from "react";

import PropTypes from "prop-types";

import { wrapper } from "./styles/Loading.module.scss";

export default function Loading({ text = "Loading", speed = 300 }) {
  const [content, setContent] = React.useState(text);
  React.useEffect(() => {
    const intervalId = window.setInterval(() => {
      setContent((content) =>
        content === `${text}...` ? text : `${content}.`
      );
      return () => window.clearInterval(intervalId);
    }, speed);
  }, [text, speed]);

  return (
    <div className={wrapper}>
      <h2>{content}</h2>
    </div>
  );
}

Loading.propTypes = {
  text: PropTypes.string,
  speed: PropTypes.number,
};
