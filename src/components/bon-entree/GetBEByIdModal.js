import React, { Component } from "react";
import { Modal, Card, Row, Col } from "react-bootstrap";
import "../styling/Styles.css";
import "./be.scss";
import Typography from "@material-ui/core/Typography";
import { Label, Table } from "reactstrap";
import { connect } from "react-redux";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import PrintIcon from "@material-ui/icons/Print";
import EditIcon from "@material-ui/icons/Edit";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { Divider, Fab, IconButton, Snackbar } from "@material-ui/core";
import ReactToPrint from "react-to-print";
import HomeIcon from "@material-ui/icons/Home";
import PhoneIcon from "@material-ui/icons/Phone";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ModifierBE from "./ModifierBE";
import { SelectBE } from "../../redux/actions/GetBE";

const roundTo = require("round-to");

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

var curr = new Date();
curr.setDate(curr.getDate());
var date = curr.toISOString().substr(0, 10);

class GetBEByIdModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      hidden: false,
      openModifierModal: false,
      ligid: "",
      blid: "",
      tab: [],
      newtab: [],
      todaydate: date,

      codearticle: 0,
      des: "",
      qte: 0,
      unite: 0,
      puht: 0,
      faudec: 0,
      remisea: 0,
      tva: 0,
      puttcnet: 0,
      totalht: 0,

      totalqte: 0,
      netapayer: 0,
      // tabtab: [],
      clientimp: [],
      snackbaropen: false,
      snackbarmsg: "",
    };
  }

  openModifier = () => {
    this.setState({ openModifierModal: true });
  };

  handleOpen = () => {
    this.setState({ open: true });
    fetch(
      `http://192.168.1.100:81/api/fournisseurs?codfrss=${this.props.client}`
    )
      .then((response) => response.json())
      .then((data) => this.setState({ clientimp: data }));
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  snackbarClose = (event) => {
    this.setState({ snackbaropen: false });
  };

  annuler = () => {
    // window.alert("annuler");
    this.props.annuler === "0"
      ? fetch(
          `http://192.168.1.100:81/api/BEREs?idd=${this.props.blid}&typfaccs=BL`,
          {
            method: "PUT",
            header: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => res.json())
          .then((result) => {
            this.props.onHide();
            this.props.SelectBE();
            console.log(result);
            this.setState({ snackbaropen: true, snackbarmsg: result });
          })
      : window.alert("Bon de livraison déja annulée");
  };

  supprimer = () => {
    if (
      window.confirm(
        "êtes-vous sûr de vouloir supprimer cette bon de livraison?"
      )
    ) {
      fetch(
        `http://192.168.1.100:81/api/LigBEREs/${this.props.blid}?typfacc=BE`,
        {
          method: "DELETE",
          header: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
        });

      fetch(`http://192.168.1.100:81/api/BEREs/${this.props.blid}?typfacc=BE`, {
        method: "DELETE",
        header: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((result) => {
          this.props.onHide();
          this.props.SelectBE();
          console.log(result);
          this.setState({ snackbaropen: true, snackbarmsg: result });
        });
    }
  };

  nonsupprimer = () => {
    window.alert(
      "Vous devez annuler ce bon de livraison pour que vous puisse le supprimer"
    );
  };

  snackbarClose = (event) => {
    this.setState({ snackbaropen: false });
  };

  render() {
    let ModifierModalClose = () => this.setState({ openModifierModal: false });

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
              <b>Détails Bon d'Entrée</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card>
              <Card.Body>
                <Row>
                  <Col style={{ textAlign: "center" }} sm={2}>
                    <Typography variant="h6" component="h2">
                      <Label>№ BE</Label>
                    </Typography>
                    <Typography style={{ color: "grey" }}>
                      {this.props.blid}
                    </Typography>
                  </Col>

                  <Col style={{ textAlign: "center" }} sm={3}>
                    <Typography variant="h6" component="h2">
                      <Label>Date BE</Label>
                    </Typography>
                    <Typography style={{ color: "grey" }}>
                      {/* {this.props.datebl} */}
                      {new Date(this.props.datebl).toLocaleDateString(
                        "fr",
                        DATE_OPTIONS
                      )}
                    </Typography>
                  </Col>

                  <Col style={{ textAlign: "center" }} sm={2}>
                    <Typography variant="h6" component="h2">
                      <Label>Fournisseur</Label>
                    </Typography>
                    <Typography style={{ color: "grey" }}>
                      {this.props.client}
                    </Typography>
                  </Col>

                  <Col style={{ textAlign: "center" }} sm={5}>
                    <Typography variant="h6" component="h2">
                      <Label>Raison Sociale</Label>
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
                <div className="tabbl2">
                  <table stripped>
                    <thead>
                      <tr style={{ textAlign: "center", fontSize: "12px" }}>
                        <th>Code</th>
                        <th style={{ width: "46%" }}>Désignation</th>
                        <th>Quantité</th>
                        {/* <th>Unité</th> */}
                        <th>PUHT</th>
                        <th>Remise</th>
                        <th>TVA</th>
                        {/* <th>PUTTCNet</th> */}
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
                          <td style={{ fontSize: "12px", width: "46%" }}>
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

                          {/* <td>
                            <span>{Number(t.PUTTCNET).toFixed(3)}</span>
                          </td> */}
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
                    <p style={{ color: "black" }}>
                      {/* {this.props.totalqte} */}
                      {/* {this.state.totalqte} */}
                      {this.props.sumqt}
                    </p>
                  </Col>
                </Row>

                {/* ///////////////////3eme/////////////////////////////////// */}

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
                    {/* <p style={{ color: "black" }}>{this.state.netapayer}</p> */}
                    <p style={{ color: "black" }}>
                      {Number(this.props.totalttc).toFixed(3)}
                    </p>
                  </Col>
                </Row>

                {/* ///////////////////SpeedDial//////////////////////////////// */}
                <Row>
                  <Col sm={10}></Col>
                  <Col sm={2}>
                    <SpeedDial
                      style={{
                        position: "absolute",
                        bottom: "-30px",
                        right: "0px",
                      }}
                      FabProps={{ size: "small" }}
                      ariaLabel="SpeedDial openIcon example"
                      hidden={this.state.hidden}
                      icon={<EditIcon openIcon={<EditIcon />} />}
                      onClose={this.handleClose}
                      onOpen={this.handleOpen}
                      open={this.state.open}
                    >
                      {actions.map((action) => (
                        <SpeedDialAction
                          key={action.name}
                          icon={action.icon}
                          tooltipTitle={action.name}
                          onClick={() => {
                            this.handleClose();
                            action.name == "Modifier" && this.openModifier();
                            action.name == "Supprimer" &&
                              this.props.annuler === "1" &&
                              this.supprimer();
                            action.name == "Supprimer" &&
                              this.props.annuler === "0" &&
                              this.nonsupprimer();

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
              </Card.Body>
            </Card>
          </Modal.Body>

          <ModifierBE
            show={this.state.openModifierModal}
            onHide={ModifierModalClose}
            //ligidd={this.state.ligid}
            tabb={this.props.tabtab}
            blid={this.props.blid}
            datebl={this.props.datebl}
            onHide01={this.props.onHide}
          />
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
              ---------- Bon d'Entrée № {this.props.blid}{" "}
              -------------------------------------
            </h3>
            <Row>
              <Col>
                <h4 style={{ marginLeft: "190px" }}>
                  Date:{" "}
                  {new Date(this.props.datebl).toLocaleDateString(
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
                  <h6>Code Fournisseur : {this.props.client}</h6>
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
                  t.CodeTVA === "" ? (
                    <h6>Code TVA : --</h6>
                  ) : (
                    <h6>Code TVA : {t.CodeTVA}</h6>
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
                minHeight: "640px",
              }}
            >
              <table
                style={{
                  textAlign: "center",
                  borderStyle: "1px",
                  width: "100%",
                }}
              >
                <thead
                  style={{
                    textAlign: "center",
                    fontSize: "20px",
                    fontWeight: "bold",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                  }}
                >
                  <tr>
                    <th>Code</th>
                    <th style={{ width: "37%" }}>Désignation</th>
                    <th>Quantité</th>
                    <th>PUHT</th>
                    <th>Remise</th>
                    <th>TVA</th>
                    <th>TotalHT</th>
                  </tr>
                </thead>

                <tbody>
                  {this.props.tabtab.map((t, i) => (
                    <tr
                      key={i}
                      style={{
                        textAlign: "center",
                        // paddingTop: "50px",
                        // paddingBottom: "50px",
                        height: "50px",
                      }}
                    >
                      <td>{t.codart}</td>
                      <td style={{ width: "37%" }}>{t.desart}</td>
                      <td>{t.quantite}</td>
                      {/* <td>
                        <span>{t.unite}</span>
                      </td> */}
                      <td>{Number(t.priuni).toFixed(3)}</td>

                      <td>{Number(t.remise).toFixed(2)}</td>
                      <td>{Number(t.tautva).toFixed(2)}</td>

                      <td>{Number(t.montht).toFixed(3)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                      <td>
                        {Number(
                          (Number(this.props.totaltva) /
                            Number(this.props.totalhtnet)) *
                            100
                        ).toFixed(2)}{" "}
                        %
                      </td>
                      <td>{this.props.totalhtnet}</td>
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
                &nbsp;&nbsp;&nbsp; <h5>{this.props.sumqt}</h5>
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
                    <Divider style={{ backgroundColor: "black" }}></Divider>
                  </td>

                  <td>
                    <Divider style={{ backgroundColor: "black" }}></Divider>
                  </td>
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
    SelectBE: () => dispatch(SelectBE()),
  };
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(GetBEByIdModal);
