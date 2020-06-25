import React, { Component } from "react";
import {
  Modal,
  Button,
  Row,
  Col,
  Form,
  FormControl,
  Card,
} from "react-bootstrap";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import { Table } from "reactstrap";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Label } from "reactstrap";
import OpenIconSpeedDial from "./SpeedDial";
import ProgressBar from "./ProgressBar";
import { SelectDevisLig } from "../../redux/actions/GetDevisLig";
import { connect } from "react-redux";
import { Divider, TextField, Fab } from "@material-ui/core";
import { SelectSumQDV } from "../../redux/actions/GetSumQLigDV";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import PrintIcon from "@material-ui/icons/Print";
import EditIcon from "@material-ui/icons/Edit";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import ModifierLigDevis from "./ModifierLigDevis";
import { SelectUser } from "../../redux/actions/DevisClient";
import Alert from "@material-ui/lab/Alert";
import ReactToPrint from "react-to-print";
import { SelectClient } from "../../redux/actions/GetClients";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PhoneIcon from "@material-ui/icons/Phone";

const actions = [
  // { icon: <PrintIcon />, name: "Imprimer" },
  { icon: <EditIcon />, name: "Modifier" },
  { icon: <CancelPresentationIcon />, name: "Annuler" },
  { icon: <DeleteOutlineIcon />, name: "Supprimer" },
];

const DATE_OPTIONS = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
};

class EditDevisClientModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snackbaropen: false,
      snacckbarmsg: "",
      totalqte: this.props.totalqteee,
      totalq: 0,
      newtable: [],
      open: false,
      hidden: false,
      openModifierModal: false,
      artligs: [],
      show: false,
      snackbaropen: false,
      snackbaropensup: false,
      snackbaropennodel: false,
      snackbarmsg: ",",
      sumsttc: [],
      ttt: 0,
      clientimp: [],
    };
  }

  componentDidMount() {
    this.props.SelectDevisLig();
    this.props.SelectUser();
    this.props.SelectClient();
  }

  submitHandler = (shown, artligs) => {
    this.setState({
      shown: shown,
      artligs: artligs,
    });
  };

  annuler = () => {
    fetch(`http://192.168.1.100:81/api/BCDVCLIs?numfac=${this.props.devisid}`, {
      method: "PUT",
      header: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ snackbaropen: true, snackbarmsg: result });
        },
        (error) => {
          this.setState({ snackbaropen: true, snackbarmsg: "failed" });
        }
      );
  };

  imprimer = () => {
    window.alert("imprimer");
  };

  nodelete = () => {
    // window.alert("vous devez annuler first");
    this.setState({ snackbaropennodel: true });
  };

  supprimer = () => {
    // if (window.confirm("Voulez vous supprimer ce devis ?")) {
    //   fetch(`http://192.168.1.100:81/api/BCDVCLIs/` + this.props.devisid, {
    //     method: "DELETE",
    //     header: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //   })
    //     .then((res) => res.json())
    //     .then((result) => {
    //       console.log(result);
    //       this.setState({ snackbaropensup: true, snackbarmsg: result });
    //     });
    //   fetch(`http://192.168.1.100:81/api/LigBCDV/` + this.props.devisid, {
    //     method: "DELETE",
    //     header: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //   })
    //     .then((res) => res.json())
    //     .then((result) => {
    //       console.log(result);
    //       this.setState({ snackbaropensup: true, snackbarmsg: result });
    //     });
    // }
    // this.props.onHide();
    // this.props.SelectUser();
  };

  openModifier = () => {
    this.setState({ openModifierModal: true });
  };

  handleOpen = () => {
    this.setState({ open: true });
    fetch(`http://192.168.1.100:81/api/Clients?codeclient=${this.props.client}`)
      .then((response) => response.json())
      .then((data) => this.setState({ clientimp: data }));
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  snackbarClose = (event) => {
    this.setState({ snackbaropen: false });
  };

  snackbarClosesup = (event) => {
    this.setState({ snackbaropensup: false });
  };

  snackbarClosenodel = (event) => {
    this.setState({ snackbaropennodel: false });
  };

  render() {
    let ModifierModalClose = () => this.setState({ openModifierModal: false });

    const netapayer =
      parseInt(this.props.totalttc) + parseInt(this.props.droitdetimbre);
    const SumQte =
      this.state.test &&
      this.state.test.reduce((a, v) => a + parseInt(v.qte), 0);

    const Sumttcc =
      this.state.artligs &&
      this.state.artligs.reduce((a, v) => a + v.puttcnet, 0);

    // this.setState({ ttt: Sumttcc });

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

        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={this.state.snackbaropensup}
          autoHideDuration={2000}
          onClose={this.snackbarClosesup}
          message={<span id="message-id"> {this.state.snackbarmsg} </span>}
          action={[
            <IconButton
              key="close"
              color="inherit"
              onClick={this.snackbarClosesup}
            >
              x
            </IconButton>,
          ]}
        ></Snackbar>

        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={this.state.snackbaropennodel}
          autoHideDuration={4000}
          onClose={this.snackbarClosenodel}
        >
          <Alert onClose={this.snackbarClosenodel} severity="error">
            Vous devez l'annuler d'abord pour le supprimer
          </Alert>
        </Snackbar>
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Détails devis client
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card>
              <Card.Body>
                <Row>
                  <Col style={{ textAlign: "center" }} sm={2}>
                    <Typography variant="h5" component="h2">
                      <Label>№ Devis</Label>
                    </Typography>
                    <Typography style={{ color: "grey" }}>
                      {this.props.devisid}
                    </Typography>
                  </Col>

                  <Col style={{ textAlign: "center" }} sm={3}>
                    <Typography variant="h5" component="h2">
                      <Label>Date Devis</Label>
                    </Typography>
                    <Typography style={{ color: "grey" }}>
                      {/* {this.props.datedevis} */}
                      {new Date(this.props.datedevis).toLocaleDateString(
                        "fr",
                        DATE_OPTIONS
                      )}
                    </Typography>
                  </Col>

                  <Col style={{ textAlign: "center" }} sm={2}>
                    <Typography variant="h5" component="h2">
                      <Label>Client</Label>
                    </Typography>
                    <Typography style={{ color: "grey" }}>
                      {this.props.client}
                    </Typography>
                  </Col>

                  <Col style={{ textAlign: "center" }} sm={5}>
                    <Typography variant="h5" component="h2">
                      <Label>Raison sociale</Label>
                    </Typography>
                    <Typography style={{ color: "grey" }}>
                      {this.props.raisonsociale}
                    </Typography>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card style={{ marginTop: "10px" }}>
              <Card.Body>
                {/* <div className="ligbc-table"> */}
                <div className="tabd28">
                  <table stripped>
                    <thead>
                      <tr style={{ textAlign: "center", fontSize: "12px" }}>
                        <th>Code</th>
                        <th style={{ width: "37%" }}>Désignation</th>
                        <th>Quantité</th>
                        {/* <th>Unité</th> */}
                        <th>PUHT</th>
                        <th>Remise</th>
                        <th>TVA</th>
                        <th>PUTTCNet</th>
                        <th>TotalHT</th>
                      </tr>
                    </thead>
                    <tbody
                      style={{
                        overflowY: "auto",
                        display: "block",
                        maxHeight: "10em",
                      }}
                    >
                      {this.props.tabtab.map((t, i) => (
                        <tr key={i} style={{ textAlign: "center" }}>
                          <td>
                            <span>{t.codart}</span>
                          </td>
                          <td style={{ fontSize: "12px", width: "37%" }}>
                            {t.desart}
                          </td>
                          <td>
                            <span>{t.quantite}</span>
                          </td>
                          {/* <td>
                            <span>{t.unite}</span>
                          </td> */}
                          <td>
                            <span>{Number(t.priuni).toFixed(3)}</span>
                          </td>

                          <td>
                            <span>{Number(t.remise).toFixed(2)}</span>
                          </td>
                          <td>
                            <span>{Number(t.tautva).toFixed(2)}</span>
                          </td>

                          <td>
                            <span>{Number(t.PUTTCNET).toFixed(3)}</span>
                          </td>
                          <td>
                            <span>{Number(t.montht).toFixed(3)}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card.Body>
            </Card>

            <Card style={{ marginTop: "10px" }}>
              <Card.Body>
                <Row style={{ marginBottom: "-10px" }}>
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
                    <p style={{ color: "grey", marginBottom: "-5px" }}>
                      Total HT Brut
                    </p>
                    <p style={{ color: "black" }}>
                      {Number(this.props.totalhtbrut).toFixed(3)}
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
                    <p style={{ color: "grey", marginBottom: "-5px" }}>
                      Remise Article
                    </p>
                    <p style={{ color: "black" }}>
                      {Number(this.props.remiselignes).toFixed(3)}
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
                    <p style={{ color: "grey", marginBottom: "-5px" }}>
                      Total TVA
                    </p>
                    <p style={{ color: "black" }}>
                      {Number(this.props.totaltva).toFixed(3)}
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
                    <p style={{ color: "grey", marginBottom: "-5px" }}>
                      Total Quantité
                    </p>
                    {/* {this.state.sums.map((sum) => (
                      <p style={{ color: "black" }}>{sum.Column1}
                      </p> */}
                    <p style={{ color: "black" }}> {this.props.sumqt} </p>
                  </Col>
                </Row>

                {/* ///////////////////2eme/////////////////////////////////// */}

                <Row style={{ marginBottom: "10px" }}>
                  <Col sm={3}>
                    <Divider style={{ backgroundColor: "grey" }} />
                  </Col>
                  <Col sm={3}>
                    <Divider style={{ backgroundColor: "grey" }} />
                  </Col>
                  <Col sm={3}>
                    <Divider style={{ backgroundColor: "grey" }} />
                  </Col>
                  <Col sm={3}>
                    <Divider style={{ backgroundColor: "grey" }} />
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
                    <p style={{ color: "grey", marginBottom: "-5px" }}>
                      Total HT Net
                    </p>
                    <p style={{ color: "black" }}>
                      {Number(this.props.totalhtnet).toFixed(3)}
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
                    <p style={{ color: "grey", marginBottom: "-5px" }}>
                      Remise Globale
                    </p>
                    <p style={{ color: "black" }}>
                      {Number(this.props.remiseglobale).toFixed(3)}
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
                    <p style={{ color: "grey", marginBottom: "-5px" }}>
                      Total TTC
                    </p>
                    <p style={{ color: "black" }}>
                      {Number(this.props.totalttc).toFixed(3)}
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
                    <p style={{ color: "grey", marginBottom: "-5px" }}>
                      Net à Payer
                    </p>
                    <p style={{ color: "black" }}>
                      {Number(this.props.totalttc).toFixed(3)}
                    </p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* ///////////////////SpeedDial//////////////////////////////// */}
            <Row>
              <Col sm={10}></Col>
              <Col sm={2}>
                <SpeedDial
                  style={{
                    position: "absolute",
                    bottom: "-20px",
                    right: "10px",
                  }}
                  ariaLabel="SpeedDial openIcon example"
                  hidden={this.state.hidden}
                  icon={<EditIcon openIcon={<EditIcon />} />}
                  onClose={this.handleClose}
                  onOpen={this.handleOpen}
                  open={this.state.open}
                  FabProps={{ size: "small" }}
                >
                  {actions.map((action) => (
                    <SpeedDialAction
                      key={action.name}
                      icon={action.icon}
                      tooltipTitle={action.name}
                      onClick={() => {
                        this.handleClose();
                        //  action.name == "Imprimer" && this.imprimer();
                        action.name == "Modifier" && this.openModifier();
                        action.name == "Supprimer" &&
                          this.props.annuler === "1" &&
                          this.supprimer();
                        action.name == "Supprimer" &&
                          this.props.annuler === "0" &&
                          this.nodelete();
                        action.name == "Annuler" && this.annuler();
                      }}
                    />
                  ))}
                  {!this.state.open ? (
                    <ReactToPrint
                      trigger={() => (
                        <Fab
                          size="small"
                          style={{
                            backgroundColor: "white",
                            display: "none",
                          }}
                          aria-label="add"
                        >
                          <PrintIcon />
                        </Fab>
                      )}
                      content={() => this.componentRef}
                    />
                  ) : (
                    <ReactToPrint
                      trigger={() => (
                        <Fab
                          size="small"
                          style={{
                            backgroundColor: "white",
                            marginLeft: "7px",
                            color: "grey",
                          }}
                          aria-label="add"
                        >
                          <PrintIcon />
                        </Fab>
                      )}
                      content={() => this.componentRef}
                    />
                  )}
                </SpeedDial>
              </Col>
            </Row>

            <ModifierLigDevis
              show={this.state.openModifierModal}
              onHide={ModifierModalClose}
              numfacc={this.props.devisid}
              datfac={this.props.datedevis}
              onHide01={this.props.onHide}
            />
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>

        <div style={{ display: "none" }}>
          <div
            ref={(el) => (this.componentRef = el)}
            style={{ margin: "15px", height: "98%" }}
          >
            <h3>Société POLYSOFT & CO</h3>
            <p>
              Logiciels, Servie informatique et conseil <br />
              Adresse : Avenue Majida Boulila Imm Loulou 3000 Sfax - Tunisie{" "}
              <br />
              Tél: 74 443 620 / Gsm: 20 413 577 / Email: gm@polysoftco.tn <br />
              Code TVA: 1609013R A/M/000 <br />
              RIB: 08 804 0003410007877 51 BIAT H.Thameur Sfax
            </p>
            <h3
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              ---------- Devis № {this.props.devisid}{" "}
              ------------------------------------------------
            </h3>
            <Row>
              <Col>
                <h4 style={{ marginLeft: "150px" }}>
                  Date:{" "}
                  {new Date(this.props.datedevis).toLocaleDateString(
                    "fr",
                    DATE_OPTIONS
                  )}
                </h4>
              </Col>
              <Col>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    textAlign: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <h6>Code Client : {this.props.client}</h6>
                  {this.state.clientimp.map((t) => (
                    <h6 style={{ marginRight: "20px" }}>
                      <PhoneIcon /> {t.tel1} / {t.tel2}
                    </h6>
                  ))}
                </div>

                <div
                  style={{
                    marginTop: "5px",
                    borderStyle: "solid",
                    height: "150px",
                    width: "95%",
                    borderRadius: "20px",
                    marginBottom: "15px",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      textAlign: "center",
                      marginTop: "20px",
                    }}
                  >
                    <h3> {this.props.raisonsociale} </h3>
                    {this.state.clientimp.map((t) =>
                      t.adr === "" ? (
                        <h5>
                          <HomeIcon /> --
                        </h5>
                      ) : (
                        <h5>
                          <HomeIcon /> {t.adr}
                        </h5>
                      )
                    )}

                    {this.state.clientimp.map((t) =>
                      t.ville === "" ? <h5>{t.ville}</h5> : <h5>--</h5>
                    )}
                  </div>
                </div>

                {this.state.clientimp.map((t) =>
                  t.codtva === "" ? (
                    <h6>Code TVA : {t.cin}</h6>
                  ) : (
                    <h6>Code TVA : --</h6>
                  )
                )}
              </Col>
            </Row>
            <br />
            <div
              style={{
                marginLeft: "5px",
                // marginRight: "50px",
                marginTop: "10px",
                width: "99%",
              }}
            >
              <Table
                style={{
                  textAlign: "center",
                  borderStyle: "1px",
                  height: "650px",
                }}
              >
                <thead
                  style={{
                    textAlign: "center",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  <tr>
                    <th>Article</th>
                    <th>Désignation</th>
                    <th>Quantité</th>
                    <th>Unité</th>
                    <th>PUHT</th>
                    <th>Fodec</th>
                    <th>Remise</th>
                    <th>TVA</th>
                    <th>TotalHT</th>
                    <th>PUNet</th>
                  </tr>
                </thead>

                <tbody>
                  {this.props.ligs.ligs.map((lig) =>
                    lig.numfac === this.props.devisid ? (
                      <tr style={{ paddingTop: "-50px" }}>
                        <td>{lig.codart}</td>
                        <td style={{ fontSize: "12px" }}>{lig.desart}</td>
                        <td>{lig.quantite}</td>
                        <td>{lig.unite}</td>
                        <td>{lig.priuni}</td>
                        <td>{lig.fodart ? <span>✔</span> : <span>Ø</span>}</td>
                        <td>{lig.remise}</td>
                        <td>{lig.tautva}</td>
                        <td>{lig.totalht}</td>
                        <td>{lig.puttcnet}</td>
                      </tr>
                    ) : (
                      <tr></tr>
                    )
                  )}
                </tbody>
              </Table>
            </div>

            <br />
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                textAlign: "center",
                marginTop: "20px",
                justifyContent: "space-between",
                marginLeft: "5px",
              }}
            >
              <div
                style={{
                  marginLeft: "5px",
                }}
              >
                <table
                  style={{
                    textAlign: "center",
                    borderStyle: "solid",
                    width: "450px",
                    borderWidth: "1px",
                  }}
                >
                  <thead
                    style={{
                      textAlign: "center",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    <tr>
                      <th>T.V.A</th>
                      <th>Assiette</th>
                      <th>Montant</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ height: "50px" }}>
                      <td>{this.props.totaltva}</td>
                      <td>{this.props.totaltva}</td>
                      <td>{this.props.totaltva}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                style={{
                  width: "200px",
                  display: "flex",
                  flexDirection: "row",
                  textAlign: "center",
                }}
              >
                <h5>
                  <b>Total quantité: </b>
                </h5>
                &nbsp;&nbsp;&nbsp; <h5>{this.props.sum}</h5>
              </div>

              <table
                style={{
                  borderStyle: "solid",
                  width: "270px",
                  marginRight: "10px",
                  borderWidth: "1px",
                }}
              >
                <tr style={{ height: "50px" }}>
                  <td style={{ fontWeight: "bold" }}>
                    &nbsp;&nbsp;&nbsp;Total.H.T Net:
                  </td>
                  <td>{this.props.totalhtnet}</td>
                </tr>
                <tr style={{ height: "50px" }}>
                  <td style={{ fontWeight: "bold" }}>
                    {" "}
                    &nbsp;&nbsp;&nbsp;Total TVA:
                  </td>
                  <td>{this.props.totaltva}</td>
                </tr>
                <tr style={{ height: "50px" }}>
                  <td style={{ fontWeight: "bold" }}>
                    {" "}
                    &nbsp;&nbsp;&nbsp;Timbre fiscal:
                  </td>
                  <td>{this.props.droitdetimbre}</td>
                </tr>
                <tr style={{ height: "50px" }}>
                  <td style={{ fontWeight: "bold" }}>
                    {" "}
                    &nbsp;&nbsp;&nbsp;Net à Payer:
                  </td>
                  <td style={{ fontWeight: "bold" }}>
                    {" "}
                    {Number(this.props.totalttc).toFixed(3)}{" "}
                  </td>
                </tr>
              </table>
            </div>
            <br />
            <br />

            {/* //////////////////////// footer ///////////////////////////// */}
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                textAlign: "center",
                marginTop: "20px",
                justifyContent: "space-between",
                marginLeft: "5px",
              }}
            >
              <div
                style={{
                  borderStyle: "solid",
                  width: "350px",
                  marginLeft: "5px",
                  borderWidth: "1px",
                  height: "100px",
                  borderRadius: "20px",
                  textAlign: "left",
                }}
              >
                &nbsp;&nbsp;&nbsp;Notes:
              </div>

              <div
                style={{
                  borderStyle: "solid",
                  width: "350px",
                  borderWidth: "1px",
                  height: "100px",
                  borderRadius: "20px",
                  textAlign: "left",
                }}
              >
                &nbsp;&nbsp;&nbsp;Signature Client:
              </div>

              <div
                style={{
                  borderStyle: "solid",
                  width: "340px",
                  marginRight: "10px",
                  borderWidth: "1px",
                  height: "100px",
                  borderRadius: "20px",
                  textAlign: "left",
                }}
              >
                &nbsp;&nbsp;&nbsp;Signature & cachet:
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    SelectDevisLig: () => dispatch(SelectDevisLig()),
    SelectUser: () => dispatch(SelectUser()),
    SelectClient: () => dispatch(SelectClient()),
  };
}

function mapStateToProps(state) {
  return {
    ligs: state.ligs,
    clients: state.clients,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditDevisClientModal);
