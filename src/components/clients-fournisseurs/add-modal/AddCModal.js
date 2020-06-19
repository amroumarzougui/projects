import React, { Component } from "react";
import { Modal, Card } from "react-bootstrap";
import { Row, Col, FormGroup, Button } from "reactstrap";
import {
  TextField,
  FormControlLabel,
  Switch,
  Grid,
  Snackbar,
  IconButton,
} from "@material-ui/core";
import { connect } from "react-redux";
import { GetCodcli } from "../../../redux/actions/GetCodcli";
import { SelectClient } from "../../../redux/actions/GetClients";

class AddCModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gilad: 0,
      timbre: 0,
      soustraitant: 0,
      snackbaropen: false,
      snackbarmsg: ",",
    };
  }

  componentDidMount() {
    this.props.GetCodcli();
  }

  snackbarClose = () => {
    this.setState({ snackbaropen: false });
  };

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.checked });
  };

  submitHandler = (event) => {
    event.preventDefault();

    fetch(
      `http://192.168.1.100:81/api/CLIENTs?codcli=${event.target.codcli.value}&raisoc=${event.target.raisoc.value}&tel1=${event.target.tel1.value}&tel2=${event.target.tel2.value}&passager=${event.target.passager.value}&email=${event.target.emailcli.value}&adr=${event.target.adressecli.value}&sitweb=${event.target.sitewebcli.value}&cin=${event.target.cincli.value}&ville=${event.target.villecli.value}&cp=${event.target.cp.value}&fax=${event.target.identcli.value}&compte=${event.target.fodeccli.value}&timbre=${event.target.timbre.value}&NAR=${event.target.soustraitant.value}&RC=${event.target.contactcli.value}&CodDep=${event.target.impotcli.value}&RIB2=${event.target.comptable.value}`,
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
    this.props.SelectClient();
    this.props.onHide();
    this.props.GetCodcli();
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
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header
            closeButton
            style={{ backgroundColor: "white", color: "#020F64" }}
          >
            <Modal.Title id="contained-modal-title-vcenter">
              <b>Ajouter Client</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.submitHandler}>
              <Row>
                <Col sm={6}>
                  <Card className="card0">
                    <Card.Body>
                      <Row form>
                        <Col sm={6}>
                          <FormGroup>
                            {this.props.codclis.codclis.map((cod) => (
                              <TextField
                                className="card add-input"
                                id="standard-basic"
                                label="Code Client"
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                name="codcli"
                                value={cod.Column1 + 1}
                                disabled
                              />
                            ))}
                          </FormGroup>
                        </Col>
                        <Col sm={6}>
                          <FormGroup>
                            <Grid item style={{ marginTop: "10px" }}>
                              <Switch
                                name="passager"
                                color="primary"
                                checked={this.state.gilad}
                                onChange={this.handleChange("gilad")}
                                value={this.state.gilad}
                                // value="gilad"
                              />
                              Passager
                            </Grid>
                            {/* <Grid item style={{ color: "#f50057" }}>
                                                            Code
                        </Grid> */}
                          </FormGroup>
                        </Col>
                      </Row>

                      {/* ////////////////////////////////////////////////// */}

                      <Row form>
                        <Col sm={6}>
                          <FormGroup>
                            <TextField
                              className="card add-input"
                              id="standard-basic"
                              label="Raison Sociale"
                              margin="dense"
                              variant="outlined"
                              fullWidth
                              name="raisoc"
                            />
                          </FormGroup>
                        </Col>
                        <Col sm={6}>
                          <FormGroup>
                            <TextField
                              className="card add-input"
                              id="standard-basic"
                              label="CIN"
                              margin="dense"
                              variant="outlined"
                              fullWidth
                              name="cincli"
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      {/* ////////////////////////////////////////////////// */}

                      <Row form>
                        <Col sm={6}>
                          <FormGroup>
                            <TextField
                              className="card add-input"
                              id="standard-basic"
                              label="Email"
                              margin="dense"
                              variant="outlined"
                              fullWidth
                              name="emailcli"
                            />
                          </FormGroup>
                        </Col>
                        <Col sm={6}>
                          <FormGroup>
                            <TextField
                              className="card add-input"
                              id="standard-basic"
                              label="Adresse"
                              margin="dense"
                              variant="outlined"
                              fullWidth
                              name="adressecli"
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      {/* ////////////////////////////////////////////////// */}

                      <Row form>
                        <Col sm={6}>
                          <FormGroup>
                            <TextField
                              className="card add-input"
                              id="standard-basic"
                              label="Ville"
                              margin="dense"
                              variant="outlined"
                              fullWidth
                              name="villecli"
                            />
                          </FormGroup>
                        </Col>
                        <Col sm={6}>
                          <FormGroup>
                            <TextField
                              className="card add-input"
                              id="standard-basic"
                              //   type="number"
                              //   InputLabelProps={{
                              //     shrink: true,
                              //   }}
                              label="Code Postal"
                              margin="dense"
                              variant="outlined"
                              fullWidth
                              name="cp"
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      {/* ////////////////////////////////////////////////// */}

                      <Row form>
                        <Col sm={6}>
                          <FormGroup>
                            <TextField
                              className="card add-input"
                              id="standard-basic"
                              //   type="number"
                              //   InputLabelProps={{
                              //     shrink: true,
                              //   }}
                              label="Téléphone 1"
                              margin="dense"
                              variant="outlined"
                              fullWidth
                              name="tel1"
                            />
                          </FormGroup>
                        </Col>
                        <Col sm={6}>
                          <FormGroup>
                            <TextField
                              className="card add-input"
                              id="standard-basic"
                              label="Téléphone 2"
                              //   type="number"
                              //   InputLabelProps={{
                              //     shrink: true,
                              //   }}
                              margin="dense"
                              variant="outlined"
                              fullWidth
                              name="tel2"
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      {/* ////////////////////////////////////////////////// */}

                      <Row form>
                        <Col sm={6}>
                          <FormGroup>
                            <TextField
                              className="card add-input"
                              id="standard-basic"
                              label="A Contacter"
                              margin="dense"
                              variant="outlined"
                              fullWidth
                              name="contactcli"
                            />
                          </FormGroup>
                        </Col>
                        <Col sm={6}>
                          <FormGroup>
                            <TextField
                              className="card add-input"
                              id="standard-basic"
                              label="Site Web"
                              margin="dense"
                              variant="outlined"
                              fullWidth
                              name="sitewebcli"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>

                <Col sm={6}>
                  <Card className="card0">
                    <Card.Body>
                      <Row form>
                        <Col>
                          <FormGroup>
                            <TextField
                              className="card add-input"
                              id="standard-basic"
                              label="Identifiant unique"
                              margin="dense"
                              variant="outlined"
                              fullWidth
                              name="identcli"
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      {/* ////////////////////////////////////////////////// */}

                      <Row form>
                        <Col>
                          <FormGroup>
                            <TextField
                              className="card add-input"
                              id="standard-basic"
                              label="Autre Impots"
                              margin="dense"
                              variant="outlined"
                              fullWidth
                              name="impotcli"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      {/* ////////////////////////////////////////////////// */}

                      <Row form>
                        <Col>
                          <FormGroup>
                            <TextField
                              className="card add-input"
                              id="standard-basic"
                              label="Taux Fodec"
                              margin="dense"
                              variant="outlined"
                              fullWidth
                              name="fodeccli"
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      {/* ////////////////////////////////////////////////// */}

                      <Row form>
                        <Col>
                          <FormGroup>
                            <TextField
                              className="card add-input"
                              id="standard-basic"
                              label="Comptable"
                              margin="dense"
                              variant="outlined"
                              fullWidth
                              name="comptable"
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      {/* ////////////////////////////////////////////////// */}

                      <Row form>
                        <Col>
                          <FormGroup>
                            <Grid
                              item
                              style={{ marginTop: "12px", textAlign: "center" }}
                            >
                              <Switch
                                name="timbre"
                                color="primary"
                                checked={this.state.timbre}
                                onChange={this.handleChange("timbre")}
                                value={this.state.timbre}
                              />
                              Timbre Fiscale
                            </Grid>
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          <FormGroup>
                            <Grid
                              item
                              style={{ marginTop: "12px", textAlign: "center" }}
                            >
                              <Switch
                                name="soustraitant"
                                color="primary"
                                checked={this.state.soustraitant}
                                onChange={this.handleChange("soustraitant")}
                                value={this.state.soustraitant}
                              />
                              Sous Traitant
                            </Grid>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <br />
              <Row>
                <Col sm={8}></Col>
                <Col sm={4}>
                  <Button color="primary" style={{ width: "100%" }}>
                    Enregistrer
                  </Button>
                </Col>
              </Row>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    GetCodcli: () => dispatch(GetCodcli()),
    SelectClient: () => {
      dispatch(SelectClient());
    },
  };
}

function mapStateToProps(state) {
  return {
    codclis: state.codclis,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCModal);
