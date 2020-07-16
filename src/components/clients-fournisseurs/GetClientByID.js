import React, { Component } from "react";
import { Modal, Card, Row, Col, Alert } from "react-bootstrap";
import "../styling/Styles.css";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import HomeIcon from "@material-ui/icons/Home";
import LanguageIcon from "@material-ui/icons/Language";
import { Divider, Snackbar, IconButton } from "@material-ui/core";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import PrintIcon from "@material-ui/icons/Print";
import EditIcon from "@material-ui/icons/Edit";
import SettingsIcon from "@material-ui/icons/Settings";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import ModifierClientModal from "./ModifierClientModal";
import MailModal from "./MailModal";

const actions = [
  { icon: <MailOutlineIcon />, name: "Mail" },
  { icon: <EditIcon />, name: "Modifier" },
  { icon: <DeleteOutlineIcon />, name: "Supprimer" },
];

class GetClientByID extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      hidden: false,
      openModifierModal: false,
      openMailModal: false,
      snackbaropen: false,
      snackbaropenn: false,
      snackbarmsg: "",
    };
  }

  // componentDidMount() {
  //   document.getElementById("tell").innerHTML =
  //     '<a href="tel:' + this.props.tel1 + '">' + this.props.tel1 + "</a>";
  // }
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  openMail = () => {
    this.setState({ openMailModal: true });
  };

  openModifier = () => {
    this.setState({ openModifierModal: true });
  };

  nomail = () => {
    this.setState({ snackbaropen: true });
  };

  snackbarClose = (event) => {
    this.setState({ snackbaropen: false });
  };

  snackbarClosee = (event) => {
    this.setState({ snackbaropenn: false });
  };

  deleteclient(clientid) {
    if (window.confirm("êtes-vous sûr de vouloir supprimer ce client?")) {
      fetch(`http://192.168.1.100:81/api/CLIENTs/` + clientid, {
        method: "DELETE",
        header: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState({ snackbaropenn: true, snackbarmsg: result });
            console.log(result);
          },
          (error) => {
            this.setState({ snackbaropenn: true, snackbarmsg: "failed" });
          }
        );
      //  this.props.SelectArticle();
      this.props.onHide();
    }
  }
  render() {
    let ModifierModalClose = () => this.setState({ openModifierModal: false });
    let MailModalClose = () => this.setState({ openMailModal: false });

    return (
      <div className="container">
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={this.state.snackbaropenn}
          autoHideDuration={3000}
          onClose={this.snackbarClosee}
          message={this.state.snackbarmsg}
          action={[
            <IconButton
              key="close"
              color="inherit"
              onClick={this.snackbarClosee}
            >
              x
            </IconButton>,
          ]}
        ></Snackbar>

        <Snackbar
          open={this.state.snackbaropen}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          onClose={this.snackbarClose}
        >
          <Alert onClose={this.snackbarClose} variant={"danger"}>
            Email non trouvable pour ce client
          </Alert>
        </Snackbar>

        <Modal
          {...this.props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header
            closeButton
            style={{ backgroundColor: "white", color: "#020F64" }}
          >
            <Modal.Title id="contained-modal-title-vcenter">
              <b>Détails Client</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.passager ? (
              <Alert
                style={{ width: "100%", textAlign: "center" }}
                variant={"primary"}
              >
                Client passager
              </Alert>
            ) : null}
            <Card>
              <Card.Body
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  textAlign: "center",
                }}
              >
                <h3>{this.props.raisoc}</h3>
                <p style={{ color: "gray", fontSize: "larger" }}>
                  {this.props.codeclient}
                </p>
                {/* <a href="tel: 58941408">{this.props.tel1}</a> */}

                <Divider></Divider>
                {this.props.tel1 === "" && !this.props.tel2 === "" ? (
                  <p>
                    <PhoneIcon />{" "}
                    <a href={`tel:${this.props.tel2}`}>{this.props.tel2}</a>
                  </p>
                ) : !this.props.tel1 === "" && this.props.tel2 === "" ? (
                  <p id="tell">
                    <PhoneIcon />{" "}
                    <a href={`tel:${this.props.tel1}`}>{this.props.tel1}</a>
                  </p>
                ) : this.props.tel1 === "" && this.props.tel2 === "" ? (
                  <p>
                    <PhoneIcon /> --
                  </p>
                ) : (
                  <p>
                    <PhoneIcon />{" "}
                    <a href={`tel:${this.props.tel1}`}>{this.props.tel1}</a> /{" "}
                    <a href={`tel:${this.props.tel2}`}>{this.props.tel2}</a>
                  </p>
                )}
                {this.props.email === "" ? (
                  <p>
                    <EmailIcon /> --
                  </p>
                ) : (
                  <p>
                    <EmailIcon />{" "}
                    <a href={"mailto:" + this.props.email}>
                      {this.props.email}
                    </a>
                  </p>
                )}

                {this.props.adresse === "" ? (
                  <p>
                    <HomeIcon /> --
                  </p>
                ) : (
                  <p>
                    <HomeIcon />{" "}
                    <a
                      href={
                        "https://www.google.com/maps/search/" +
                        this.props.adresse
                      }
                      target="_blank"
                    >
                      {this.props.adresse}
                    </a>
                  </p>
                )}

                {this.props.siteweb === "" ? null : (
                  <p>
                    <LanguageIcon /> {this.props.siteweb}
                  </p>
                )}
              </Card.Body>
            </Card>

            <Row style={{ marginTop: "18px" }}>
              <Col sm={6}>
                {this.props.timbre ? (
                  <Alert style={{ width: "100%" }} variant={"success"}>
                    Avec Timbre
                  </Alert>
                ) : (
                  <Alert style={{ width: "100%" }} variant={"danger"}>
                    Sans Timbre
                  </Alert>
                )}
              </Col>

              <Col sm={6}>
                {this.props.soustraitant ? (
                  <Alert style={{ width: "100%" }} variant={"success"}>
                    Avec soustraitant
                  </Alert>
                ) : (
                  <Alert style={{ width: "100%" }} variant={"danger"}>
                    Sans soustraitant
                  </Alert>
                )}
              </Col>
            </Row>

            <Card>
              <Card.Body>
                <Row style={{ marginLeft: "10px" }}>
                  <Col sm={2}>
                    <b>CIN</b>
                  </Col>
                  <Col sm={3}>
                    {this.props.cin === "" ? (
                      <p style={{ color: "gray" }}>--</p>
                    ) : (
                      <p style={{ color: "gray" }}>{this.props.cin}</p>
                    )}
                  </Col>
                  <Col sm={4}>
                    <b>Identifiant</b>
                  </Col>
                  <Col sm={3}>
                    {this.props.identifiant === "" ? (
                      <p style={{ color: "gray" }}>--</p>
                    ) : (
                      <p style={{ color: "gray" }}>{this.props.identifiant}</p>
                    )}
                  </Col>
                </Row>

                <Row style={{ marginLeft: "10px" }}>
                  <Col sm={2}>
                    <b>Ville</b>
                  </Col>
                  <Col sm={3}>
                    {this.props.ville === "" ? (
                      <p style={{ color: "gray" }}>--</p>
                    ) : (
                      <p style={{ color: "gray" }}>{this.props.ville}</p>
                    )}
                  </Col>
                  <Col sm={4}>
                    <b>Code Postal</b>
                  </Col>
                  <Col sm={3}>
                    {this.props.codepostal === "" ? (
                      <p style={{ color: "gray" }}>--</p>
                    ) : (
                      <p style={{ color: "gray" }}>{this.props.codepostal}</p>
                    )}
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Row>
              <Col sm={10}></Col>
              <Col sm={2}>
                <SpeedDial
                  style={{ position: "absolute", bottom: "0px", right: "10px" }}
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
                        action.name == "Imprimer" && this.affiche();
                        this.props.email !== "" &&
                          action.name == "Mail" &&
                          this.openMail();
                        this.props.email === "" &&
                          action.name == "Mail" &&
                          this.nomail();
                        action.name == "Modifier" && this.openModifier();
                        action.name == "Supprimer" &&
                          this.deleteclient(this.props.codeclient) &&
                          this.props.onHide();
                      }}
                    />
                  ))}
                </SpeedDial>
              </Col>
            </Row>

            <ModifierClientModal
              show={this.state.openModifierModal}
              onHide={ModifierModalClose}
              passager={this.props.passager}
              codeclient={this.props.codeclient}
              raisoc={this.props.raisoc}
              tel1={this.props.tel1}
              tel2={this.props.tel2}
              email={this.props.email}
              adresse={this.props.adresse}
              siteweb={this.props.siteweb}
              cin={this.props.cin}
              ville={this.props.ville}
              codepostal={this.props.codepostal}
              identifiant={this.props.identifiant}
              tauxfodec={this.props.tauxfodec}
              timbre={this.props.timbre}
              soustraitant={this.props.soustraitant}
              acontacter={this.props.acontacter}
              impot={this.props.impot}
              comptable={this.props.comptable}
            />

            <MailModal
              show={this.state.openMailModal}
              onHide={MailModalClose}
              email={this.props.email}
            />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default GetClientByID;
