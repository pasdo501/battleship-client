import React from "react";

import openSocket from "socket.io-client";

export default function useSocket() {
  const [socket, setSocket] = React.useState(null);
  const [player, setPlayer] = React.useState(null);
  const [attemptConnect, setAttemptConnect] = React.useState(false);

  const connect = () => {
      setAttemptConnect(true)
  }
  
  const disconnect = () => {
      setAttemptConnect(false)
      setPlayer(null)
      socket.close()
  }

  React.useEffect(() => {
    if (attemptConnect && socket === null) {
        setSocket(openSocket("localhost:8080"))
    }
  }, [attemptConnect, socket])

  React.useEffect(() => {
    if (socket === null) {
      return;
    }
    socket.on("connected", (player) => setPlayer(player));
    socket.on("disconnect", () => {
        console.log('Disconnected')
        setSocket(null)
    })

    return () => {
        socket.off("connected")
        socket.off("disconnect")
    }
  }, [socket]);

  return [socket, connect, disconnect];
}
