import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Content from "./components/content/Content";
import ConnectedSideBar from "./components/sidebar/SideBar";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import Wrapper from "./components/wrapper/Wrapper";
import Login from "./Login/Login";
import Logout from "./components/content/Logout";

export default () => {
  // const [isOpen, setOpen] = useState(true);
  // const toggle = () => setOpen(!isOpen);
  return (
    <div>
      {/* <Router>
        <div className="App wrapper">
          <ConnectedSideBar toggle={toggle} isOpen={isOpen} />
          <Content toggle={toggle} isOpen={isOpen} />
        </div>
      </Router> */}
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <Route component={Wrapper} />
        </Switch>
      </Router>
    </div>
  );
};
