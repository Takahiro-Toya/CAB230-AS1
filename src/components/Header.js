import React, {useState} from "react";
import icon from "../images/icon.png";
import NavigationBar from "./NavigationBar";
import {Nav, NavItem, Navbar, NavLink, NavbarBrand, Button} from "reactstrap";
import ModalAlert from "./Modal.js";



export default function Header() {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const logout = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("toekn_type", "");
    localStorage.setItem("expires", "");
    localStorage.setItem("loginStatus", "OFF");
    toggle();
  }

  return (
    <header>
      {/* icon */}
      <div id="icon">
        <ModalAlert 
            modal={modal} 
            toggle={toggle} 
            title="Alert!" 
            body="Are you sure to logout?"
            action={logout}
            option="Logout"
            closeOption="Cancel"/>
        <Navbar color="dark">
          <img src={icon} alt="Icon" height="50" width="50"/>
          <NavbarBrand>Stock Price</NavbarBrand>
          <Nav>
            <NavItem >
                {(localStorage.getItem("loginStatus")==="ON") ? 
                  (<Button className="firstheader__item" onClick={toggle}>Logout</Button>) :
                  (<NavLink className="firstheader__item" href="/login">Login</NavLink>) 
                  }
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
