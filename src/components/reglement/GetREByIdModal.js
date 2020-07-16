import React, { Component } from "react";
import { Modal, Card, Row, Col } from "react-bootstrap";
import "../styling/Styles.css";
import { Typography, Button } from "@material-ui/core";
import { Label, Alert } from "reactstrap";

import Popover from "@material-ui/core/Popover";
import { makeStyles } from "@material-ui/core/styles";

import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import PrintIcon from "@material-ui/icons/Print";
import EditIcon from "@material-ui/icons/Edit";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { Divider, Fab, IconButton, Snackbar } from "@material-ui/core";
import ReactToPrint from "react-to-print";
import HomeIcon from "@material-ui/icons/Home";
import PhoneIcon from "@material-ui/icons/Phone";
import FileCopyIcon from "@material-ui/icons/FileCopy";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

const actions = [
  // { icon: <PrintIcon />, name: "Imprimer" },
  { icon: <EditIcon />, name: "Modifier" },
  { icon: <CancelPresentationIcon />, name: "Annuler" },
  { icon: <DeleteOutlineIcon />, name: "Supprimer" },
  { icon: <FileCopyIcon />, name: "Facturer" },
];

const DATE_OPTIONS = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
};

class GetREByIdModal extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, popoverOpen: false, anchorEl: null };
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClosee = () => {
    this.setState({ anchorEl: null });
  };

  toggle = () => {
    this.setState({ popoverOpen: true });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const openn = Boolean(this.state.anchorEl);
    const id = openn ? "simple-popover" : undefined;
    return (
      <div className="container">
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
              <b>Détails Règlement Client</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card>
              <Card.Body>
                <Row>
                  <Col style={{ textAlign: "center" }} sm={3}>
                    <Typography variant="h6" component="h2">
                      <Label style={{ color: "#020f64" }}>№ Règlement</Label>
                    </Typography>
                    <Typography style={{ color: "grey", fontSize: "14px" }}>
                      {this.props.regid}
                    </Typography>
                  </Col>

                  <Col style={{ textAlign: "center" }} sm={3}>
                    <Typography variant="h6" component="h2">
                      <Label style={{ color: "#020f64" }}>Date Règ</Label>
                    </Typography>
                    <Typography style={{ color: "grey", fontSize: "14px" }}>
                      {/* {this.props.datebl} */}
                      {new Date(this.props.datereg).toLocaleDateString(
                        "fr",
                        DATE_OPTIONS
                      )}
                    </Typography>
                  </Col>

                  <Col style={{ textAlign: "center" }} sm={2}>
                    <Typography variant="h6" component="h2">
                      <Label style={{ color: "#020f64" }}>Client</Label>
                    </Typography>
                    <Typography style={{ color: "grey", fontSize: "14px" }}>
                      {this.props.client}
                    </Typography>
                  </Col>

                  <Col style={{ textAlign: "center" }} sm={4}>
                    <Typography variant="h6" component="h2">
                      <Label style={{ color: "#020f64" }}>Raison Sociale</Label>
                    </Typography>
                    <Typography style={{ color: "grey", fontSize: "14px" }}>
                      {this.props.raisonsociale}
                    </Typography>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <br />

            <Row>
              <Col sm={6}>
                <Card>
                  <Card.Body>
                    <Row style={{ marginBottom: "-12px" }}>
                      <Col sm={6}>
                        <p style={{ color: "darkslateblue" }}>Mode règlement</p>
                      </Col>
                      <Col sm={6}>
                        {this.props.modreg === "" ||
                        this.props.modreg === null ? (
                          <p style={{ color: "black" }}>--</p>
                        ) : (
                          <p style={{ color: "black" }}>{this.props.modreg}</p>
                        )}
                      </Col>
                    </Row>

                    <Row style={{ marginBottom: "-12px" }}>
                      <Col sm={6}>
                        <p style={{ color: "darkslateblue" }}>№ Pièce</p>
                      </Col>

                      <Col sm={6}>
                        {this.props.numchq === "" ||
                        this.props.numchq === null ? (
                          <p style={{ color: "black" }}>--</p>
                        ) : (
                          <p style={{ color: "black" }}>{this.props.numchq}</p>
                        )}
                      </Col>
                    </Row>

                    <Row style={{ marginBottom: "-12px" }}>
                      <Col sm={6}>
                        <p style={{ color: "darkslateblue" }}>Banque client</p>
                      </Col>

                      <Col sm={6}>
                        {this.props.matban === "" ||
                        this.props.matban === null ? (
                          <p style={{ color: "black" }}>--</p>
                        ) : (
                          <p style={{ color: "black" }}>{this.props.matban}</p>
                        )}
                      </Col>
                    </Row>

                    <Row style={{ marginBottom: "-12px" }}>
                      <Col sm={6}>
                        <p style={{ color: "darkslateblue" }}>Agence</p>
                      </Col>

                      <Col sm={6}>
                        {this.props.agence === "" ||
                        this.props.agence === null ? (
                          <p style={{ color: "black" }}>--</p>
                        ) : (
                          <p style={{ color: "black" }}>{this.props.agence}</p>
                        )}
                      </Col>
                    </Row>

                    <Row style={{ marginBottom: "-12px" }}>
                      <Col sm={6}>
                        <p style={{ color: "darkslateblue" }}>Caisse</p>
                      </Col>

                      <Col sm={6}>
                        {this.props.numcais === "" ||
                        this.props.numcais === null ? (
                          <p style={{ color: "black" }}>--</p>
                        ) : (
                          <p style={{ color: "black" }}>{this.props.numcais}</p>
                        )}
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>

              <Col sm={6}>
                <Card style={{ height: "100%" }}>
                  <Card.Body>
                    <Row style={{ marginBottom: "-12px" }}>
                      <Col sm={7}>
                        <p style={{ color: "darkslateblue" }}>Echéance</p>
                      </Col>

                      <Col sm={5}>
                        {this.props.datech === null ||
                        this.props.datech === "" ? (
                          <p style={{ color: "black" }}>--</p>
                        ) : (
                          <p style={{ color: "black" }}>{this.props.datech}</p>
                        )}
                      </Col>
                    </Row>
                    <Row style={{ marginBottom: "-12px" }}>
                      <Col sm={7}>
                        <p style={{ color: "darkslateblue" }}>Titulaire</p>
                      </Col>

                      <Col sm={5}>
                        {this.props.titulaire === "" ||
                        this.props.titulaire === null ? (
                          <p style={{ color: "black" }}>--</p>
                        ) : (
                          <p style={{ color: "black" }}>
                            {this.props.titulaire}
                          </p>
                        )}
                      </Col>
                    </Row>
                    <Row style={{ marginBottom: "-12px" }}>
                      <Col sm={7}>
                        <p style={{ color: "darkslateblue" }}>Situation</p>
                      </Col>

                      <Col sm={5}>
                        {this.props.verser === "" ||
                        this.props.verser === null ? (
                          <p style={{ color: "black" }}>--</p>
                        ) : (
                          <p style={{ color: "black" }}>{this.props.verser}</p>
                        )}
                      </Col>
                    </Row>
                    <Row style={{ marginBottom: "-12px" }}>
                      <Col sm={7}>
                        <p style={{ color: "darkslateblue" }}>
                          Banque versement
                        </p>
                      </Col>

                      <Col sm={5}>
                        {this.props.bqescompte === "" ||
                        this.props.bqescompte === null ? (
                          <p style={{ color: "black" }}>--</p>
                        ) : (
                          <p style={{ color: "black" }}>
                            {this.props.bqescompte}
                          </p>
                        )}
                      </Col>
                    </Row>
                    <Row style={{ marginBottom: "-12px" }}>
                      <Col sm={7}>
                        <p style={{ color: "darkslateblue" }}>C.C.B</p>
                      </Col>

                      <Col sm={5}>
                        {this.props.codccb === "" ||
                        this.props.codccb === null ? (
                          <p style={{ color: "black" }}>--</p>
                        ) : (
                          <p style={{ color: "black" }}>{this.props.codccb}</p>
                        )}
                      </Col>
                    </Row>{" "}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Card style={{ marginTop: "12px" }}>
              <Card.Body>
                <Row style={{ marginBottom: "-12px" }}>
                  <Col sm={3}>
                    <div>
                      <Button
                        aria-describedby={id}
                        variant="contained"
                        color="primary"
                        style={{
                          //  background: "#17a2b8",
                          width: "100%",
                          height: "60px",
                        }}
                        onClick={this.handleClick}
                      >
                        Note
                      </Button>
                      <Popover
                        id={id}
                        open={openn}
                        anchorEl={this.state.anchorEl}
                        onClose={this.handleClosee}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "center",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                      >
                        <Typography
                          style={{
                            width: "500px",
                            height: "100px",
                            padding: "10px",
                            background: "#eee",
                          }}
                          className={useStyles.typography}
                        >
                          {this.props.note === "" ||
                          this.props.note === null ? (
                            <p> Note Vide ... </p>
                          ) : (
                            <p style={{ color: "black", fontSize: "17px" }}>
                              {this.props.note}
                            </p>
                          )}
                        </Typography>
                      </Popover>
                    </div>
                    {/* {this.props.note === "" ||
                    this.props.note === null ? null : (
                      <div>
                        <Row>
                          <Col sm={3}>
                            <p style={{ color: "#17a2b8" }}>Note</p>
                          </Col>
                          <Col sm={9}>
                            <p style={{ color: "black", fontSize: "12px" }}>
                              {this.props.note}
                            </p>
                          </Col>
                        </Row>
                      </div>
                    )} */}
                  </Col>
                  <Col sm={8}>
                    <Alert
                      color={"secondary"}
                      style={{
                        width: "100%",
                        height: "60px",
                      }}
                    >
                      <h4 style={{ color: "#17a2b8", textAlign: "center" }}>
                        Montant &nbsp;&nbsp;
                        <span style={{ color: "black" }}>
                          {Number(this.props.monreg).toFixed(3)}
                        </span>
                      </h4>
                    </Alert>
                  </Col>

                  {/* <Col sm={5}></Col> */}
                  <Col sm={1}>
                    <div>
                      <SpeedDial
                        style={{
                          position: "absolute",
                          bottom: "25px",
                          right: "0px",
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
                              // action.name == "Mail" && this.openMail();
                              action.name == "Modifier" && this.openModifier();
                              action.name == "Supprimer" &&
                                this.deletearticle(this.props.codearticle) &&
                                this.props.onHide();
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
                    </div>
                  </Col>
                </Row>
                <Row style={{ marginBottom: "-12px" }}>
                  <Col sm={6}>
                    {/* {this.props.note === "" ||
                    this.props.note === null ? null : (
                      <div>
                        <Row>
                          <Col sm={3}>
                            <p style={{ color: "#17a2b8" }}>Note</p>
                          </Col>
                          <Col sm={9}>
                            <p style={{ color: "black", fontSize: "12px" }}>
                              {this.props.note}
                            </p>
                          </Col>
                        </Row>
                      </div>
                    )} */}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default GetREByIdModal;
