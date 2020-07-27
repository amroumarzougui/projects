import React, { useState } from "react";
import { Collapse, NavItem, NavLink } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";

const SubMenu = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);
  const { title, items, icon } = props;

  return (
    <div>
      <NavItem
        onClick={toggleNavbar}
        className={classNames({ "menu-open": !collapsed })}
      >
        <NavLink className="dropdown-toggle">
          {/* <FontAwesomeIcon icon={icon} className="mr-2" /> */}
          {/* {icon} */}

          {title}
        </NavLink>
      </NavItem>
      <Collapse
        isOpen={!collapsed}
        navbar
        className={classNames("items-menu", { "mb-1": !collapsed })}
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
              <NavItem style={{ marginLeft: "20px" }} className="pl-4">
                {item.icon}&nbsp;&nbsp;{item.title}
              </NavItem>
            </Link>
          ))}
      </Collapse>
    </div>
  );
};

export default SubMenu;
