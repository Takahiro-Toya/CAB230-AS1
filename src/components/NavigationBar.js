import React, { useContext } from "react";
import {Nav, NavItem, NavLink, Navbar, Label} from "reactstrap";

// navigation links
export default function NavigationBar() {
    return (
        <div>
            <Navbar color="dark" expand="lg" >
                <Nav>
                    <NavItem>
                        <NavLink className="page_items" href="/">Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="page_items" href="/stocks">Stocks</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
    );
}
