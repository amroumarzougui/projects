import React, { useState, Component } from "react";
import { Collapse, NavItem, NavLink } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";

class SubMenu extends Component {
  constructor(props) {
    super(props);
    const fct = localStorage.getItem("fct");
    const token = localStorage.getItem("token");

    this.state = { collapsed: true, fct: fct, token: token };
  }

  toggleNavbar = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  render() {
    const { title, items, icon } = this.props;

    return (
      <div>
        <div>
          {this.state.fct === "200" &&
          (title === "Suivi Banque" || title === "Parametres") ? null : (
            <NavItem
              onClick={this.toggleNavbar}
              className={classNames({ "menu-open": !this.state.collapsed })}
            >
              <NavLink className="dropdown-toggle">
                {/* <FontAwesomeIcon icon={icon} className="mr-2" /> */}
                {/* {icon} */}

                {title}
              </NavLink>
            </NavItem>
          )}

          <Collapse
            isOpen={!this.state.collapsed}
            navbar
            className={classNames("items-menu", {
              "mb-1": !this.state.collapsed,
            })}
          >
            {items &&
              items.map((item, index) => (
                <Link
                  key={index}
                  to={
                    "/" + item.title &&
                    item.title.toLowerCase().split(" ").join("-")
                  }
                  // onClick={toggleNavbar}
                >
                  {this.state.fct === "200" &&
                  (item.title === "Bon entree" ||
                    item.title === "Bon de sortie") ? null : (
                    <NavItem style={{ marginLeft: "20px" }} className="pl-4">
                      {item.icon}&nbsp;&nbsp;{item.title}
                    </NavItem>
                  )}
                </Link>
              ))}
          </Collapse>
        </div>
      </div>
    );
  }
}

export default SubMenu;

// const SubMenu = (props) => {
//   const [collapsed, setCollapsed] = useState(true);
//   const toggleNavbar = () => setCollapsed(!collapsed);
//   const { title, items, icon } = props;

//   return (
//     <div>
//       <NavItem
//         onClick={toggleNavbar}
//         className={classNames({ "menu-open": !collapsed })}
//       >
//         <NavLink className="dropdown-toggle">
//           {/* <FontAwesomeIcon icon={icon} className="mr-2" /> */}
//           {/* {icon} */}

//           {title}
//         </NavLink>
//       </NavItem>
//       <Collapse
//         isOpen={!collapsed}
//         navbar
//         className={classNames("items-menu", { "mb-1": !collapsed })}
//       >
//         {items &&
//           items.map((item, index) => (
//             <Link
//               key={index}
//               to={
//                 "/" + item.title &&
//                 item.title.toLowerCase().split(" ").join("-")
//               }
//               // onClick={toggleNavbar}
//             >
//               <NavItem style={{ marginLeft: "20px" }} className="pl-4">
//                 {item.icon}&nbsp;&nbsp;{item.title}
//               </NavItem>
//             </Link>
//           ))}
//       </Collapse>
//     </div>
//   );
// };

// export default SubMenu;
