import React, {useState } from 'react';
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles/HomeStyle.css";
import "./styles/StocksStyle.css";
import "./styles/PriceHistoryStyle.css";
import "./styles/LoginRegistrationStyle.css";
import "./styles/HeaderStyle.css";

// components
import Header from "./page-components/Header";

// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Stocks from "./pages/Stocks";
import PriceHistory from "./pages/PriceHistory";
import Register from "./pages/Register";

// holds login state (True OR false)
// shared between all pages
export const LoginStatus = React.createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem("loginStatus")==="ON")

  return (
    <Router>
      <div>
        <LoginStatus.Provider value={[loggedIn, setLoggedIn]}>
            <Header />
            <Switch>
              <Route exact path="/" component={() => Home()}/>
              <Route exact path="/login" component={() => Login()}/>
              <Route exact path="/price-history" component={props => PriceHistory(props)}/>
              <Route exact path="/register" component={() => Register()}/>
              <Route exact path="/stocks" component={() => Stocks()}/>
            </Switch>
        </LoginStatus.Provider>
      </div>
    </Router>
  );
}

export default App;
