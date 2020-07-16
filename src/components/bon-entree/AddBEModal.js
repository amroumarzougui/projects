import React, { Component } from "react";
import {
  Modal,
  Card,
  Row,
  FormGroup,
  Col,
  Alert,
  Accordion,
} from "react-bootstrap";
import "../styling/Styles.css";
// import "../commande-client-devis/ss.scss";
import "./be.scss";

import {
  TextField,
  Paper,
  Button,
  Snackbar,
  IconButton,
  MenuItem,
} from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { connect } from "react-redux";
import { SelectClient } from "../../redux/actions/GetClients";

import Tooltip from "@material-ui/core/Tooltip";

import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

import { Divider, Chip } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { SelectBECod } from "../../redux/actions/GetBECode";
import LigBEArticle from "./LigBEArticle";
import { SelectBE } from "../../redux/actions/GetBE";
import { SelectFacFrsCod } from "../../redux/actions/GetFacFrsCod";

const roundTo = require("round-to");
var curr = new Date();
curr.setDate(curr.getDate());
var date = curr.toISOString().substr(0, 10);

class AddBEModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gilad: true,
      defaultdate: date,
      showTimbre: false,
      showForfitaire: 0,
      showButtonModalPassager: false,
      addModalShow1: false,
      ligModalShow: false,
      tab: [],
      totalqte: 0,
      sumremisearticle: 0,
      totalhtbrut: 0,
      totaltva: 0,
      remiseg: 0,
      representant: "",
      raisonsocial: "",
      codeclient: "",
      categoriefiscale: "",
      totalhtnet: 0,
      remiseglobal: 0,
      netapayer: 0,
      btnEnable: false,
      btnEnabled: false,
      cemail: "",
      openActionModal: false,
      rechs: [],
      codetva: "",
      typach: [
        { code: "L", label: "L" },
        { code: "F", label: "F" },
      ],

      nextsubmit: false,

      snackbaropen: false,
      snackbarmsg: ",",
      codf: "",
    };
  }

  componentDidMount() {
    this.props.SelectClient();
    this.props.SelectBECod();
    this.props.SelectFacFrsCod();
  }

  typachChange = () => {
    this.props.codfacfrss.codfacfrss.map((t) =>
      this.setState({ codf: t.valeur })
    );
  };

  submitHandler = (
    tab,
    totalqte,
    sumremisearticle,
    totalhtbrut,
    totaltva,
    totalhtnet,
    remiseglobal,
    netapayer,
    btnEnabled
  ) => {
    this.setState({
      tab: tab,
      totalqte: totalqte,
      sumremisearticle: sumremisearticle,
      totalhtbrut: totalhtbrut,
      totaltva: totaltva,
      totalhtnet: totalhtnet,
      remiseglobal: remiseglobal,
      netapayer: netapayer,
      btnEnabled: btnEnabled,
    });
  };

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.checked });
  };

  remiseChange = (event) => {
    this.setState({ remiseg: event.target.value });
  };

  clientHandlerChange = (event) => {
    fetch(
      `http://192.168.1.100:81/api/fournisseurs?codfrss=${event.target.value}`
    )
      .then((response) => response.json())
      .then((data) => this.setState({ rechs: data }));
  };

  enregistrer = (event) => {
    event.preventDefault();

    this.state.tab.map((k, index) => {
      for (var i = 0; i < this.state.tab.length; i++) {
        fetch(
          `http://192.168.1.100:81/api/LigBEREs/{ID}?numfac=${event.target.codbe.value}&typfac=BE&numlig=${index}&codart=${k.codearticle}&quantite=${k.qte}&fodart=0&desart=${k.des}&datfac=${event.target.datfac.value}&priuni=${k.puht}&remise=${k.remisea}&unite${k.unite}&codtva=3&tautva=${k.tva}`,
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
              //   this.setState({ snackbaropen: true, snackbarmsg: result });

              console.log(result);
              // window.alert(result);
            },
            (error) => {
              this.setState({ snackbaropen: true, snackbarmsg: "failed" });
            }
          );
      }
    });

    fetch(
      `http://192.168.1.100:81/api/BEREs?numfac=${
        event.target.codbe.value
      }&typfac=BE&datfac=${event.target.datfac.value}&codfrs=${
        event.target.codcli.value
      }&raisoc=${event.target.raissoc.value}&catfisc=${"0"}&taurem=${
        event.target.remise.value
      }&pj=${event.target.pj.value}&typach=${event.target.typach.value}`,
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
          this.props.SelectBE();

          ///////partie calcul be /////////////////
          fetch(
            `http://192.168.1.100:81/api/LIGBEREs?FACc=${this.props.codbes.codbes.map(
              (nu) => parseInt(nu.valeur)
            )}&typfacc=BE`,
            {
              method: "POST",
              header: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );

          this.setState({ snackbaropen: true, snackbarmsg: result });
          window.location.reload();

          this.props.SelectBECod();
          console.log(result);
          // fetch(
          //   `http://192.168.1.100:81/api/LIGBEREs?FACc=${this.props.codbes.codbes.map(
          //     (nu) => parseInt(nu.valeur)
          //   )}&typfacc=BE`,
          //   {
          //     method: "POST",
          //     header: {
          //       Accept: "application/json",
          //       "Content-Type": "application/json",
          //     },
          //   }
          // );
          window.location.reload();
        },
        (error) => {
          this.setState({ snackbaropen: true, snackbarmsg: "failed" });
        }
      );

    fetch(
      `http://192.168.1.100:81/api/Switch?code=BE2&valeur=${
        parseInt(event.target.codbe.value) + 1
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

    if (event.target.typach.value === "L") {
      fetch(
        `http://192.168.1.100:81/api/FacFrs?numfac=${event.target.codbe.value}&typfac=BF&datfac=${event.target.datfac.value}&codfrs=${event.target.codcli.value}&raisoc=${event.target.raissoc.value}&pj=${event.target.pj.value}&numbe=${event.target.codbe.value}&taurem=${event.target.remise.value}&pj=${event.target.pj.value}`,
        {
          method: "POST",
          header: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((result) => {
          fetch(
            `http://192.168.1.100:81/api/Switch?code=BF2&valeur=${
              parseInt(event.target.codbe.value) + 1
            }`,
            {
              method: "PUT",
              header: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );
        });
    }

    if (event.target.typach.value === "F") {
      fetch(
        `http://192.168.1.100:81/api/FacFrs?numfac=${this.state.codf}&typfac=FF&datfac=${event.target.datfac.value}&codfrs=${event.target.codcli.value}&raisoc=${event.target.raissoc.value}&pj=${event.target.pj.value}&numbe=${event.target.codbe.value}&taurem=${event.target.remise.value}&pj=${event.target.pj.value}`,
        {
          method: "POST",
          header: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((result) => {
          fetch(
            `http://192.168.1.100:81/api/Switch?code=FF2&valeur=${
              parseInt(this.state.codf) + 1
            }`,
            {
              method: "PUT",
              header: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );
        });
    }
  };

  render() {
    let ligModalClose = () => this.setState({ ligModalShow: false });

    const { rem } = this.state;

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
              <b>Ajouter Bon d'Entrée</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.enregistrer}>
              <Card>
                <Card.Body>
                  <Row style={{ marginBottom: "-20px", marginTop: "-20px" }}>
                    <Col sm={3}>
                      <FormGroup>
                        {this.props.codbes.codbes.map((t) => (
                          <TextField
                            // className="card add-input"
                            id="standard-basic"
                            label="№ BL"
                            margin="normal"
                            //variant="outlined"
                            value={parseInt(t.valeur)}
                            fullWidth
                            name="codbe"
                            disabled
                          />
                        ))}
                      </FormGroup>
                    </Col>
                    {/* <Col sm={5}></Col> */}
                    <Col sm={5}>
                      <TextField
                        id="standard-basic"
                        label="Date"
                        margin="normal"
                        //variant="outlined"
                        type="date"
                        fullWidth
                        name="datfac"
                        defaultValue={this.state.defaultdate}
                      />
                    </Col>

                    <Col sm={2}>
                      <TextField
                        id="outlined-select-currency"
                        select
                        label="Type"
                        margin="normal"
                        fullWidth
                        name="typach"
                        onChange={this.typachChange}
                      >
                        {this.state.typach.map((option) => (
                          <MenuItem key={option.code} value={option.code}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Col>
                  </Row>

                  <Row style={{ marginBottom: "-20px" }}>
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
                            // options={this.props.clients.clients}
                            options={this.state.rechs}
                            getOptionLabel={(option) => option.codfrs}
                            onChange={(event, getOptionLabel) => {
                              getOptionLabel
                                ? this.setState({
                                    raisonsocial: getOptionLabel.raisoc,
                                    codeclient: getOptionLabel.codfrs,
                                    btnEnable: true,
                                    showTimbre: getOptionLabel.timbre,

                                    cemail: getOptionLabel.email,
                                    codetva: getOptionLabel.CodeTVA,
                                  })
                                : this.setState({
                                    raisonsocial: "",
                                    codeclient: "",
                                    btnEnable: false,
                                    showTimbre: false,
                                    showButtonModalPassager: false,
                                    codetva: "",
                                  });
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Code Fournisseur"
                                margin="normal"
                                //variant="outlined"
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
                            // options={this.props.clients.clients}
                            options={this.state.rechs}
                            getOptionLabel={(option) => option.raisoc}
                            onChange={(event, getOptionLabel) => {
                              getOptionLabel
                                ? this.setState({
                                    raisonsocial: getOptionLabel.raisoc,
                                    codeclient: getOptionLabel.codfrs,
                                    btnEnable: true,
                                    showTimbre: getOptionLabel.timbre,

                                    cemail: getOptionLabel.email,
                                    codetva: getOptionLabel.CodeTVA,
                                  })
                                : this.setState({
                                    raisonsocial: "",
                                    codeclient: "",
                                    btnEnable: false,
                                    showTimbre: false,
                                    showButtonModalPassager: false,
                                    codetva: "",
                                  });
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Raison sociale"
                                margin="normal"
                                //variant="outlined"
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
                            //variant="outlined"
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
                            label="Code Fournisseur"
                            margin="normal"
                            //variant="outlined"
                            value={this.state.codeclient}
                            fullWidth
                            name="codcli"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    )}
                  </Row>

                  <Row>
                    <Col sm={4}>
                      <TextField
                        id="standard-basic"
                        label="Code TVA"
                        margin="normal"
                        //variant="outlined"
                        fullWidth
                        name="codetva"
                        value={this.state.codetva}
                        disabled
                      />
                    </Col>

                    <Col sm={3}>
                      <TextField
                        id="standard-basic"
                        label="Remise Globale %"
                        margin="normal"
                        //variant="outlined"
                        fullWidth
                        name="remise"
                        onChange={this.remiseChange}
                        // value={this.state.remiseg}
                      />
                    </Col>

                    <Col sm={3}>
                      <TextField
                        id="standard-basic"
                        label="PJ"
                        margin="normal"
                        fullWidth
                        name="pj"
                      />
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              {/* ///////////////////////////////////////////////////////// Accordiation //////////// */}

              <Accordion style={{ marginTop: "10px" }}>
                <Card bg="light">
                  <Card.Header style={{ height: "60px" }}>
                    <Row>
                      <Col sm={12}>
                        <Row>
                          <Col sm={11}>
                            <Accordion.Toggle
                              as={Button}
                              eventKey="0"
                              style={{ marginTop: "-5px" }}
                            >
                              <Chip
                                style={{ fontSize: "16px" }}
                                icon={<VisibilityIcon />}
                                color="primary"
                                label="Liste des Articles"
                                variant="outlined"
                              />
                            </Accordion.Toggle>
                          </Col>
                          <Col sm={1}>
                            {this.state.btnEnable ? (
                              <label>
                                <h5>
                                  <Tooltip title="Ajouter, Editer et supprimer article">
                                    <Fab
                                      style={{
                                        backgroundColor: "#3f51b5",
                                        color: "white",
                                        width: "40px",
                                        height: "40px",
                                      }}
                                      aria-label="add"
                                      onClick={(event) =>
                                        this.setState({
                                          ligModalShow: true,
                                          rem: this.state.remiseg,
                                        })
                                      }
                                    >
                                      <AddIcon />
                                    </Fab>
                                  </Tooltip>
                                </h5>
                              </label>
                            ) : (
                              <label>
                                <h5>
                                  <Tooltip title="Ajouter, Editer et supprimer article">
                                    <Fab
                                      disabled
                                      style={{ width: "40px", height: "40px" }}
                                      aria-label="add"
                                      onClick={() =>
                                        this.setState({
                                          ligModalShow: true,
                                          rem: this.state.remiseg,
                                        })
                                      }
                                    >
                                      <AddIcon />
                                    </Fab>
                                  </Tooltip>
                                </h5>
                              </label>
                            )}
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <div className="tabbl2">
                        <table>
                          <thead
                            style={{ textAlign: "center", fontSize: "12px" }}
                          >
                            <tr>
                              <th>Code</th>
                              <th style={{ width: "37%" }}>Désignation</th>
                              <th>Quantité</th>
                              <th>PU HT</th>
                              <th>Remise</th>
                              <th>TVA</th>
                              <th>PUTTCNet</th>
                              <th>TotalHT</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.tab.map((t) => (
                              <tr style={{ textAlign: "center" }}>
                                <td>
                                  <span>{t.codearticle}</span>
                                </td>
                                <td style={{ fontSize: "12px", width: "37%" }}>
                                  <span> {t.des} </span>
                                </td>
                                <td>
                                  {" "}
                                  <span> {t.qte}</span>
                                </td>
                                <td>
                                  {" "}
                                  <span> {Number(t.puht).toFixed(2)}</span>
                                </td>
                                <td>
                                  {" "}
                                  <span> {Number(t.remisea).toFixed(2)}</span>
                                </td>
                                <td>
                                  {" "}
                                  <span> {Number(t.tva).toFixed(2)}</span>
                                </td>
                                <td>
                                  {" "}
                                  <span> {Number(t.puttcnet).toFixed(3)}</span>
                                </td>
                                <td>
                                  {" "}
                                  <span> {Number(t.totalht).toFixed(2)}</span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>

              {/* //////////////// Footer //////////////////// */}
              <Card style={{ marginTop: "10px" }}>
                <Card.Body>
                  <Row>
                    <Col
                      sm={3}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        textAlign: "center",
                      }}
                    >
                      <p
                        style={{ color: "darkslateblue", marginBottom: "-5px" }}
                      >
                        Total HT Brut
                      </p>
                      <p style={{ color: "black" }}>
                        {Number(this.state.totalhtbrut).toFixed(3)}
                      </p>
                    </Col>

                    <Col
                      sm={3}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        textAlign: "center",
                      }}
                    >
                      <p
                        style={{ color: "darkslateblue", marginBottom: "-5px" }}
                      >
                        Remise Article
                      </p>
                      <p style={{ color: "black" }}>
                        {Number(this.state.sumremisearticle).toFixed(3)}
                      </p>
                    </Col>

                    <Col
                      sm={3}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        textAlign: "center",
                      }}
                    >
                      <p
                        style={{ color: "darkslateblue", marginBottom: "-5px" }}
                      >
                        Total TVA
                      </p>
                      <p style={{ color: "black" }}>
                        {Number(this.state.totaltva).toFixed(3)}
                      </p>
                    </Col>

                    <Col
                      sm={3}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        textAlign: "center",
                      }}
                    >
                      <p
                        style={{ color: "darkslateblue", marginBottom: "-5px" }}
                      >
                        Total Quantité
                      </p>
                      <p style={{ color: "black" }}>{this.state.totalqte}</p>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm={3}>
                      <Divider
                        style={{ marginTop: "-8px", backgroundColor: "grey" }}
                      ></Divider>
                    </Col>
                    <Col sm={3}>
                      <Divider
                        style={{ marginTop: "-8px", backgroundColor: "grey" }}
                      ></Divider>
                    </Col>
                    <Col sm={3}>
                      <Divider
                        style={{ marginTop: "-8px", backgroundColor: "grey" }}
                      ></Divider>
                    </Col>
                    <Col sm={3}>
                      <Divider
                        style={{ marginTop: "-8px", backgroundColor: "grey" }}
                      ></Divider>
                    </Col>
                  </Row>

                  <Row style={{ marginBottom: "-25px" }}>
                    <Col
                      sm={3}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        textAlign: "center",
                      }}
                    >
                      <p
                        style={{ color: "darkslateblue", marginBottom: "-5px" }}
                      >
                        Total HT Net
                      </p>
                      <p style={{ color: "black" }}>
                        {Number(this.state.totalhtnet).toFixed(3)}
                      </p>
                    </Col>

                    <Col
                      sm={3}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        textAlign: "center",
                      }}
                    >
                      <p
                        style={{ color: "darkslateblue", marginBottom: "-5px" }}
                      >
                        Remise Globale
                      </p>
                      <p style={{ color: "black" }}>
                        {Number(this.state.remiseglobal).toFixed(3)}
                      </p>
                    </Col>

                    <Col
                      sm={3}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        textAlign: "center",
                      }}
                    >
                      <p
                        style={{ color: "darkslateblue", marginBottom: "-5px" }}
                      >
                        Total TVA
                      </p>
                      <p style={{ color: "black" }}>
                        {Number(this.state.totaltva).toFixed(3)}
                      </p>
                    </Col>

                    <Col
                      sm={3}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        textAlign: "center",
                      }}
                    >
                      <p
                        style={{
                          color: "rgb(220, 0, 78)",
                          fontWeight: "bold",
                          marginBottom: "-5px",
                        }}
                      >
                        Net à Payer
                      </p>
                      <p style={{ color: "black", fontWeight: "bold" }}>
                        {Number(this.state.netapayer).toFixed(3)}
                      </p>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              <Row>
                <Col sm={8}></Col>
                <Col sm={4}>
                  {this.state.totalqte === 0 ? (
                    <Button
                      variant="contained"
                      disabled
                      style={{ marginTop: "20px", width: "100%" }}
                    >
                      Enregistrer tous
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      // color="secondary"
                      type="submit"
                      style={{
                        marginTop: "20px",
                        width: "100%",
                        color: "white",
                        backgroundColor: "#020F64",
                      }}
                    >
                      Enregistrer tous
                    </Button>
                  )}
                </Col>
              </Row>
            </form>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>

        <LigBEArticle
          submitHandler={this.submitHandler}
          show={this.state.ligModalShow}
          onHide={ligModalClose}
          numfaccc={this.props.codbes.codbes.map(
            (nu) => parseInt(nu.valeur, 10) + 1
          )}
          datfac={this.state.defaultdate}
          rem={rem}
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    SelectClient: () => dispatch(SelectClient()),
    SelectBECod: () => dispatch(SelectBECod()),
    SelectBE: () => dispatch(SelectBE()),
    SelectFacFrsCod: () => dispatch(SelectFacFrsCod()),
  };
}

function mapStateToProps(state) {
  return {
    clients: state.clients,
    codbes: state.codbes,
    codfacfrss: state.codfacfrss,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBEModal);
