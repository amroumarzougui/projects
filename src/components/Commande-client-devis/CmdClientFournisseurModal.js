import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import "../styling/Styles.css";
import ComboBox from "./ComboBox";

class CmdClientFournisseurModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="container">
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header
            closeButton
            style={{ backgroundColor: "white", color: "#020F64" }}
          >
            <Modal.Title id="contained-modal-title-vcenter">
              <b>Commande client et Fournisseur</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ComboBox />
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default CmdClientFournisseurModal;
