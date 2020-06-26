import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import {
  Navbar,
  Button,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";

const username = localStorage.getItem("username");

export default (props) => {
  const [isOpen, setOpen] = useState(true);
  const toggle = () => setOpen(!isOpen);

  return (
    <Navbar
      style={{ marginTop: "-10px", marginBottom: "10px" }}
      color="light"
      light
      className="navbar shadow-sm p-3 bg-white rounded"
      expand="md"
    >
      <Button
        className="buttonside"
        style={{ color: "#fff" }}
        onClick={props.toggle}
      >
        <FontAwesomeIcon icon={faAlignLeft} />
      </Button>
      &nbsp;&nbsp;&nbsp;
      <span style={{ color: "black" }}>
        <i class="fa fa-user-circle" aria-hidden="true">
          {" "}
          {username}
        </i>
      </span>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to={"/fiche-fournisseur"}>
              <i className="fas fa-shopping-cart"></i> Fournisseur
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={"/fiche-client"}>
              <i className="fas fa-user"></i> client
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={"/fiche-article"}>
              <i className="fas fa-cube"></i> Article
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={"/bon-de-livraison"}>
              <i class="fas fa-list-alt"></i> BL
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={"/devis"}>
              <i className="fas fa-clipboard-list"></i> Devis
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={"/logout"}>
              <i
                class="fas fa-sign-out-alt"
                style={{ color: "rgb(220, 0, 78)" }}
              >
                {" "}
                Log-out
              </i>
              {/* <Button style={{ background: "rgb(220, 0, 78)" }}><i class="fas fa-sign-out-alt" >  Déconnexion</i></Button> */}
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};
