import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <React.Fragment>
      <div>Home component</div>
      <Link to="/game">Nothing passed</Link>
      <Link
        to={{
          pathname: "/game",
          state: {
            id: "someId",
          },
        }}
      >
        Passing something
      </Link>
    </React.Fragment>
  );
}
