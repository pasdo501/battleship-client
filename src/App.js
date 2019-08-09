import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import SocketContext from "./contexts/socket";
import Header from "./components/Header";
import Home from "./components/Home";
import Prep from "./components/Prep";
import Game from "./components/Game";
import ChatBox from "./components/ChatBox";

import useSocket from "./hooks/useSocket";

import "./App.scss";

function App() {
  const [socket, player, connect, disconnect, opponentName] = useSocket();

  const socketContextValue = React.useMemo(
    () => ({
      socket,
      player,
      connect,
      disconnect,
      opponentName,
    }),
    [socket, player, connect, disconnect, opponentName]
  );

  return (
    <Router>
      <SocketContext.Provider value={socketContextValue}>
        <Header />
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/prep" component={Prep} />
            <Route path="/game" component={Game} />
            <Route render={() => <div>404</div>} />
          </Switch>
          <Route path={["/prep", "/game"]} component={ChatBox} />
        </main>
      </SocketContext.Provider>
    </Router>
  );
}

export default App;
