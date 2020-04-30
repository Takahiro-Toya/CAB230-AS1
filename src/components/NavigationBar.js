import React from "react";
import {Nav, NavItem, NavLink, Navbar} from "reactstrap";

// navigation links
export default function NavigationBar() {
    return (
        <div>
            <Navbar color="dark" expand="lg" >
                <Nav>
                    <NavItem>
                        <NavLink className="secondheader__item" href="/">Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="secondheader__item" href="/stocks">Stocks</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="secondheader__item" href="/price-history">Price History</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
    );
}
