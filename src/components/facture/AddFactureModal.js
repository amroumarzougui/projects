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
import "./facture.scss";

import { TextField, Paper, Button } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { connect } from "react-redux";
import { SelectClient } from "../../redux/actions/GetClients";
import { GetNumFacDevis } from "../../redux/actions/GetNumfacDevis";
import { SelectArticle } from "../../redux/actions/GetArticles";
import { Input, Label, Table } from "reactstrap";
import Center from "react-center";

import Tooltip from "@material-ui/core/Tooltip";

import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

import { Divider, Chip } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";

// import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
// import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

// import AddClientPassagerModal from "../commande-client-devis/AddClientPassagerModal";
import LigFactureArticle from "./LigFactureArticle";

const roundTo = require("round-to");

var curr = new Date();
curr.setDate(curr.getDate());
var date = curr.toISOString().substr(0, 10);

class AddBLModal extends Component {
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
    };
  }

  componentDidMount() {
    this.props.SelectClient();
    this.props.GetNumFacDevis();
  }

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

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ openActionModal: true });
  };

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.checked });
  };
  render() {
    const { dvnumfac, dvraisoc, rem, clientmail } = this.state;

    let addModalClose1 = () => this.setState({ addModalShow1: false });
    let ligModalClose = () => this.setState({ ligModalShow: false });

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
              <b>Ajouter Facture</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <Card>
                <Card.Body>
                  <Row style={{ marginBottom: "-20px", marginTop: "-20px" }}>
                    <Col sm={3}>
                      <FormGroup>
                        <TextField
                          // className="card add-input"
                          id="standard-basic"
                          label="Code Facture"
                          margin="normal"
                          //variant="outlined"
                          fullWidth
                          name="codbc"
                        />
                      </FormGroup>
                    </Col>
                    <Col sm={5}></Col>

                    <Col sm={4}>
                      <FormGroup>
                        {this.state.showButtonModalPassager ? (
                          <Tooltip title="Ajouter les détails du client passager">
                            <Button
                              style={{
                                backgroundColor: "#3f51b5",
                                color: "white",
                                fontWeight: "bold",
                                width: "100%",
                                marginTop: "20px",
                                height: "40px",
                              }}
                              onClick={() =>
                                this.setState({
                                  addModalShow1: true,
                                  dvnumfac: this.props.numfac.numfac.map(
                                    (numf) => parseInt(numf.valeur, 10) + 1
                                  ),
                                  dvraisoc: this.state.raisonsocial,
                                })
                              }
                            >
                              Détails Client Passager
                            </Button>
                          </Tooltip>
                        ) : null}
                        {/* <AddClientPassagerModal
                          show={this.state.addModalShow1}
                          onHide={addModalClose1}
                          dvnumfac={dvnumfac}
                          dvraisoc={dvraisoc}
                        /> */}
                      </FormGroup>
                    </Col>
                  </Row>

                  {/* <Row style={{ marginBottom: "-15px" }}>
                                        <Col sm={4}>
                                            <Label><b>Chercher client par:</b></Label>
                                        </Col>
                                    </Row> */}

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
                    <Col sm={4}>
                      <FormGroup>
                        {this.state.gilad ? (
                          // <Autocomplete
                          //     id="include-input-in-list"
                          //     includeInputInList
                          //     className="ajouter-client-input"
                          //     options={this.props.clients.clients}
                          //     getOptionLabel={option => option.codcli}
                          //     onChange={(event, getOptionLabel) => {
                          //         getOptionLabel
                          //             ? this.setState({
                          //                 raisonsocial: getOptionLabel.raisoc,
                          //                 remiseg: getOptionLabel.remise,
                          //                 codeclient: getOptionLabel.codcli,
                          //                 categoriefiscale: getOptionLabel.catfisc,
                          //                 btnEnable: true,
                          //                 showTimbre: getOptionLabel.timbre,
                          //                 showForfitaire: getOptionLabel.regimecli,
                          //                 showButtonModalPassager:
                          //                     getOptionLabel.passager,
                          //                 cemail: getOptionLabel.email
                          //             })
                          //             : this.setState({
                          //                 raisonsocial: "",
                          //                 remiseg: 0,
                          //                 codeclient: "",
                          //                 categoriefiscale: "",
                          //                 btnEnable: false,
                          //                 showTimbre: false,
                          //                 showForfitaire: 0,
                          //                 showButtonModalPassager: false
                          //             });
                          //     }}
                          <Autocomplete
                            id="include-input-in-list"
                            includeInputInList
                            className="ajouter-client-input"
                            options={this.props.clients.clients}
                            getOptionLabel={(option) => option.title}
                            onChange={(event, getOptionLabel) => {
                              getOptionLabel
                                ? this.setState({
                                    raisonsocial: getOptionLabel.title,
                                    remiseg: getOptionLabel.userId,
                                    codeclient: getOptionLabel.id,
                                    categoriefiscale: getOptionLabel.userId,
                                    btnEnable: true,
                                    showTimbre: getOptionLabel.completed,
                                    showForfitaire: getOptionLabel.userId,
                                    showButtonModalPassager:
                                      getOptionLabel.completed,
                                    cemail: getOptionLabel.title,
                                  })
                                : this.setState({
                                    raisonsocial: "",
                                    remiseg: 0,
                                    codeclient: "",
                                    categoriefiscale: "",
                                    btnEnable: false,
                                    showTimbre: false,
                                    showForfitaire: 0,
                                    showButtonModalPassager: false,
                                  });
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Code client"
                                margin="normal"
                                //variant="outlined"
                                fullWidth
                              />
                            )}
                          />
                        ) : (
                          // <Autocomplete
                          //     id="include-input-in-list"
                          //     includeInputInList
                          //     className="ajouter-client-input"
                          //     options={this.props.clients.clients}
                          //     getOptionLabel={option => option.raisoc}
                          //     onChange={(event, getOptionLabel) => {
                          //         getOptionLabel
                          //             ? this.setState({
                          //                 raisonsocial: getOptionLabel.raisoc,
                          //                 remiseg: getOptionLabel.remise,
                          //                 codeclient: getOptionLabel.codcli,
                          //                 categoriefiscale: getOptionLabel.catfisc,
                          //                 btnEnable: true,
                          //                 showTimbre: getOptionLabel.timbre,
                          //                 showForfitaire: getOptionLabel.regimecli,
                          //                 showButtonModalPassager:
                          //                     getOptionLabel.passager,
                          //                 cemail: getOptionLabel.email
                          //             })
                          //             : this.setState({
                          //                 raisonsocial: "",
                          //                 remiseg: 0,
                          //                 codeclient: "",
                          //                 categoriefiscale: "",
                          //                 btnEnable: false,
                          //                 showTimbre: false,
                          //                 showForfitaire: 0,
                          //                 showButtonModalPassager: false
                          //             });
                          //     }}
                          <Autocomplete
                            id="include-input-in-list"
                            includeInputInList
                            className="ajouter-client-input"
                            options={this.props.clients.clients}
                            getOptionLabel={(option) => option.title}
                            onChange={(event, getOptionLabel) => {
                              getOptionLabel
                                ? this.setState({
                                    raisonsocial: getOptionLabel.title,
                                    remiseg: getOptionLabel.userId,
                                    codeclient: getOptionLabel.id,
                                    categoriefiscale: getOptionLabel.userId,
                                    btnEnable: true,
                                    showTimbre: getOptionLabel.completed,
                                    showForfitaire: getOptionLabel.userId,
                                    showButtonModalPassager:
                                      getOptionLabel.completed,
                                    cemail: getOptionLabel.title,
                                  })
                                : this.setState({
                                    raisonsocial: "",
                                    remiseg: 0,
                                    codeclient: "",
                                    categoriefiscale: "",
                                    btnEnable: false,
                                    showTimbre: false,
                                    showForfitaire: 0,
                                    showButtonModalPassager: false,
                                  });
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Raison sociale"
                                margin="normal"
                                //variant="outlined"
                                fullWidth
                              />
                            )}
                          />
                        )}
                      </FormGroup>
                    </Col>

                    <Col sm={4}>
                      {this.state.gilad ? (
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
                      ) : (
                        <FormGroup>
                          <TextField
                            id="standard-basic"
                            label="Code client"
                            margin="normal"
                            //variant="outlined"
                            value={this.state.codeclient}
                            fullWidth
                            name="codecli"
                            disabled
                          />
                        </FormGroup>
                      )}
                    </Col>
                  </Row>

                  <Row>
                    <Col sm={4}>
                      <TextField
                        id="standard-basic"
                        label="Date"
                        margin="normal"
                        //variant="outlined"
                        type="date"
                        fullWidth
                        name="remise"
                        defaultValue={this.state.defaultdate}
                      />
                    </Col>

                    <Col sm={2}>
                      <TextField
                        id="standard-basic"
                        label="Cat Fiscale"
                        margin="normal"
                        //variant="outlined"
                        fullWidth
                        name="categoriefiscale"
                        value={this.state.categoriefiscale}
                      />
                    </Col>

                    <Col sm={2}>
                      <TextField
                        id="standard-basic"
                        label="Remise Globale %"
                        margin="normal"
                        //variant="outlined"
                        fullWidth
                        name="remise"
                        value={this.state.remiseg}
                      />
                    </Col>

                    <Col sm={2}>
                      <FormGroup style={{ marginTop: "20px" }}>
                        {this.state.showTimbre ? (
                          <Alert
                            style={{
                              width: "100%",
                              textAlign: "center",
                              fontSize: "12px",
                            }}
                            variant={"success"}
                          >
                            <b style={{ marginTop: "-10px" }}></b>Timbre✔
                          </Alert>
                        ) : null}
                      </FormGroup>
                    </Col>

                    <Col sm={2}>
                      <FormGroup style={{ marginTop: "20px" }}>
                        {this.state.showForfitaire === 1 ? (
                          <Alert
                            style={{
                              width: "100%",
                              textAlign: "center",
                              fontSize: "12px",
                            }}
                            variant={"success"}
                          >
                            <b style={{ marginTop: "-10px" }}></b>Forfitaire
                          </Alert>
                        ) : null}
                      </FormGroup>
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

                            <LigFactureArticle
                              submitHandler={this.submitHandler}
                              show={this.state.ligModalShow}
                              onHide={ligModalClose}
                              rem={rem}
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <div className="tab28">
                        <table>
                          <thead
                            style={{ textAlign: "center", fontSize: "12px" }}
                          >
                            <tr>
                              <th>Article</th>
                              <th>Désignation</th>
                              <th>Quantité</th>
                              <th>Unité</th>
                              <th>PU HT</th>
                              <th>Fodec</th>
                              <th>Remise</th>
                              <th>TVA</th>
                              <th>TotalHT</th>
                              <th>PUNet</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.tab.map((t) => (
                              <tr style={{ textAlign: "center" }}>
                                <td>{t.codearticle}</td>
                                <td style={{ fontSize: "12px" }}>{t.des}</td>
                                <td>{t.qte}</td>
                                <td>{t.unite}</td>
                                <td>{t.puht}</td>
                                <td>
                                  {t.faudec === "A" ? (
                                    <span>✔</span>
                                  ) : (
                                    <span>Ø</span>
                                  )}
                                </td>
                                <td>{t.remisea}</td>
                                <td>{t.tva}</td>
                                <td>{t.totalht}</td>
                                <td>{t.puttcnet}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        {/* <Table>
                                                <Thead style={{ textAlign: "center" }}>
                                                    <Tr>
                                                        <Th style={{ width: "10%" }}>Article</Th>
                                                        <Th style={{ width: "20%" }}>Dés</Th>
                                                        <Th style={{ width: "10%" }}>Quantité</Th>
                                                        <Th style={{ width: "10%" }}>Unité</Th>
                                                        <Th style={{ width: "10%" }}>PU HT</Th>
                                                        <Th style={{ width: "7%" }}>Fodec</Th>
                                                        <Th style={{ width: "5%" }}>Remise</Th>
                                                        <Th style={{ width: "5%" }}>TVA</Th>
                                                        <Th style={{ width: "10%" }}>Total HT</Th>
                                                        <Th style={{ width: "13%" }}>PUTTC Net</Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody style={{ textAlign: "center" }}>
                                                    {this.state.tab.map(t => (
                                                        <Tr>
                                                            <Td>{t.codearticle}</Td>
                                                            <Td>{t.des}</Td>
                                                            <Td>{t.qte}</Td>
                                                            <Td>{t.unite}</Td>
                                                            <Td>{t.puht}</Td>
                                                            <Td>
                                                                {t.faudec === "A" ? (
                                                                    <span>✔</span>
                                                                ) : (
                                                                        <span>Ø</span>
                                                                    )}
                                                            </Td>
                                                            <Td>{t.remisea}</Td>
                                                            <Td>{t.tva}</Td>
                                                            <Td>{t.totalht}</Td>
                                                            <Td>{t.puttcnet}</Td>
                                                        </Tr>
                                                    ))}
                                                </Tbody>
                                            </Table> */}
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
                      <p style={{ color: "grey", marginBottom: "-5px" }}>
                        Total HT Brut
                      </p>
                      <p style={{ color: "black" }}>
                        {roundTo(this.state.totalhtbrut, 3)}
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
                        {roundTo(this.state.sumremisearticle, 3)}
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
                        {roundTo(this.state.totaltva, 3)}
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
                      <p style={{ color: "grey", marginBottom: "-5px" }}>
                        Total HT Net
                      </p>
                      <p style={{ color: "black" }}>
                        {roundTo(this.state.totalhtnet, 3)}
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
                        {roundTo(this.state.remiseglobal, 3)}
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
                        {roundTo(this.state.totaltva, 3)}
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
                        {roundTo(this.state.netapayer, 3)}
                      </p>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
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
    SelectClient: () => dispatch(SelectClient()),
    GetNumFacDevis: () => dispatch(GetNumFacDevis()),
    SelectArticle: () => dispatch(SelectArticle()),
  };
}

function mapStateToProps(state) {
  return {
    clients: state.clients,
    numfac: state.numfac,
    articles: state.articles,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBLModal);
