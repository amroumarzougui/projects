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

    this.submitHnadler = this.submitHnadler.bind(this);
  }

  snackbarClose = (event) => {
    this.setState({ snackbaropen: false });
  };

  submitHnadler(event) {
    event.preventDefault();

    fetch("http://localhost:57104/api/Department", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        DepartmentID: null,
        DepartmentName: event.target.DepartmentName.value,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          //alert(result);
          this.setState({ snackbaropen: true, snacckbarmsg: result });
        },
        (error) => {
          //alert('Failed');
          this.setState({ snackbaropen: true, snacckbarmsg: "failed" });
        }
      );
  }

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
            //  closeButton
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
