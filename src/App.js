import React from 'react';
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles/HomeStyle.css";
import "./styles/StocksStyle.css";

// components
import Header from "./components/Header";

// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Stocks from "./pages/Stocks";
import PriceHistory from "./pages/PriceHistory";
import Quote from "./pages/Quote";
import Register from "./pages/Register";
import useSymbols from "./api.js";

function App() {

  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/price-hisotry">
            <PriceHistory />
          </Route>
          <Route exact path="/quote">
            <Quote />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/stocks">
            <Stocks />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
