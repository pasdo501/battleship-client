import React from "react";
import { Link, Redirect } from "react-router-dom";

import Loading from "./Loading";

import SocketContext from "../contexts/socket";

export default function Home() {
  const { socket, connect } = React.useContext(SocketContext);
  const [waiting, setWaiting] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false);

  const requestGame = () => {
    setWaiting(true);
    connect();
  };

  React.useEffect(() => {
    if (socket === null) {
      return;
    }

    socket.on("playersReady", () => setRedirect(true));

    return () => socket.off("playersReady")
  }, [socket]);

  if (redirect) {
    return <Redirect to="/prep" />;
  }

  return (
    <React.Fragment>
      {waiting && <Loading text="Waiting for another player " />}
      <div>Home component</div>
      <div>
        <Link to="/prep">Prep</Link>
      </div>
      <div>
        <button onClick={requestGame}>Attempt to Join</button>
      </div>
    </React.Fragment>
  );
}
