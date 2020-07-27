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
import { SelectFournisseur } from "../../redux/actions/GetFournisseur";
import { connect } from "react-redux";

class ModifierFournisseurModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      `http://192.168.1.100:81/api/FOURNISSEURs?codfrs=${event.target.codfrs.value}&raisoc=${event.target.raisoc.value}&tel1=${event.target.tel1.value}&tel2=${event.target.tel2.value}&email=${event.target.email.value}&adr=${event.target.adr.value}&sitweb=${event.target.sitweb.value}&nom=${event.target.nom.value}&ville=${event.target.ville.value}&cp=${event.target.cp.value}&fax=${event.target.acontacter.value}&compte=${event.target.compte.value}&timbre=${event.target.timbre.value}&STrt=${event.target.soustraitant.value}&tauxfodec=${event.target.tauxfodec.value}&autreimp=${event.target.impot.value}&CodeTVA=${event.target.identifiant.value}`,
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
          this.props.SelectFournisseur();
          this.setState({ snackbaropen: true, snackbarmsg: result });
          console.log(result);
          window.location.reload();
        },
        (error) => {
          this.setState({ snackbaropen: true, snackbarmsg: "failed" });
        }
      );
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
              <b>Modifier Fournisseur</b>
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
                              label="Code Fournisseur"
                              margin="dense"
                              variant="outlined"
                              fullWidth
                              name="codfrs"
                              defaultValue={this.props.codefournisseur}
                            />
                          </FormGroup>
                        </Col>
                        <Col sm={6}>
                          <FormGroup></FormGroup>
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
                              label="Nom"
                              margin="dense"
                              variant="outlined"
                              fullWidth
                              name="nom"
                              defaultValue={this.props.nom}
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
                              name="email"
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
                              name="adr"
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
                              name="ville"
                              defaultValue={this.props.ville}
                            />
                          </FormGroup>
                        </Col>
                        <Col sm={6}>
                          <FormGroup>
                            <TextField
                              className="card add-input"
                              id="standard-basic"
                              type="number"
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
                              type="number"
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
                              type="number"
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
                              name="acontacter"
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
                              name="sitweb"
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
                              name="identifiant"
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
                              type="number"
                              fullWidth
                              name="impot"
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
                              type="number"
                              variant="outlined"
                              fullWidth
                              name="tauxfodec"
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
                              name="compte"
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
                                checked={this.props.timbre}
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
                                checked={this.props.soustraitant}
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
    SelectFournisseur: () => {
      dispatch(SelectFournisseur());
    },
  };
}

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModifierFournisseurModal);
