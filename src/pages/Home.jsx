import React from "react";
import { Link } from "react-router-dom";

export default function Home() {

    return (
        <main className="initial-page-container">
            <WelcomMessage/>
            <Options />
        </main>
    );
}

const WelcomMessage = () => (
    <div>
        <h1>Stock Prices</h1>
        <p>Find stock prices from company simbols, industry type, and filter them by date!</p>
        <p>What would you like to do? Select a card below to see stock prices</p>
    </div>
);

const Options = () => (   
    <section class="options" >
        <div className="options__content">
            <Link to="/stocks">See Stocks</Link>
            {/* <Link to="/quote">Quote</Link>
            <Link to="/price-history">Price History</Link> */}
        </div>
    </section>
);
