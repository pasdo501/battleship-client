import React from "react";
import { Redirect } from "react-router-dom";

import Loading from "./Loading";
import Modal from "./Modal";
import Footer from "./Footer";

import FlashState from "../util/FlashState";
import SocketContext from "../contexts/socket";
import styles from "./styles/Home.module.scss";

function homeReducer(state, action) {
  switch (action.type) {
    case "startModal":
      return {
        ...state,
        joining: false,
        showModal: true,
      };
    case "joinModal":
      return {
        ...state,
        joining: true,
        showModal: true,
      };
    case "hideModal":
      return {
        ...state,
        showModal: false,
      };
    case "startGame":
      return {
        ...state,
        showModal: false,
        name: action.name,
        waiting: true,
      };
    case "joinGame":
      return {
        ...state,
        name: action.name,
      };
    case "redirectReady":
      return {
        ...state,
        redirect: true,
      };
    case "cancelWait":
      return {
        ...state,
        waiting: false,
      };
    default:
      throw new Error("Invalid action type");
  }
}

export default function Home() {
  const [state, dispatch] = React.useReducer(homeReducer, {
    joining: false,
    showModal: false,
    redirect: false,
    name: "",
    waiting: false,
  });

  const { socket, connect, disconnect } = React.useContext(SocketContext);
  const [roomId, setRoomId] = React.useState("");
  const nameRef = React.useRef();
  const idRef = React.useRef();

  const startGame = () => {
    const playerName = nameRef.current.value.trim();
    if (playerName.length < 1) {
      window.alert("Please enter a name");
      return;
    }
    dispatch({ type: "startGame", name: playerName });
    connect();
  };

  const joinGame = () => {
    const playerName = nameRef.current.value.trim();
    if (playerName.length < 1) {
      window.alert("Please enter a name");
      return;
    }
    const gameId = idRef.current ? idRef.current.value.trim() : "";
    if (gameId.length < 1) {
      window.alert("Please enter a Game ID");
      return;
    }
    dispatch({ type: "joinGame", name: playerName });
    connect(gameId);
  };

  const cancelRequest = React.useCallback(() => {
    dispatch({ type: "cancelWait" });
    setRoomId("");
    disconnect();
  }, [disconnect]);

  React.useEffect(() => {
    if (socket === null) {
      return;
    }

    socket.emit("name", state.name);

    socket.on("invalidRoom", (message) => {
      window.alert(message);
      cancelRequest();
    });
    socket.on("roomAllocation", (roomId) => setRoomId(roomId));
    socket.on("playersReady", () => dispatch({ type: "redirectReady" }));

    return () => {
      socket.off("invalidRoom");
      socket.off("roomAllocation");
      socket.off("playersReady");
    };
  }, [socket, state.name, cancelRequest]);

  React.useEffect(() => {
    const message = FlashState.get("redirectMessage");

    if (message) {
      window.alert(message);
    }
  }, []);

  const { showModal, redirect, waiting, joining } = state;
  const loadingText = waiting
    ? `Your game ID is ${roomId}. Waiting for another player (click to cancel) `
    : "";

  if (redirect) {
    return <Redirect to="/prep" />;
  }

  return (
    <React.Fragment>
      {waiting && (
        <Loading
          onClick={cancelRequest}
          style={{ cursor: `pointer` }}
          text={loadingText}
        />
      )}
      <div className={styles.wrapper}>
        <button
          className={styles.bigButton}
          onClick={() => dispatch({ type: "startModal" })}
        >
          Start Game
        </button>
        <button
          className={styles.bigButton}
          onClick={() => dispatch({ type: "joinModal" })}
        >
          Join Game
        </button>
        {showModal && (
          <Modal handleHide={() => dispatch({ type: "hideModal" })}>
            <div>
              <input
                className={styles.input}
                ref={nameRef}
                type="text"
                placeholder="Enter a Name"
              />
              {joining && (
                <input
                  className={styles.input}
                  ref={idRef}
                  type="text"
                  placeholder="Game ID"
                />
              )}
              <button
                style={{ breakBefore: `always` }}
                className={styles.bigButton}
                onClick={() => (joining ? joinGame() : startGame())}
              >
                {joining ? "Join" : "Start"}
              </button>
            </div>
          </Modal>
        )}
      </div>
      <Footer />
    </React.Fragment>
  );
}
