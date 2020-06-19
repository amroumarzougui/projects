import React, { Component } from "react";

import AddDevisModal from "./AddDevisModal";

class AddDevis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addModalShow1: false
    };
  }

  render() {
    let addModalClose1 = () => this.setState({ addModalShow1: false });
    return (
      <div>
        <div className="" style={{ textAlign: "center" }}>
          <button
            className="icon-btn add-btn"
            onClick={() => this.setState({ addModalShow1: true })}
          >
            <div className="add-icon"></div>
            <div className="btn-txt">Ajouter devis</div>
          </button>
        </div>
        <br />
        <AddDevisModal
          show={this.state.addModalShow1}
          onHide={addModalClose1}
        />
      </div>
    );
  }
}

export default AddDevis;
