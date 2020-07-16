import React, { Component } from "react";
import { Modal, Card } from "react-bootstrap";
import "../styling/Styles.css";
import { Row, Col, FormGroup } from "reactstrap";
import { connect } from "react-redux";
import { SelectClient } from "../../redux/actions/GetClients";
import {
  TextField,
  Grid,
  Switch,
  Typography,
  Button,
  Snackbar,
  IconButton,
} from "@material-ui/core";
import { GetRECod } from "../../redux/actions/GetRECod";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { SelectNomenclature } from "../../redux/actions/GetNomenclature";
import { SelectNomenclatureBQ } from "../../redux/actions/GetNomeBQ";
import { SelectNomenclatureAG } from "../../redux/actions/GetNomeAG";
import { SelectNomenclatureCS } from "../../redux/actions/GetNomeCS";
import { SelectNomenclatureSC } from "../../redux/actions/GetNomeSituation";
import { SelectNomenclatureCCB } from "../../redux/actions/GetNomeCCB";
import { SelectReglement } from "../../redux/actions/GetReg";

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    width: 300,
    margin: 100,
  },
  //style for font size
  resize: {
    fontSize: 10,
  },
};

var curr = new Date();
curr.setDate(curr.getDate());
var date = curr.toISOString().substr(0, 10);

class AddReModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gilad: true,
      defaultdate: date,
      raisonsocial: "",
      codeclient: "",
      btnEnable: false,
      soldfacbl: 0,
      codmodreg: "",
      libmodreg: "",
      bqclient: "",
      montant: 0,
      codbqclient: "",
      libbqclient: "",
      codagence: "",
      libagence: "",
      codcaisse: "",
      libcaisse: "",
      codsituation: "",
      libsituation: "",
      codbqvers: "",
      libbqvers: "",
      codccb: "",
      libccb: "",
      chdec: "",
      snackbaropen: false,
      snackbarmsg: ",",
    };
  }

  componentDidMount() {
    this.props.SelectClient();
    this.props.GetRECod();
    this.props.SelectNomenclature();
    this.props.SelectNomenclatureBQ();
    this.props.SelectNomenclatureAG();
    this.props.SelectNomenclatureCS();
    this.props.SelectNomenclatureSC();
    this.props.SelectNomenclatureCCB();
    this.props.SelectReglement();
  }

  enregistrer = (event) => {
    event.preventDefault();

    fetch(
      `http://192.168.1.100:81/api/BLBRs?numreg=${event.target.codre.value}&codcli=${event.target.codcli.value}&raisoc=${event.target.raissoc.value}&datreg=${this.state.defaultdate}&modreg=${event.target.modreg.value}&numcais=${this.state.codcaisse}&numchq=${event.target.numpiece.value}&titulaire=${event.target.titulaire.value}&datech=${event.target.echeance.value}&monreg=${event.target.montant.value}&mntreg=${event.target.montant.value}&Reste=${event.target.montant.value}&codccb=${this.state.codccb}&agence=${this.state.codagence}&matban=${this.state.codbqclient}&BqEscompte=${this.state.codbqvers}&verser=${this.state.codsituation}&lib_reg=${event.target.nate.value}`,
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

          this.props.SelectReglement();

          this.setState({ snackbaropen: true, snackbarmsg: result });
          this.props.GetRECod();
          console.log(result);
          window.location.reload();
        },
        (error) => {
          this.setState({ snackbaropen: true, snackbarmsg: "failed" });
        }
      );

    //////////// switch update ////////////////

    fetch(
      `http://192.168.1.100:81/api/Switch?code=REGC&valeur=${
        parseInt(event.target.codbl.value) + 1
      }`,
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
          console.log(result);
        },
        (error) => {
          this.setState({ snackbaropen: true, snackbarmsg: "failed" });
        }
      );
  };

  clientHandlerChange = (event) => {
    fetch(`http://192.168.1.100:81/api/CLIENTs?codclii=${event.target.value}`)
      .then((response) => response.json())
      .then((data) => this.setState({ rechs: data }));
  };

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.checked });
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
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header
            closeButton
            style={{ backgroundColor: "white", color: "#020F64" }}
          >
            <Modal.Title id="contained-modal-title-vcenter">
              <b>Ajouter Règlement client</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.enregistrer}>
              <Card>
                <Card.Body>
                  <Row style={{ marginBottom: "-30px", marginTop: "-20px" }}>
                    <Col sm={4}>
                      <FormGroup>
                        {this.props.codres.codres.map((t) => (
                          <TextField
                            id="standard-basic"
                            label="№ Règlement"
                            margin="normal"
                            value={parseInt(t.valeur)}
                            fullWidth
                            name="codre"
                            disabled
                          />
                        ))}
                      </FormGroup>
                    </Col>

                    <Col sm={4}>
                      <TextField
                        id="standard-basic"
                        label="Date"
                        margin="normal"
                        type="date"
                        fullWidth
                        defaultValue={this.state.defaultdate}
                      />
                    </Col>

                    <Col sm={4}>
                      <FormGroup>
                        <TextField
                          id="standard-basic"
                          label="Montant"
                          margin="normal"
                          defaultValue={Number(this.state.montant).toFixed(3)}
                          fullWidth
                          name="montant"
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row style={{ marginBottom: "-30px" }}>
                    <Col sm={4}>
                      <FormGroup style={{ marginTop: "25px" }}>
                        <Typography component="div">
                          <Grid
                            component="label"
                            container
                            alignItems="center"
                            spacing={1}
                          >
                            <Grid item style={{ color: "grey" }}>
                              Raison sociale
                            </Grid>
                            <Grid item>
                              <Switch
                                checked={this.state.gilad}
                                onChange={this.handleChange("gilad")}
                                value="gilad"
                                color="primary"
                              />
                            </Grid>
                            <Grid item style={{ color: "#3f51b5" }}>
                              Code
                            </Grid>
                          </Grid>
                        </Typography>
                      </FormGroup>
                    </Col>
                    {this.state.gilad ? (
                      <Col sm={3}>
                        <FormGroup>
                          <Autocomplete
                            id="include-input-in-list"
                            includeInputInList
                            className="ajouter-client-input"
                            options={this.state.rechs}
                            getOptionLabel={(option) => option.codcli}
                            onChange={(event, getOptionLabel) => {
                              getOptionLabel
                                ? this.setState({
                                    raisonsocial: getOptionLabel.raisoc,
                                    codeclient: getOptionLabel.codcli,
                                    soldfacbl: getOptionLabel.soldfacbl,
                                    btnEnable: true,
                                  })
                                : this.setState({
                                    raisonsocial: "",
                                    codeclient: "",
                                    btnEnable: false,
                                  });
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Code client"
                                margin="normal"
                                fullWidth
                                onChange={this.clientHandlerChange}
                                name="codcli"
                              />
                            )}
                          />
                        </FormGroup>
                      </Col>
                    ) : (
                      <Col sm={5}>
                        <FormGroup>
                          <Autocomplete
                            id="include-input-in-list"
                            includeInputInList
                            className="ajouter-client-input"
                            options={this.state.rechs}
                            getOptionLabel={(option) => option.raisoc}
                            onChange={(event, getOptionLabel) => {
                              getOptionLabel
                                ? this.setState({
                                    raisonsocial: getOptionLabel.raisoc,
                                    codeclient: getOptionLabel.codcli,
                                    soldfacbl: getOptionLabel.soldfacbl,
                                    btnEnable: true,
                                  })
                                : this.setState({
                                    raisonsocial: "",
                                    codeclient: "",
                                    btnEnable: false,
                                  });
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Raison sociale"
                                margin="normal"
                                fullWidth
                                onChange={this.clientHandlerChange}
                                name="raissoc"
                              />
                            )}
                          />
                        </FormGroup>
                      </Col>
                    )}
                    {this.state.gilad ? (
                      <Col sm={5}>
                        <FormGroup>
                          <TextField
                            id="standard-basic"
                            label="Raison sociale"
                            margin="normal"
                            value={this.state.raisonsocial}
                            fullWidth
                            name="raissoc"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    ) : (
                      <Col sm={3}>
                        <FormGroup>
                          <TextField
                            id="standard-basic"
                            label="Code client"
                            margin="normal"
                            value={this.state.codeclient}
                            fullWidth
                            name="codcli"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    )}
                  </Row>
                </Card.Body>
              </Card>

              <Card style={{ marginTop: "5px" }}>
                <Card.Body>
                  <Row style={{ marginBottom: "-35px", marginTop: "-30px" }}>
                    <Col sm={3}>
                      <Autocomplete
                        id="include-input-in-list"
                        includeInputInList
                        className="ajouter-client-input"
                        options={this.props.nomenclatures.nomenclatures}
                        getOptionLabel={(option) => option.code}
                        onChange={(event, getOptionLabel) => {
                          getOptionLabel
                            ? this.setState({
                                codmodreg: getOptionLabel.code,
                                libmodreg: getOptionLabel.lib,
                              })
                            : this.setState({
                                codmodreg: "",
                                libmodreg: "",
                              });
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Mode Règ"
                            margin="normal"
                            fullWidth
                            name="modreg"
                          />
                        )}
                      />
                    </Col>

                    <Col sm={4}>
                      <p
                        style={{
                          fontSize: "13px",
                          marginTop: "40px",
                          color: "#007bff",
                        }}
                      >
                        {" "}
                        {this.state.libmodreg}{" "}
                      </p>
                    </Col>

                    <Col sm={5}>
                      <FormGroup>
                        <TextField
                          id="standard-basic"
                          label="Note"
                          margin="normal"
                          fullWidth
                          name="note"
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row style={{ marginBottom: "-35px" }}>
                    <Col sm={4}>
                      <FormGroup>
                        <TextField
                          id="standard-basic"
                          label="№ Pièce"
                          margin="normal"
                          fullWidth
                          name="numpiece"
                        />
                      </FormGroup>
                    </Col>

                    <Col sm={4}>
                      <FormGroup>
                        <TextField
                          id="standard-basic"
                          type="date"
                          label="Echéance"
                          margin="normal"
                          fullWidth
                          name="echeance"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </FormGroup>
                    </Col>

                    <Col sm={4}>
                      <FormGroup>
                        <TextField
                          id="standard-basic"
                          label="Titulaire"
                          margin="normal"
                          fullWidth
                          name="titulaire"
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row style={{ marginBottom: "-35px" }}>
                    <Col sm={3}>
                      <FormGroup>
                        <Autocomplete
                          id="include-input-in-list"
                          includeInputInList
                          className="ajouter-client-input"
                          options={this.props.bqs.bqs}
                          getOptionLabel={(option) => option.code}
                          onChange={(event, getOptionLabel) => {
                            getOptionLabel
                              ? this.setState({
                                  codbqclient: getOptionLabel.code,
                                  libbqclient: getOptionLabel.lib,
                                })
                              : this.setState({
                                  codbqclient: "",
                                  libbqclient: "",
                                });
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Bq client"
                              margin="normal"
                              fullWidth
                              name="bqclient"
                            />
                          )}
                        />
                      </FormGroup>
                    </Col>

                    <Col sm={3}>
                      <p
                        style={{
                          fontSize: "12px",
                          marginTop: "40px",
                          color: "#007bff",
                        }}
                      >
                        {" "}
                        {this.state.libbqclient}{" "}
                      </p>
                    </Col>

                    <Col sm={3}>
                      <FormGroup>
                        <Autocomplete
                          id="include-input-in-list"
                          includeInputInList
                          className="ajouter-client-input"
                          options={this.props.ags.ags}
                          getOptionLabel={(option) => option.code}
                          onChange={(event, getOptionLabel) => {
                            getOptionLabel
                              ? this.setState({
                                  codagence: getOptionLabel.code,
                                  libagence: getOptionLabel.lib,
                                })
                              : this.setState({
                                  codagence: "",
                                  libagence: "",
                                });
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Agence"
                              margin="normal"
                              fullWidth
                              name="agence"
                            />
                          )}
                        />
                      </FormGroup>
                    </Col>

                    <Col sm={3}>
                      <p
                        style={{
                          fontSize: "13px",
                          marginTop: "40px",
                          color: "#007bff",
                        }}
                      >
                        {" "}
                        {this.state.libagence}{" "}
                      </p>
                    </Col>
                  </Row>

                  <Row style={{ marginBottom: "-35px" }}>
                    <Col sm={3}>
                      <FormGroup>
                        <Autocomplete
                          id="include-input-in-list"
                          includeInputInList
                          className="ajouter-client-input"
                          options={this.props.css.css}
                          getOptionLabel={(option) => option.code}
                          onChange={(event, getOptionLabel) => {
                            getOptionLabel
                              ? this.setState({
                                  codcaisse: getOptionLabel.code,
                                  libcaisse: getOptionLabel.lib,
                                })
                              : this.setState({
                                  codcaisse: "",
                                  libcaisse: "",
                                });
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Caisse"
                              margin="normal"
                              fullWidth
                              name="caisse"
                            />
                          )}
                        />
                      </FormGroup>
                    </Col>

                    <Col sm={3}>
                      <p
                        style={{
                          fontSize: "13px",
                          marginTop: "40px",
                          color: "#007bff",
                        }}
                      >
                        {" "}
                        {this.state.libcaisse}{" "}
                      </p>
                    </Col>

                    <Col sm={3}>
                      <FormGroup>
                        <Autocomplete
                          id="include-input-in-list"
                          includeInputInList
                          className="ajouter-client-input"
                          options={this.props.scs.scs}
                          getOptionLabel={(option) => option.code}
                          onChange={(event, getOptionLabel) => {
                            getOptionLabel
                              ? this.setState({
                                  codsituation: getOptionLabel.code,
                                  libsituation: getOptionLabel.lib,
                                })
                              : this.setState({
                                  codsituation: "",
                                  libsituation: "",
                                });
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Situation"
                              margin="normal"
                              fullWidth
                              name="situation"
                            />
                          )}
                        />
                      </FormGroup>
                    </Col>

                    <Col sm={3}>
                      <p
                        style={{
                          fontSize: "12px",
                          marginTop: "40px",
                          color: "#007bff",
                        }}
                      >
                        {" "}
                        {this.state.libsituation}{" "}
                      </p>
                    </Col>
                  </Row>

                  <Row style={{ marginBottom: "-30px" }}>
                    <Col sm={3}>
                      <FormGroup>
                        <Autocomplete
                          id="include-input-in-list"
                          includeInputInList
                          className="ajouter-client-input"
                          options={this.props.bqs.bqs}
                          getOptionLabel={(option) => option.code}
                          onChange={(event, getOptionLabel) => {
                            getOptionLabel
                              ? this.setState({
                                  codbqvers: getOptionLabel.code,
                                  libbqvers: getOptionLabel.lib,
                                })
                              : this.setState({
                                  codbqvers: "",
                                  libbqvers: "",
                                });
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Bq vers"
                              margin="normal"
                              fullWidth
                              name="bqvers"
                            />
                          )}
                        />
                      </FormGroup>
                    </Col>

                    <Col sm={3}>
                      <p
                        style={{
                          fontSize: "12px",
                          marginTop: "40px",
                          color: "#007bff",
                        }}
                      >
                        {" "}
                        {this.state.libbqvers}{" "}
                      </p>
                    </Col>

                    <Col sm={3}>
                      <FormGroup>
                        <Autocomplete
                          id="include-input-in-list"
                          includeInputInList
                          className="ajouter-client-input"
                          options={this.props.ccbs.ccbs}
                          getOptionLabel={(option) =>
                            option.chdec === this.state.codbqvers
                              ? option.code
                              : null
                          }
                          onChange={(event, getOptionLabel) => {
                            getOptionLabel
                              ? this.setState({
                                  codccb: getOptionLabel.code,
                                  libccb: getOptionLabel.lib,
                                  chdec: getOptionLabel.chdec,
                                })
                              : this.setState({
                                  codccb: "",
                                  libccb: "",
                                  chdec: "",
                                });
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="CCB"
                              margin="normal"
                              fullWidth
                              name="ccb"
                            />
                          )}
                        />
                      </FormGroup>
                    </Col>

                    <Col sm={3}>
                      <p
                        style={{
                          fontSize: "12px",
                          marginTop: "40px",
                          color: "#007bff",
                        }}
                      >
                        {" "}
                        {this.state.libccb}{" "}
                      </p>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              <br />
              <Row>
                <Col sm={6}>
                  <h3 style={{ color: "rgb(220, 0, 78)" }}>
                    &nbsp; Solde:{" "}
                    <span style={{ color: "black" }}>
                      {Number(this.state.soldfacbl).toFixed(3)}
                    </span>
                  </h3>
                </Col>
                <Col sm={2}></Col>
                <Col sm={4}>
                  <Button
                    variant="contained"
                    // color="secondary"
                    type="submit"
                    style={{
                      //marginTop: "20px",
                      width: "100%",
                      color: "white",
                      backgroundColor: "#020F64",
                    }}
                  >
                    Enregistrer
                  </Button>
                </Col>
              </Row>
            </form>
          </Modal.Body>
          {/* <Modal.Footer></Modal.Footer> */}
        </Modal>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    SelectClient: () => dispatch(SelectClient()),
    GetRECod: () => dispatch(GetRECod()),
    SelectNomenclature: () => dispatch(SelectNomenclature("MR")),
    SelectNomenclatureBQ: () => dispatch(SelectNomenclatureBQ()),
    SelectNomenclatureAG: () => dispatch(SelectNomenclatureAG()),
    SelectNomenclatureCS: () => dispatch(SelectNomenclatureCS()),
    SelectNomenclatureSC: () => dispatch(SelectNomenclatureSC()),
    SelectNomenclatureCCB: () => dispatch(SelectNomenclatureCCB()),
    SelectReglement: () => dispatch(SelectReglement()),
  };
}

function mapStateToProps(state) {
  return {
    clients: state.clients,
    codres: state.codres,
    nomenclatures: state.nomenclatures,
    bqs: state.bqs,
    ags: state.ags,
    css: state.css,
    scs: state.scs,
    ccbs: state.ccbs,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddReModal);
