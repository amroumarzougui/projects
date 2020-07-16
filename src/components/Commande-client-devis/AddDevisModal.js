import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import "../styling/Styles.css";
import FieldArraysFormClass from "./FieldArraysFormClass";

var curr = new Date();
curr.setDate(curr.getDate());
var date = curr.toISOString().substr(0, 10);

class AddDevisModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snackbaropen: false,
      snacckbarmsg: "",
      defaultdate: date,
    };
  }

  snackbarClose = (event) => {
    this.setState({ snackbaropen: false });
  };

  render() {
    return (
      <div className="container">
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={this.state.snackbaropen}
          autoHideDuration={3000}
          onClose={this.snackbarClose}
          message={<span id="message-id"> {this.state.snacckbarmsg} </span>}
          action={[
            <IconButton
              key="close"
              arial-label="Close"
              color="inherit"
              onClick={this.snackbarClose}
            >
              x
            </IconButton>,
          ]}
        />
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
              <b>Ajouter Devis</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FieldArraysFormClass hide={() => this.props.onHide()} />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default AddDevisModal;
