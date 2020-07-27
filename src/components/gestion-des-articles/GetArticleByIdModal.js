import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import "../styling/Styles.css";
import {
  TextField,
  CardHeader,
  Grid,
  Paper,
  Divider,
  Snackbar,
  IconButton,
} from "@material-ui/core";
import { Input, Label, FormGroup, Col, Row, Table } from "reactstrap";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { Button } from "reactstrap";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Alert } from "reactstrap";
import SpeedDialArticle from "./SpeedDialArticle";

import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import PrintIcon from "@material-ui/icons/Print";
import EditIcon from "@material-ui/icons/Edit";
import SettingsIcon from "@material-ui/icons/Settings";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import ModifierArticleModal from "./ModifierArticleModal";
import ReactToPrint from "react-to-print";
import Center from "react-center";
import Fab from "@material-ui/core/Fab";
import { connect } from "react-redux";
import { SelectArticle } from "../../redux/actions/GetArticles";

const actions = [
  // { icon: <PrintIcon />, name: "Imprimer" },
  // { icon: <MailOutlineIcon />, name: "Mail" },
  { icon: <EditIcon />, name: "Modifier" },
  { icon: <DeleteOutlineIcon />, name: "Supprimer" },
];

class GetArticleByIdModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tt: "dqsd",
      tableunite: [
        { libele: "KG", name: "KG" },
        { libele: "PI", name: "PI" },
      ],
      tabletva: [
        { code: 0, label: 0 },
        { code: 1, label: 6 },
        { code: 2, label: 12 },
        { code: 3, label: 18 },
        { code: 4, label: 18 },
        { code: 5, label: 29 },
        { code: 6, label: 10 },
      ],
      van: [
        { code: "V", label: "Sur Vente" },
        { code: "A", label: "Sur Achat" },
        { code: "N", label: "Sans Faudec" },
      ],
      unite: "",
      codeabarre: "",
      designation: "",
      anchorEl: null,
      open: false,
      hidden: false,
      openMailModal: false,
      openModifierModal: false,
      snackbaropen: false,
      snackbarmsg: "",
      showp: false,
    };
  }

  snackbarClose = () => {
    this.setState({ snackbaropen: false });
  };

  codeabarrechange = (event) => {
    this.setState({
      codeabarre: event.target.value,
    });
  };

  showprix = (event) => {
    this.setState({
      showp: !this.state.showp,
    });
  };

  designationchange = (event) => {
    this.setState({
      designation: event.target.value,
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    window.alert(this.state.unite);
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose1 = () => {
    this.setState({ anchorEl: null });
  };

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

  affiche = () => {
    window.alert(this.state.totalqte);
  };

  deletearticle(articleid) {
    if (window.confirm("êtes-vous sûr de vouloir supprimer cet article?")) {
      fetch(`http://192.168.1.100:81/api/ARTICLEs?codartt=` + articleid, {
        method: "DELETE",
        header: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            this.props.onHide();
            this.props.SelectArticle();

            this.setState({ snackbaropen: true, snackbarmsg: result });
            console.log(result);
            window.location.reload();
          },
          (error) => {
            this.setState({ snackbaropen: true, snackbarmsg: "failed" });
          }
        );
    }
  }

  render() {
    const open = Boolean(this.state.anchorEl);
    const id = open ? "simple-popover" : undefined;

    let emailModalClose = () => this.setState({ openMailModal: false });
    let modifierModalClose = () => this.setState({ openModifierModal: false });

    return (
      <div className="container">
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={this.state.snackbaropen}
          autoHideDuration={3000}
          onClose={this.snackbarClose}
          message={this.state.snackbarmsg}
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
              <b>Détails Article</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <Grid item xs={12} style={{ marginTop: "10px", width: "100%" }}>
                <Grid container justify="center">
                  <Grid item style={{ width: "100%" }}>
                    <Paper>
                      <Row>
                        <Col
                          sm={9}
                          style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "column",
                            textAlign: "center",
                          }}
                        >
                          {this.props.designationarticle === "" ? (
                            <h3>--</h3>
                          ) : (
                            <h3> {this.props.designationarticle} </h3>
                          )}
                          <p style={{ color: "gray", fontSize: "larger" }}>
                            {this.props.codearticle}
                          </p>
                        </Col>

                        <Col
                          sm={3}
                          style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "column",
                          }}
                        >
                          <span
                            style={{
                              color: "red",
                              fontSize: "larger",
                              fontWeight: "bold",
                            }}
                          >
                            Stock
                          </span>
                          <span
                            style={{ fontWeight: "bold", fontSize: "20px" }}
                          >
                            {this.props.stockarticle}
                          </span>
                        </Col>
                      </Row>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>

              <Row sm={12} style={{ marginTop: "20px" }}>
                <Col sm={6}>
                  <Grid container justify="center">
                    <Grid item style={{ width: "100%" }}>
                      <Paper
                        style={{
                          width: "100%",
                        }}
                      >
                        <Row sm={12}>
                          <Col sm={7}>
                            <Label style={{ fontWeight: "bold" }}>
                              Code à barre
                            </Label>
                          </Col>
                          <Col sm={5}>
                            {this.props.codeabarrearticle === "" ? (
                              <p>--</p>
                            ) : (
                              <p>{this.props.codeabarrearticle}</p>
                            )}
                          </Col>
                        </Row>

                        <Row sm={12}>
                          <Col sm={7}>
                            <Label style={{ fontWeight: "bold" }}>
                              PU Vente HT
                            </Label>
                          </Col>
                          <Col sm={5}>
                            {this.props.pudht === "" ? (
                              <p>--</p>
                            ) : (
                              <p>{Number(this.props.pudht).toFixed(3)}</p>
                            )}
                          </Col>
                        </Row>

                        <Row sm={12}>
                          <Col sm={7}>
                            <Label style={{ fontWeight: "bold" }}>
                              Taux TVA
                            </Label>
                          </Col>
                          <Col sm={5}>
                            {this.props.tvaarticle === "" ? (
                              <p>--</p>
                            ) : (
                              <p>{Number(this.props.tvaarticle).toFixed(2)}</p>
                            )}
                          </Col>
                        </Row>

                        <Row sm={12}>
                          <Col sm={7}>
                            <Label style={{ fontWeight: "bold" }}>
                              PU Vente TTC
                            </Label>
                          </Col>
                          <Col sm={5}>
                            {this.props.puventettc === "" ? (
                              <p>--</p>
                            ) : (
                              <p>{Number(this.props.puventettc).toFixed(3)}</p>
                            )}
                          </Col>
                        </Row>
                      </Paper>
                    </Grid>
                  </Grid>
                </Col>
                <Col sm={6}>
                  <Grid container justify="center">
                    <Grid item style={{ width: "100%" }}>
                      <Paper
                        style={{
                          width: "100%",
                        }}
                      >
                        <Row sm={12}>
                          <Col sm={7}>
                            <Label style={{ fontWeight: "bold" }}>
                              Famille
                            </Label>
                          </Col>
                          <Col sm={5}>
                            {this.props.famillearticle === "" ? (
                              <p>--</p>
                            ) : (
                              <p>{this.props.famillearticle}</p>
                            )}
                          </Col>
                        </Row>

                        <Row sm={12}>
                          <Col sm={7}>
                            <Label style={{ fontWeight: "bold" }}>
                              Sous Famille
                            </Label>
                          </Col>
                          <Col sm={5}>
                            {this.props.sousfamillearticle === "" ? (
                              <p>--</p>
                            ) : (
                              <p>{this.props.sousfamillearticle}</p>
                            )}
                          </Col>
                        </Row>

                        <Row sm={12}>
                          <Col sm={7}>
                            <Label style={{ fontWeight: "bold" }}>Unité</Label>
                          </Col>
                          <Col sm={5}>
                            {this.props.unitearticle === "" ? (
                              <p>--</p>
                            ) : (
                              <p>{this.props.unitearticle}</p>
                            )}
                          </Col>
                        </Row>

                        <Row sm={12}>
                          <Col sm={7}>
                            <Label style={{ fontWeight: "bold" }}>
                              Reférence Fournisseur
                            </Label>
                          </Col>
                          <Col sm={5}>
                            {this.props.reffrsarticle === "" ||
                            this.props.reffrsarticle === " " ? (
                              <p>--</p>
                            ) : (
                              <p>{this.props.reffrsarticle}</p>
                            )}
                          </Col>
                        </Row>
                      </Paper>
                    </Grid>
                  </Grid>
                </Col>
              </Row>

              <Row style={{ marginTop: "15px" }}>
                <Col sm={6}>
                  <div>
                    <Button
                      style={{
                        width: "50%",
                        height: "50px",
                        marginBottom: "5px",
                      }}
                      aria-describedby={id}
                      variant="contained"
                      color="primary"
                      // onClick={this.handleClick}
                      onClick={this.showprix}
                    >
                      <MonetizationOnIcon /> P.U.R
                    </Button>
                  </div>
                </Col>

                <Col sm={3}>
                  {this.props.typefodecarticle === "V" ? (
                    <Alert
                      color={"success"}
                      style={{
                        width: "100%",
                        height: "50px",
                        fontSize: "15px",
                      }}
                    >
                      Fodec sur Vente
                    </Alert>
                  ) : this.props.typefodecarticle === "A" ? (
                    <Alert
                      color={"success"}
                      style={{
                        width: "100%",
                        height: "50px",
                        fontSize: "15px",
                      }}
                    >
                      Fodec sur Achat
                    </Alert>
                  ) : (
                    <Alert
                      color={"danger"}
                      style={{
                        width: "100%",
                        height: "50px",
                        fontSize: "15px",
                      }}
                    >
                      Sans Fodec
                    </Alert>
                  )}
                </Col>

                <Col sm={3}>
                  {this.props.typedcarticle === "V" ? (
                    <Alert
                      color={"success"}
                      style={{
                        width: "100%",
                        height: "50px",
                        fontSize: "15px",
                      }}
                    >
                      D.C sur Vente
                    </Alert>
                  ) : this.props.typedcarticle === "A" ? (
                    <Alert
                      color={"success"}
                      style={{
                        width: "100%",
                        height: "50px",
                        fontSize: "15px",
                      }}
                    >
                      D.C sur Achat
                    </Alert>
                  ) : (
                    <Alert
                      color={"danger"}
                      style={{
                        width: "100%",
                        height: "50px",
                        fontSize: "15px",
                      }}
                    >
                      Sans D.C
                    </Alert>
                  )}
                </Col>
              </Row>
              <Divider />
              <br />
              <Row>
                <Col sm={11}>
                  {this.state.showp ? (
                    <Card style={{ backgroundColor: "#fff" }}>
                      {/* <CardHeader
                        avatar={<MonetizationOnIcon />}
                        title="Liste des prix"
                      /> */}
                      <CardContent>
                        <Row>
                          <Col
                            sm={3}
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                              flexDirection: "column",
                            }}
                          >
                            <span style={{ color: "gray", fontSize: "larger" }}>
                              P.U.R Brut HT
                            </span>
                            <span
                              style={{ fontWeight: "bold", fontSize: "20px" }}
                            >
                              {Number(this.props.purevientbrut).toFixed(3)}
                            </span>
                          </Col>

                          <Col
                            sm={3}
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                              flexDirection: "column",
                            }}
                          >
                            <span style={{ color: "gray", fontSize: "larger" }}>
                              Remise Frs (%)
                            </span>
                            <span
                              style={{ fontWeight: "bold", fontSize: "20px" }}
                            >
                              {Number(this.props.remisefrs).toFixed(2)}
                            </span>
                          </Col>

                          <Col
                            sm={3}
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                              flexDirection: "column",
                            }}
                          >
                            <span style={{ color: "gray", fontSize: "larger" }}>
                              P.U.R Net HT
                            </span>
                            <span
                              style={{ fontWeight: "bold", fontSize: "20px" }}
                            >
                              {Number(this.props.purevientnetht).toFixed(3)}
                            </span>
                          </Col>

                          <Col
                            sm={3}
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                              flexDirection: "column",
                            }}
                          >
                            <span style={{ color: "gray", fontSize: "larger" }}>
                              P.U.R Net TTC
                            </span>
                            <span
                              style={{ fontWeight: "bold", fontSize: "20px" }}
                            >
                              {Number(this.props.purevientnetttc).toFixed(3)}
                            </span>
                          </Col>
                        </Row>
                      </CardContent>
                    </Card>
                  ) : null}
                </Col>

                <Col sm={1}>
                  <div>
                    <SpeedDial
                      style={{
                        position: "absolute",
                        bottom: "0px",
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
                            // action.name == "Mail" && this.openMail();
                            action.name == "Modifier" && this.openModifier();
                            action.name == "Supprimer" &&
                              this.deletearticle(this.props.codearticle) &&
                              this.props.onHide();
                          }}
                        />
                      ))}
                      {/* {!this.state.open ? (
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
                      )} */}
                    </SpeedDial>
                    <ModifierArticleModal
                      show={this.state.openModifierModal}
                      onHide={modifierModalClose}
                      onHide01={this.props.onHide}
                      designationarticle={this.props.designationarticle}
                      codearticle={this.props.codearticle}
                      codeabarrearticle={this.props.codeabarrearticle}
                      famillearticle={this.props.famillearticle}
                      reffrsarticle={this.props.reffrsarticle}
                      remisearticle={this.props.remisearticle}
                      stockarticle={this.props.stockarticle}
                      pvttcarticle={this.props.pvttcarticle}
                      typefodecarticle={this.props.typefodecarticle}
                      typedcarticle={this.props.typedcarticle}
                      pudht={this.props.pudht}
                      unitearticles={this.props.unitearticle}
                      tvaarticle={this.props.tvaarticle}
                      sousfamillearticle={this.props.sousfamillearticle}
                      tauxdcarticle={this.props.tauxdcarticle}
                      purevientbrut={this.props.purevientbrut}
                      remisefrs={this.props.remisefrs}
                      purevientnetht={this.props.purevientnetht}
                      purevientnetttc={this.props.purevientnetttc}
                      margeprbrut={this.props.margeprbrut}
                      margeprrnet={this.props.margeprrnet}
                      puventeht={this.props.puventeht}
                      puventettc={this.props.puventettc}
                    />
                    {/* <EmailModal show={this.state.openMailModal} onHide={emailModalClose} /> */}
                  </div>
                </Col>
              </Row>
            </div>
          </Modal.Body>
        </Modal>

        {/* ////////////////////////////// print article ////////////////////////////// */}

        <div style={{ display: "none" }}>
          <div
            ref={(el) => (this.componentRef = el)}
            style={{ margin: "15px", borderStyle: "solid", height: "98%" }}
          >
            <Paper
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                textAlign: "center",
                marginTop: "120px",
              }}
            >
              <h2>
                <u>{this.props.designationarticle}</u>
              </h2>
              <p style={{ color: "gray", fontSize: "35px" }}>
                {this.props.codearticle}
              </p>
            </Paper>

            <div
              style={{
                marginLeft: "100px",
                marginRight: "100px",
                marginTop: "60px",
                fontSize: "25px",
              }}
            >
              <Paper>
                <Row>
                  <Col>
                    <Paper style={{ width: "100%" }}>
                      <Row>
                        <Col>
                          <Row style={{ marginBottom: "20px" }}>
                            <Col>Code à barre</Col>
                            <Col>{this.props.codeabarrearticle}</Col>
                          </Row>

                          <Row style={{ marginBottom: "20px" }}>
                            <Col>PU HT</Col>
                            <Col>{this.props.pudht}</Col>
                          </Row>

                          <Row style={{ marginBottom: "20px" }}>
                            <Col>TVA</Col>
                            <Col>{this.props.tvaarticle}</Col>
                          </Row>

                          <Row style={{ marginBottom: "20px" }}>
                            <Col>Remise (%)</Col>
                            <Col>{this.props.remisearticle}</Col>
                          </Row>

                          <Row style={{ marginBottom: "20px" }}>
                            <Col>Fodec</Col>
                            <Col>
                              {this.props.typefodecarticle === "V" ? (
                                <Label>Vente</Label>
                              ) : this.props.typefodecarticle === "A" ? (
                                <Label>Achat</Label>
                              ) : (
                                <Label>∅</Label>
                              )}
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Paper>
                  </Col>

                  <Col>
                    <Paper style={{ width: "100%", marginLeft: "100px" }}>
                      <Row>
                        <Col>
                          <Row style={{ marginBottom: "20px" }}>
                            <Col>Famille</Col>
                            <Col>{this.props.famillearticle}</Col>
                          </Row>

                          <Row style={{ marginBottom: "20px" }}>
                            <Col>Sous Famille</Col>
                            <Col>{this.props.sousfamillearticle}</Col>
                          </Row>

                          <Row style={{ marginBottom: "20px" }}>
                            <Col>Unité</Col>
                            <Col>{this.props.unitearticle}</Col>
                          </Row>

                          <Row style={{ marginBottom: "20px" }}>
                            <Col>Reférence Frs</Col>
                            <Col>{this.props.reffrsarticle}</Col>
                          </Row>

                          <Row style={{ marginBottom: "20px" }}>
                            <Col>D.C</Col>
                            <Col>
                              {this.props.typedcarticle === "V" ? (
                                <Label>Vente</Label>
                              ) : this.props.typedcarticle === "A" ? (
                                <Label>Achat</Label>
                              ) : (
                                <Label>∅</Label>
                              )}
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Paper>
                  </Col>
                </Row>
              </Paper>
            </div>

            <div
              style={{
                marginLeft: "100px",
                marginRight: "100px",
                marginTop: "60px",
                fontSize: "25px",
              }}
            >
              <Table
                style={{
                  textAlign: "center",
                  borderStyle: "solid",
                }}
              >
                <thead style={{ fontWeight: "bold" }}>
                  <tr>
                    <td>PU Brut HT</td>
                    <td>Remise Frs (%)</td>
                    <td>PU Net HT</td>
                    <td>PU Net TTC</td>
                    <td>Marge/ P.R Brut (%)</td>
                    <td>Marge/ P.R Net (%)</td>
                    <td>PU Vente HT</td>
                    <td>PU Vente TTC</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{this.props.purevientbrut}</td>
                    <td>{this.props.remisefrs}</td>
                    <td>{this.props.purevientnetht}</td>
                    <td>{this.props.purevientnetttc}</td>
                    <td>{this.props.margeprbrut}</td>
                    <td>{this.props.margeprrnet}</td>
                    <td>{this.props.puventeht}</td>
                    <td>{this.props.puventettc}</td>
                  </tr>
                </tbody>
              </Table>
            </div>

            <div>
              <Row style={{ margin: "100px", fontSize: "38px" }}>
                <Col
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <span style={{ color: "gray", fontSize: "larger" }}>
                    STOCK
                  </span>
                  <span style={{ fontWeight: "bold" }}>
                    {this.props.stockarticle}
                  </span>
                </Col>

                <Col
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <span style={{ color: "gray", fontSize: "larger" }}>
                    P.V TTC
                  </span>
                  <span style={{ fontWeight: "bold" }}>
                    {this.props.pvttcarticle}
                  </span>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    SelectArticle: () => dispatch(SelectArticle()),
  };
}

function mapStateToProps(state) {
  return {
    nomes: state.nomes,
    sousfamilles: state.sousfamilles,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GetArticleByIdModal);
