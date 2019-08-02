import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";

import Header from "./components/Header";
import Home from "./components/Home";
import Prep from "./components/Prep";
import Game from "./components/Game";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/prep" component={Prep} />
          <Route path="/game" component={Game} />
          <Route render={() => <div>404</div>} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
