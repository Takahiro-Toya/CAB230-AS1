import React from "react";
import NavigationBar from "./NavigationBar";
import { Link } from "react-router-dom";
import {Nav, NavItem, Navbar, NavLink, NavbarBrand} from "reactstrap";
import icon from "../images/icon.png";

// the header
export default function Header() {
  return (
    <header>
      {/* icon */}
      <div id="icon">
        <Navbar color="dark">
          <img src={icon} alt="Icon" height="50" width="50"/>
          <NavbarBrand>Stock Price</NavbarBrand>
          <Nav>
            <NavItem >
                <NavLink className="firstheader__item" href="/login">Login</NavLink>
            </NavItem>
            <NavItem>
                <NavLink className="firstheader__item" href="/register">Register</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>

      <NavigationBar />
    </header>
  );
}
