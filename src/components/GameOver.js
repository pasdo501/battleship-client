import React from "react";
import { Redirect } from "react-router-dom";

import Modal from "./Modal";
import Loading from "./Loading";

import SocketContext from "../contexts/socket";

import styles from "./styles/GameOver.module.scss";

import PropTypes from "prop-types";

export default function GameOver({ victorious }) {
  const { socket } = React.useContext(SocketContext);
  const [rematchRequested, setRematchRequested] = React.useState(false);
  const [rematchAccepted, setRematchAccepted] = React.useState(false);

  React.useEffect(() => {
    if (socket === null) return;

    socket.on("rematchAccepted", () => setRematchAccepted(true));
  }, [socket]);

  const requestRematch = () => {
    if (socket === null) {
      window.alert(
        "Server connection lost. Please return to the homepage and try again."
      );
      return;
    }
    setRematchRequested(true);
    socket.emit("requestRematch");
  };

  if (rematchAccepted) {
    return <Redirect to="/prep" />;
  }

  return (
    <Modal withCloseButton={false}>
      <h2>{victorious === true ? "You Win!" : "You lose :("}</h2>
      <button
        className={styles.button}
        onClick={requestRematch}
        disabled={rematchRequested}
      >
        {rematchRequested ? "Rematch Requested" : "Request Rematch"}
      </button>
      {rematchRequested && <Loading text={`Rematch requested, please wait`} />}
    </Modal>
  );
}

GameOver.propTypes = {
  victorious: PropTypes.bool.isRequired,
};
