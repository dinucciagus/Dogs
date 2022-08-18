import "./App.css";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";

import DogDetails from "./components/DogDetails";
import DogCreate from "./components/DogCreate";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/dogs/:id" component={DogDetails} />
        <Route exact path="/home" component={Home} />
        <Route path="/create" component={DogCreate} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
