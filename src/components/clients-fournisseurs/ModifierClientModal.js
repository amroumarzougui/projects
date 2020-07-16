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
import "../styling/Styles.css";
import { SelectClient } from "../../redux/actions/GetClients";
import { connect } from "react-redux";

class ModifierClientModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gilad: this.props.passager,
      timbre: this.props.timbre,
      soustraitant: this.props.soustraitant,
      snackbaropen: false,
      snackbarmsg: ",",
    };
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
        method: "PUT",
        header: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.props.onHide();

          this.setState({ snackbaropen: true, snackbarmsg: result });
          this.props.SelectClient();

          window.location.reload();
        },
        (error) => {
          this.setState({ snackbaropen: true, snackbarmsg: "failed" });
        }
      );

    //  this.props.onHide01();
  };

  render() {
    return (
      <div className="container">
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={this.state.snackbaropen}
          autoHideDuration={6000}
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
            style={{ backgroundColor: "#eee", color: "#020F64" }}
          >
            <Modal.Title id="contained-modal-title-vcenter">
              <b>Modifier Client</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: "#eee" }}>
            <form onSubmit={this.submitHandler}>
              <Row>
                <Col sm={6}>
                  <Card className="card0">
                    <Card.Body>
                      <Row form>
                        <Col sm={6}>
                          <FormGroup>
                            <TextField
                              className="card add-input"
                              id="standard-basic"
                              label="Code Client"
                              margin="dense"
                              variant="outlined"
                              fullWidth
                              name="codcli"
                              defaultValue={this.props.codeclient}
                              disabled
                            />
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
                              />
                              Passager
                            </Grid>
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
                              defaultValue={this.props.raisoc}
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
                              defaultValue={this.props.cin}
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
                              defaultValue={this.props.email}
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
                              defaultValue={this.props.adresse}
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
                              defaultValue={this.props.ville}
                            />
                          </FormGroup>
                        </Col>
                        <Col sm={6}>
                          <FormGroup>
                            <TextField
                              className="card add-input"
                              id="standard-basic"
                              label="Code Postal"
                              margin="dense"
                              variant="outlined"
                              fullWidth
                              name="cp"
                              defaultValue={this.props.codepostal}
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
                              label="Téléphone 1"
                              margin="dense"
                              variant="outlined"
                              fullWidth
                              name="tel1"
                              defaultValue={this.props.tel1}
                            />
                          </FormGroup>
                        </Col>
                        <Col sm={6}>
                          <FormGroup>
                            <TextField
                              className="card add-input"
                              id="standard-basic"
                              label="Téléphone 2"
                              margin="dense"
                              variant="outlined"
                              fullWidth
                              name="tel2"
                              defaultValue={this.props.tel2}
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
                              defaultValue={this.props.acontacter}
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
                              defaultValue={this.props.siteweb}
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
                              defaultValue={this.props.identifiant}
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
                              defaultValue={this.props.impot}
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
                              defaultValue={this.props.tauxfodec}
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
                              label="Compte comptable"
                              margin="dense"
                              variant="outlined"
                              fullWidth
                              name="comptable"
                              defaultValue={this.props.comptable}
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
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    SelectClient: () => {
      dispatch(SelectClient());
    },
  };
}

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModifierClientModal);
