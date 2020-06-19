import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";
import Content from "../../components/content/Content";
import ConnectedSideBar from "../../components/sidebar/SideBar";
const Wrapper = () => {
  const [isOpen, setOpen] = useState(true);
  const toggle = () => setOpen(!isOpen);
  return (
    <div className="App wrapper">
      <ConnectedSideBar toggle={toggle} isOpen={isOpen} />
      <Content toggle={toggle} isOpen={isOpen} />
    </div>
  );
};

export default Wrapper;
