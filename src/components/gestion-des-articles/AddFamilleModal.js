import React, { Component } from "react";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import "../styling/Styles.css";
import { TextField, Snackbar, IconButton } from "@material-ui/core";
import { connect } from "react-redux";
import { SelectNome } from "../../redux/actions/GetNome";

class AddFamilleModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snackbaropen: false,
      snackbarmsg: ",",
    };
  }

  submitHandler = (event) => {
    event.preventDefault();

    fetch(
      `http://192.168.1.100:81/api/Nome?cat=FA
    &code=${event.target.code.value}
    &lib=${event.target.lib.value}
    `,
      {
        method: "POST",
        header: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ snackbaropen: true, snackbarmsg: result });
          console.log(result);
        },
        (error) => {
          this.setState({ snackbaropen: true, snackbarmsg: "failed" });
        }
      );
    // this.props.SelectArticle();
    this.props.onHide();
    this.props.SelectNome();
    // this.props.GetCodart();
  };

  snackbarClose = () => {
    this.setState({ snackbaropen: false });
  };

  render() {
    return (
      <div className="container">
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={this.state.snackbaropen}
          autoHideDuration={2000}
          onClose={this.snackbarClose}
          message={<span id="message-id"> {this.state.snackbarmsg} </span>}
          action={[
            <IconButton
              key="close"
              color="inherit"
              onClick={this.snackbarClose}
            >
              x
            </IconButton>,
          ]}
        ></Snackbar>

        <Modal
          {...this.props}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton style={{ color: "#17a2b8" }}>
            <Modal.Title id="contained-modal-title-vcenter">
              <b>Ajouter Famille</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ margin: "20px" }}>
              <Form onSubmit={this.submitHandler}>
                {/* <Row form>
                  <Col>
                    <Form.Group controlId="codart">
                      <TextField
                        id="standard-basic"
                        label="Catégorie"
                        margin="normal"
                        fullWidth
                        name="cat"
                        type="text"
                      />
                    </Form.Group>
                  </Col>
                </Row> */}
                <Row form>
                  <Col>
                    <Form.Group controlId="code">
                      <TextField
                        id="standard-basic"
                        label="Code Famille"
                        margin="normal"
                        fullWidth
                        name="code"
                        type="text"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row form>
                  <Col>
                    <Form.Group controlId="lib">
                      <TextField
                        id="standard-basic"
                        label="Libellé"
                        margin="normal"
                        fullWidth
                        name="lib"
                        type="text"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row form>
                  <Col sm={6}></Col>
                  <Col sm={6}>
                    <Form.Group>
                      <Button
                        type="submit"
                        style={{ backgroundColor: "#17a2b8" }}
                      >
                        Enregistrer
                      </Button>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    SelectNome: () => dispatch(SelectNome()),
  };
}

function mapStateToProps(state) {
  return {
    nomes: state.nomes,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddFamilleModal);
