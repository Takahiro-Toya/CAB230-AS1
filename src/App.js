import React from 'react';
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles/HomeStyle.css";
import "./styles/StocksStyle.css";
import "./styles/PriceHistoryStyle.css";
import "./styles/LoginRegisrationStyle.css";

// components
import Header from "./components/Header";

// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Stocks from "./pages/Stocks";
import PriceHistory from "./pages/PriceHistory";
import Register from "./pages/Register";

function App() {

  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={() => Home()}/>
          <Route exact path="/login" component={() => Login()}/>
          <Route exact path="/price-history" component={props => PriceHistory(props)}/>
          <Route exact path="/register" component={() => Register()}/>
          <Route exact path="/stocks" component={() => Stocks()}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
