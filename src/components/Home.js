import React from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import Loading from "./Loading";
import Modal from "./Modal";

import FlashState from "../util/FlashState";
import SocketContext from "../contexts/socket";
import styles from "./styles/Home.module.scss";

export default function Home({ location }) {
  const { socket, connect, disconnect } = React.useContext(SocketContext);
  const [showModal, setShowModal] = React.useState(false);
  const [waiting, setWaiting] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false);
  const [name, setName] = React.useState("");
  const inputRef = React.useRef();

  const requestGame = () => {
    const playerName = inputRef.current.value.trim();
    if (playerName.length < 1) {
      window.alert("Please enter a name");
      return;
    }
    setShowModal(false);
    setName(playerName);
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

    socket.emit("name", name);

    socket.on("playersReady", () => setRedirect(true));

    return () => socket.off("playersReady");
  }, [socket, name]);

  React.useEffect(() => {
    const message = FlashState.get("redirectMessage");

    if (message) {
      window.alert(message);
    }
  }, []);

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
        <button className={styles.bigButton} onClick={() => setShowModal(true)}>
          Join Game
        </button>
        {showModal && (
          <Modal handleHide={() => setShowModal(false)}>
            <input ref={inputRef} type="text" placeholder="Enter a name" />
            <button
              style={{ breakBefore: `always` }}
              className={styles.bigButton}
              onClick={requestGame}
            >
              Join
            </button>
          </Modal>
        )}
      </div>
    </React.Fragment>
  );
}

Home.propTypes = {
  location: PropTypes.object.isRequired,
};
