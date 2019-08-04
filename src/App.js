import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import SocketContext from "./contexts/socket";
import Header from "./components/Header";
import Home from "./components/Home";
import Prep from "./components/Prep";
import Game from "./components/Game";

import useSocket from "./hooks/useSocket"

import "./App.scss";

function App() {
  const [socket, connect] = useSocket()

  const contextValue = React.useMemo(
    () => ({
      socket,
      connect,
    }),
    [socket, connect]
  );

  return (
    <Router>
      <SocketContext.Provider value={contextValue}>
        <Header />
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/prep" component={Prep} />
            <Route path="/game" component={Game} />
            <Route render={() => <div>404</div>} />
          </Switch>
        </main>
      </SocketContext.Provider>
    </Router>
  );
}

export default App;
