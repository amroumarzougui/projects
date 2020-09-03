import React, { Component } from "react";
import image from "./contactsyros.png";
import image1 from "../../Login/contactsyros.png";
import { Redirect } from "react-router-dom";

class Contact extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");

    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }
    this.state = {
      loggedIn,
    };
  }

  render() {
    if (this.state.loggedIn === false) {
      return <Redirect to="/" />;
    }

    return (
      <div className="contact-page" style={{ width: "100%" }}>
        <img
          src={image1}
          alt="Contact"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    );
  }
}

export default Contact;
