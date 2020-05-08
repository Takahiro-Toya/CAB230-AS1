import React, {useState, useContext} from "react";
import icon from "../images/icon.png";
import NavigationBar from "./NavigationBar";
import {Nav, NavItem, Navbar, NavLink, Button} from "reactstrap";
import ModalAlert from "./Modal.js";
import {LoginStatus} from "../App.js";
import {HandleLogout} from "../management/LoginManagement.js";

export default function Header() {
  const [loggedIn, setLoggedIn] = useContext(LoginStatus);
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModalVisible = () => setModalVisible(!modalVisible);
  const logout = () => {
    toggleModalVisible();
    HandleLogout();
    setLoggedIn(false);
  }

  return (
    <header>
      <div >
        <ModalAlert 
            isOpen={modalVisible} 
            toggle={toggleModalVisible} 
            title="Alert!" 
            body="Are you sure to logout?"
            action={logout}
            option="Logout"
            closeOption="Cancel"/>
        <Navbar color="dark">
          <img src={icon} alt="Icon" height="50" width="50"/>
          <Nav>
            <NavItem >
              {(loggedIn) ? 
                (<Button className="login_register" onClick={toggleModalVisible}>Logout</Button>) :
                (<NavLink className="login_register" href="/login">Login</NavLink>) }
            </NavItem>
            <NavItem>
              {(!loggedIn) ?
                (<NavLink className="login_register" href="/register">Register</NavLink>) :
                null }
            </NavItem>
          </Nav>
        </Navbar>

      </div>
      <NavigationBar />
    </header>
  );
}
