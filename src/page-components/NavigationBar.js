import React from "react";
import {Nav, NavItem, NavLink, Navbar } from "reactstrap";

/**
 * Navigation is a bar that contains navigation link to other pages
 */
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
