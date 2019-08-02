import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <React.Fragment>
      <div>Home component</div>
      <div>
        <Link to="/prep">Prep</Link>
      </div>
      <div>
        <Link to="/game">Nothing passed</Link>
      </div>
      <div>
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
      </div>
    </React.Fragment>
  );
}
