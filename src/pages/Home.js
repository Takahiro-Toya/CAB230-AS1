import React, { useContext } from "react";
import { LoginStatus } from "../App.js";
import { Button } from "reactstrap";

export default function Home() {
    const [loggedIn, setLoggedIn] = useContext(LoginStatus);
    return (
        <main className="home background">
            <WelcomMessage/>
            <Options shouldHidden={loggedIn}/>
        </main>
    );
}

const WelcomMessage = () => (
    <div className="home_message">
        <h1>Stock Prices</h1>
        <p>Find a company symbol, then see price history!</p>
        <p>What would you like to do? Select an option below to see stock prices or login to access full features!</p>
    </div>
);

const Options = (props) => (   
    <div className="home_options">
        <ul className="col1">
            <li><Button className="button" color="success" href="/stocks" size="lg" block>See company list</Button></li>
        </ul>
        {props.shouldHidden ? null : <h2>OR</h2>}
        <ul className="col2">
            <li>{props.shouldHidden ? null : <Button className="button" color="warning" href="/login" block>Login</Button>}</li>
            <li>{props.shouldHidden ? null : <Button className="button" color="warning" href="/register" block>Become a member to access full features</Button>}</li>
        </ul>
    </div>
);
