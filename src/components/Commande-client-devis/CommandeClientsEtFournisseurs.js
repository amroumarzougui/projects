import React, { Component } from "react";
import ComboBox from "./ComboBox";

class CommandeClientsEtFournisseurs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h1>Hello commandecliet et fournisseurs</h1>

        <div>
          <ComboBox />
        </div>
      </div>
    );
  }
}

export default CommandeClientsEtFournisseurs;
