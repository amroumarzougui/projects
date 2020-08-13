import React, { Component } from "react";
import { Link } from "react-router-dom";
import Center from "react-center";
import { Button } from "react-bootstrap";
import image7 from "./ts3.jpg";

const imgMyimageexample = require("./k.jpg");

const divStyle = {
  width: "100%",
  height: "100vh",
  // minHeight: '640px',
  backgroundImage: `url(${imgMyimageexample})`,
  backgroundSize: "cover",
};

class Logout extends Component {
  constructor(props) {
    super(props);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("fct");

    this.state = {};
  }
  render() {
    return (
      <div style={divStyle}>
        <div>
          <Center>
            <h1 style={{ marginTop: "200px", color: "white" }}>
              Vous avez déconnecté de SYROS!!!
            </h1>
          </Center>
          <Center>
            <Link to="/">
              {/* <a href="/"> */}
              <Button
                style={{
                  height: "200px",
                  width: "200px",
                  borderColor: "rgb(220, 0, 78)",
                  fontSize: "30px",
                  borderRadius: "50%",
                  backgroundColor: "rgb(220, 0, 78)",
                  color: "white",
                }}
              >
                Login ...
              </Button>
              {/* </a> */}
            </Link>
          </Center>
        </div>
      </div>
    );
  }
}

export default Logout;
