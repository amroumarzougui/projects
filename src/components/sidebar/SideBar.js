import React, { useState } from "react";
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

//window.location.reload();

const SideBar = (props) =>
  // React.useEffect(() => {
  //   localStorage.setItem('myValueInLocalStorage', value);
  // }, [value]);
  {
    const fctt = localStorage.getItem("fct");
    const tokenn = localStorage.getItem("token");
    const [fct, setfct] = useState(fctt);
    const [token, settoken] = useState(tokenn);

    return (
      <div className={classNames("sidebar", { "is-open": props.isOpen })}>
        <div className="sidebar-header">
          <span color="info" onClick={props.toggle} style={{ color: "#fff" }}>
            &times;
          </span>

          <h3>SYROS</h3>
          {/* <h3> {fct} </h3>
          <h3> {token} </h3> */}
        </div>
        <div className="side-menu">
          <Nav vertical className="list-unstyled pb-3">
            <div>
              {fct === "100" ? (
                <Link to={"/homepage"} className="title" onClick={props.toggle}>
                  <NavItem style={{ paddingLeft: "27px" }}>
                    <i class="fas fa-chart-bar"> DashBoard</i>
                  </NavItem>
                </Link>
              ) : null}

              {props.SideBarTitles.sidebar.map((el, index) => (
                // <SubMenu title={el.name} icon={faHome} items={el.submenu} />
                <SubMenu
                  key={index}
                  title={el.title}
                  icon={el.icon}
                  items={el.submenu}
                />
              ))}

              {fct === "100" ? (
                <Link
                  to={"/clicktocall"}
                  className="title"
                  onClick={props.toggle}
                >
                  <NavItem style={{ fontSize: "16px", paddingLeft: "27px" }}>
                    <i class="fas fa-phone-volume"></i>{" "}
                    <span style={{ marginLeft: "17px" }}>Click To Call</span>
                  </NavItem>
                </Link>
              ) : null}

              {fct === "100" ? (
                <Link
                  to={"/personnel"}
                  className="title"
                  onClick={props.toggle}
                >
                  <NavItem style={{ fontSize: "16px", paddingLeft: "27px" }}>
                    <i class="fas fa-users"></i>{" "}
                    <span style={{ marginLeft: "17px" }}>Vendeurs</span>
                  </NavItem>
                </Link>
              ) : (
                <h3></h3>
              )}

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
  };

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

// import React, { Component } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faPaperPlane,
//   faQuestion,
//   faImage,
// } from "@fortawesome/free-solid-svg-icons";
// import SubMenu from "./SubMenu";
// import { NavItem, Nav } from "reactstrap";
// import classNames from "classnames";
// import { Link } from "react-router-dom";
// import { connect } from "react-redux";
// import "./SideBar.scss";

// class SideBar extends Component {
//   constructor(props) {
//     super(props);
//     const fct = localStorage.getItem("fct");
//     const token = localStorage.getItem("token");

//     this.state = {
//       fct: fct,
//       token: token,
//     };
//   }
//   render() {
//     return (
//       <div>
//         <div
//           className={classNames("sidebar", { "is-open": this.props.isOpen })}
//         >
//           <div className="sidebar-header">
//             <span
//               color="info"
//               onClick={this.props.toggle}
//               style={{ color: "#fff" }}
//             >
//               &times;
//             </span>

//             <h3>SYROS</h3>
//             {/* <h3> {this.state.fct} </h3>
//             <h3> {this.state.token} </h3> */}
//           </div>
//           <div className="side-menu">
//             <Nav vertical className="list-unstyled pb-3">
//               <div>
//                 {this.state.fct === "100" ? (
//                   <Link
//                     to={"/homepage"}
//                     className="title"
//                     onClick={this.props.toggle}
//                   >
//                     <NavItem style={{ paddingLeft: "27px" }}>
//                       <i class="fas fa-chart-bar"> DashBoard</i>
//                     </NavItem>
//                   </Link>
//                 ) : null}

//                 {this.props.SideBarTitles.sidebar.map((el, index) => (
//                   <SubMenu
//                     key={index}
//                     title={el.title}
//                     icon={el.icon}
//                     items={el.submenu}
//                   />
//                 ))}

//                 {this.state.fct === "100" ? (
//                   <Link
//                     to={"/clicktocall"}
//                     className="title"
//                     onClick={this.props.toggle}
//                   >
//                     <NavItem style={{ fontSize: "16px", paddingLeft: "27px" }}>
//                       <i class="fas fa-phone-volume"></i>{" "}
//                       <span style={{ marginLeft: "17px" }}>Click To Call</span>
//                     </NavItem>
//                   </Link>
//                 ) : null}

//                 {this.state.fct === "100" ? (
//                   <Link
//                     to={"/personnel"}
//                     className="title"
//                     onClick={this.props.toggle}
//                   >
//                     <NavItem style={{ fontSize: "16px", paddingLeft: "27px" }}>
//                       <i class="fas fa-users"></i>{" "}
//                       <span style={{ marginLeft: "17px" }}>Vendeurs</span>
//                     </NavItem>
//                   </Link>
//                 ) : (
//                   <h3></h3>
//                 )}

//                 <br />
//                 <a to="" href="https://polysoftco.tn">
//                   <NavItem style={{ fontSize: "16px", paddingLeft: "20px" }}>
//                     <i class="fas fa-globe"></i>
//                     <span style={{ marginLeft: "17px" }}>Polysoft&CO.tn</span>
//                   </NavItem>
//                 </a>

//                 <Link to={"/contact"} onClick={this.props.toggle}>
//                   <NavItem>
//                     <NavItem style={{ fontSize: "16px", paddingLeft: "12px" }}>
//                       <i class="far fa-comment-alt"></i>
//                       <span style={{ marginLeft: "17px" }}>Contact</span>
//                     </NavItem>
//                   </NavItem>
//                 </Link>
//               </div>
//             </Nav>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     SideBarTitles: state.SideBarTitles,
//   };
// };
// const ConnectedSideBar = connect(mapStateToProps)(SideBar);

// export default ConnectedSideBar;
