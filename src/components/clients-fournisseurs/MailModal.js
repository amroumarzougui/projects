import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import "../styling/Styles.css";
import { Button, Col, Row, Label, Form } from "reactstrap";
import { Divider } from "@material-ui/core";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

class MailModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      message: "",
      snackbaropen: false,
      sent: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  snackbarClose = (event) => {
    this.setState({ snackbaropen: false });
  };

  async submitHandler(e) {
    e.preventDefault();

    const { name, email, message } = this.state;

    const form = await axios.post("./api/form", {
      name,
      email,
      message,
    });
  }
  render() {
    return (
      <div className="container">
        <Snackbar
          open={this.state.snackbaropen}
          autoHideDuration={2000}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          onClose={this.snackbarClose}
        >
          <Alert onClose={this.snackbarClose} severity="success">
            Email envoyé avec succées
          </Alert>
        </Snackbar>

        <Modal
          {...this.props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header
            closeButton
            style={{
              backgroundColor: "#F2F3F3",
              color: "#222",
              fontSize: "16px",
            }}
          >
            <b>Nouveau message</b>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={12}>
                <Form onSubmit={this.submitHandler}>
                  <Row>
                    <Col sm={2}>
                      <Label style={{ color: "#A3A4A4" }}> À </Label>
                    </Col>
                    <Col sm={10}>
                      <input
                        name="email"
                        defaultValue={this.props.email}
                        onChange={this.handleChange}
                        className="inputmail"
                        type="text"
                      ></input>
                    </Col>
                  </Row>

                  <Divider></Divider>

                  <Row style={{ marginTop: "5px" }}>
                    <Col sm={2}>
                      <Label style={{ color: "#A3A4A4" }}> Objet </Label>
                    </Col>
                    <Col sm={10}>
                      <input
                        name="name"
                        onChange={this.handleChange}
                        className="inputmail"
                        type="text"
                      ></input>
                    </Col>
                  </Row>

                  <Divider></Divider>

                  <Row style={{ marginTop: "5px" }}>
                    <Col sm={2}>
                      <Label style={{ color: "#A3A4A4" }}> Message </Label>
                    </Col>
                    <Col sm={10}>
                      <textarea
                        rows="10"
                        name="message"
                        onChange={this.handleChange}
                        className="textareamail"
                        type="text"
                      />
                    </Col>
                  </Row>

                  <Divider style={{ marginTop: "15px" }}></Divider>

                  {/* <Button onClick={() => {
                    this.setState({ snackbaropen: true });
                    //  this.props.onHide()
                  }
                  } */}

                  {/* <Button */}
                  <Button
                    onClick={() => {
                      this.setState({ snackbaropen: true });
                      this.props.onHide();
                    }}
                    color="primary"
                  >
                    Envoyer
                  </Button>
                </Form>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default MailModal;
