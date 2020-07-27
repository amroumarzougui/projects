import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faQuestion,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import SubMenu from "./SubMenu";
import { NavItem, Nav } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./SideBar.scss";
// import image from "./p3.png";

const SideBar = (props) => (
  <div className={classNames("sidebar", { "is-open": props.isOpen })}>
    <div className="sidebar-header">
      <span color="info" onClick={props.toggle} style={{ color: "#fff" }}>
        &times;
      </span>
      {/* <img
        src={image}
        alt="Contact"
        style={{ width: "100%", height: "100%" }}
      /> */}
      <h3>SYROS</h3>
      {/* <img
        src={image}
        alt="Contact"
        style={{ width: "100px", height: "80px", padding: "10px", marginLeft: "50px" }}
      /> */}
    </div>
    <div className="side-menu">
      <Nav vertical className="list-unstyled pb-3">
        <div>
          <Link to={"/homepage"} className="title" onClick={props.toggle}>
            <NavItem style={{ paddingLeft: "27px" }}>
              <i class="fas fa-chart-bar"> DashBoard</i>
            </NavItem>
          </Link>

          {props.SideBarTitles.sidebar.map((el, index) => (
            // <SubMenu title={el.name} icon={faHome} items={el.submenu} />
            <SubMenu
              key={index}
              title={el.title}
              icon={el.icon}
              items={el.submenu}
            />
          ))}
          {/* <Link to={"/bon-entree"} className="title" onClick={props.toggle}> 
            <NavItem style={{ fontSize: "16px", paddingLeft: "27px" }}>
              <i class="fa fa-retweet" aria-hidden="true"></i>

              <span style={{ marginLeft: "15px" }}>Bon d'entrée</span>
            </NavItem>
          </Link> */}
          {/* <Link to={"/devis"} className="title" onClick={props.toggle}>
            <NavItem style={{ fontSize: "16px", paddingLeft: "27px" }}>
              <i className="fas fa-tasks"></i>
              <span style={{ marginLeft: "15px" }}>Devis client</span>
            </NavItem>
          </Link>
          <Link
            to={"/bon-de-commande"}
            className="title"
            onClick={props.toggle}
          >
            <NavItem style={{ fontSize: "16px", paddingLeft: "27px" }}>
              <i className="fas fa-clipboard-list"></i>
              <span style={{ marginLeft: "17px" }}>Bon de commande</span>
            </NavItem>
          </Link>
          <Link
            to={"/bon-de-livraison"}
            className="title"
            onClick={props.toggle}
          >
            <NavItem style={{ fontSize: "16px", paddingLeft: "27px" }}>
              <i className="fas fa-list-alt"></i>
              <span style={{ marginLeft: "15px" }}>Bon de Livraison</span>{" "}
            </NavItem>
          </Link>
          <Link to={"/facture"} className="title" onClick={props.toggle}>
            <NavItem style={{ fontSize: "16px", paddingLeft: "27px" }}>
              <i className="fas fa-file-invoice-dollar"></i>
              <span style={{ marginLeft: "17px" }}>Facture</span>
            </NavItem>
          </Link> */}
          {/* <Link to={"/reglement"} className="title" onClick={props.toggle}>
            <NavItem style={{ fontSize: "16px", paddingLeft: "27px" }}>
              <i className="fab fa-dashcube"></i>
              <span style={{ marginLeft: "17px" }}>Règlement Client</span>
            </NavItem>
          </Link> */}
          {/* <Link to={"/nomenclature"} className="title" onClick={props.toggle}>
            <NavItem style={{ fontSize: "16px", paddingLeft: "27px" }}>
              <i class="far fa-plus-square"></i>
              <span style={{ marginLeft: "17px" }}>Nomenclature</span>
            </NavItem>
          </Link> */}
          <Link to={"/clicktocall"} className="title" onClick={props.toggle}>
            <NavItem style={{ fontSize: "16px", paddingLeft: "27px" }}>
              <i class="fas fa-phone-volume"></i>{" "}
              <span style={{ marginLeft: "17px" }}>Click To Call</span>
            </NavItem>
          </Link>

          <br />
          <a to="" href="https://polysoftco.tn">
            <NavItem style={{ fontSize: "16px", paddingLeft: "20px" }}>
              <i class="fas fa-globe"></i>
              <span style={{ marginLeft: "17px" }}>Polysoft&CO.tn</span>
            </NavItem>
          </a>

          <Link to={"/contact"} onClick={props.toggle}>
            <NavItem>
              <NavItem style={{ fontSize: "16px", paddingLeft: "12px" }}>
                <i class="far fa-comment-alt"></i>
                <span style={{ marginLeft: "17px" }}>Contact</span>
              </NavItem>
            </NavItem>
          </Link>
        </div>
      </Nav>
    </div>
  </div>
);

// const mapDispatchToProps = dispatch => ({
//   changeSubmenuList: index => {
//     dispatch(changeSubmenuList(index));
//   }
// });
const mapStateToProps = (state) => {
  return {
    SideBarTitles: state.SideBarTitles,
  };
};
const ConnectedSideBar = connect(mapStateToProps)(SideBar);

export default ConnectedSideBar;
