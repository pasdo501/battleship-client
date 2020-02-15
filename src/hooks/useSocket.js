import React from "react";
import openSocket from "socket.io-client";

import FlashState from "../util/FlashState";

const hostAddr =
  process.env.NODE_ENV === "production"
    ? "https://node-battleship-server.herokuapp.com:3000"
    : "localhost:8080";

export default function useSocket() {
  const [socket, setSocket] = React.useState(null);
  const [player, setPlayer] = React.useState(null);
  const [attemptConnect, setAttemptConnect] = React.useState(false);
  const [opponentName, setOpponentName] = React.useState("");
  const [redirectHome, setRedirectHome] = React.useState(false);
  const [roomId, setRoomId] = React.useState(null);

  const connect = (roomId = null) => {
    setRedirectHome(false);
    setAttemptConnect(true);
    setRoomId(roomId);
  };

  const disconnect = React.useCallback(() => {
    setAttemptConnect(false);
    setPlayer(null);
    socket.close();
  }, [socket]);

  React.useEffect(() => {
    if (attemptConnect && socket === null) {
      setSocket(
        openSocket(hostAddr, {
          query: { type: "battleship", roomId },
        })
      );
    }
  }, [attemptConnect, socket, roomId]);

  React.useEffect(() => {
    if (socket === null) {
      return;
    }

    socket.on("connected", (player) => setPlayer(player));
    socket.on("names", ({ playerOne, playerTwo }) =>
      setOpponentName(player === "playerOne" ? playerTwo : playerOne)
    );
    socket.on("disconnect", () => {
      console.log("Disconnected");
      setSocket(null);
    });
    // Just close socket for now - will want better handling of this
    socket.on("opponentDisconnect", () => {
      disconnect();
      setRedirectHome(true);
    });

    return () => {
      socket.off("connected");
      socket.off("names");
      socket.off("disconnect");
      socket.off("opponentDisconnect");
    };
  }, [socket, player, disconnect]);

  React.useEffect(() => {
    if (!redirectHome) return;

    FlashState.set("redirectHome", true);
    FlashState.set("redirectMessage", `${opponentName} disconnected`);
    setRedirectHome(false);
  }, [redirectHome, opponentName]);

  return [socket, player, connect, disconnect, opponentName];
}
