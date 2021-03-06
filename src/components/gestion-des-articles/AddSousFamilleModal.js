import React, { Component } from "react";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import "../styling/Styles.css";
import { TextField, Snackbar, IconButton, MenuItem } from "@material-ui/core";
import { connect } from "react-redux";
import { SelectNome } from "../../redux/actions/GetNome";
import { SelectSousFamille } from "../../redux/actions/GetSousFamille";

class AddSousFamilleModal extends Component {
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
      `http://192.168.1.100:81/api/SousFamille?cat=SF&code=${event.target.code.value}&lib=${event.target.lib.value}&chdec=${event.target.chdec.value}`,
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
    this.props.SelectSousFamille();
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
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton style={{ color: "#17a2b8" }}>
            <Modal.Title id="contained-modal-title-vcenter">
              <b>Ajouter SousFamille</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ padding: "15px" }}>
              <Form onSubmit={this.submitHandler}>
                <Row form>
                  <Col>
                    <Form.Group controlId="chdec">
                      <TextField
                        id="outlined-select-currency"
                        select
                        label="Famille"
                        margin="normal"
                        fullWidth
                        name="chdec"
                        required
                      >
                        {this.props.nomes.nomes.map((option) => (
                          <MenuItem key={option.code} value={option.code}>
                            {option.code}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Form.Group>
                  </Col>
                </Row>
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
                        style={{
                          backgroundColor: "#17a2b8",
                          width: "100%",
                          marginBottom: "-20px",
                        }}
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
    SelectSousFamille: () => dispatch(SelectSousFamille()),
  };
}

function mapStateToProps(state) {
  return {
    nomes: state.nomes,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddSousFamilleModal);
