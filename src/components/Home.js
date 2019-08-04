import React from "react";
import { Redirect } from "react-router-dom";

import Loading from "./Loading";

import SocketContext from "../contexts/socket";
import styles from "./styles/Home.module.scss";

export default function Home() {
  const { socket, connect, disconnect } = React.useContext(SocketContext);
  const [waiting, setWaiting] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false);

  const requestGame = () => {
    setWaiting(true);
    connect();
  };

  const cancelRequest = () => {
    setWaiting(false);
    disconnect();
  };

  React.useEffect(() => {
    if (socket === null) {
      return;
    }

    socket.on("playersReady", () => setRedirect(true));

    return () => socket.off("playersReady");
  }, [socket]);

  if (redirect) {
    return <Redirect to="/prep" />;
  }

  return (
    <React.Fragment>
      {waiting && (
        <Loading
          onClick={cancelRequest}
          style={{ cursor: `pointer` }}
          text="Waiting for another player (click to cancel) "
        />
      )}
      <div>
        <button className={styles.bigButton} onClick={requestGame}>
          Join Game
        </button>
      </div>
    </React.Fragment>
  );
}
