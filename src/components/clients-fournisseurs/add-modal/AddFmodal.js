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
import { GetCodfrs } from "../../../redux/actions/GetCodFrs";
import { connect } from "react-redux";
import { SelectFournisseur } from "../../../redux/actions/GetFournisseur";

class AddFmodal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timbre: 0,
      soustraitant: 0,
      snackbaropen: false,
      snackbarmsg: ",",
    };
  }

  componentDidMount() {
    this.props.GetCodfrs();
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
          this.props.onHide();
          this.props.SelectFournisseur();

          this.setState({ snackbaropen: true, snackbarmsg: result });
          this.props.GetCodfrs();

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
          autoHideDuration={3000}
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
              <b>Ajouter Fournisseur</b>
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
                            {this.props.codfrss.codfrss.map((cod) => (
                              <TextField
                                className="card add-input"
                                id="standard-basic"
                                label="Code Fournisseur"
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                name="codfrs"
                                value={cod.Column1 + 1}
                                disabled
                              />
                            ))}
                          </FormGroup>
                        </Col>
                        <Col sm={6}></Col>
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
                              label="Nom"
                              margin="dense"
                              variant="outlined"
                              fullWidth
                              name="nom"
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
                            />
                          </FormGroup>
                        </Col>
                        <Col sm={6}>
                          <FormGroup>
                            <TextField
                              className="card add-input"
                              id="standard-basic"
                              type="number"
                              label="Téléphone 2"
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
                              name="acontacter"
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
                              type="number"
                              margin="dense"
                              variant="outlined"
                              fullWidth
                              name="impot"
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
    GetCodfrs: () => dispatch(GetCodfrs()),
    SelectFournisseur: () => {
      dispatch(SelectFournisseur());
    },
  };
}

function mapStateToProps(state) {
  return {
    codfrss: state.codfrss,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddFmodal);
