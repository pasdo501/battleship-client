import React from "react";
import { Link } from "react-router-dom";

import SocketContext from "../contexts/socket"

export default function Home() {
  const { connect } = React.useContext(SocketContext)
  React.useEffect(connect, [])

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
