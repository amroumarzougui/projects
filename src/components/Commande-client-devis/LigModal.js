import React, { Component } from "react";
import { Modal, Card } from "react-bootstrap";
import "../styling/Styles.css";
import { Input, Label, FormGroup, Col, Row, Table } from "reactstrap";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { SelectArticle } from "../../redux/actions/GetArticles";
import { TextField, Fab, IconButton } from "@material-ui/core";
import "../styling/Styling.scss";
import Center from "react-center";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import EditArticleModal from "./EditArticleModal";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import Checkbox from "@material-ui/core/Checkbox";
import EditIcon from "@material-ui/icons/Edit";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import "./ss.scss";

const roundTo = require("round-to");

// import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
// import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

class LigModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codearticle: "",
      qte: "",
      totalht: 0,
      des: "",
      unite: "",
      puht: 0,
      remisea: 0,
      tva: 0,
      puttcnet: 0,
      faudec: "N",
      tab: [],
      totalqte: 0,
      sumremisearticle: 0,
      totalhtbrut: 0,
      totaltva: 0,
      totalhtnet: 0,
      remiseglobal: 0,
      netapayer: 0,
      snackbaropen: false,
      snackbarfail: false,
      editModalShow: false,
      qtte: 0,
      btnEnabled: false,
      gilad: true,
      snackbarmsg: ",",
      numlig: 0,
      artligs: [],
    };
  }

  componentDidMount() {
    this.props.SelectArticle();
    this.GetSameLig();
  }

  snackbarClose = (event) => {
    this.setState({ snackbaropen: false });
  };

  snackbarFailClose = (event) => {
    this.setState({ snackbarfail: false });
  };

  qteHandler = (event) => {
    console.log(typeof parseInt(event.target.value));
    console.log(typeof this.state.totalqte);

    const toti = roundTo(event.target.value * this.state.puht, 3);

    this.setState({
      qte: event.target.value,
      puttcnet: roundTo(
        parseFloat(this.state.puht) +
          parseFloat(this.state.puht) * (parseFloat(this.state.tva) / 100),
        3
      ),
      totalht: toti,
    });
  };

  submitHandlers = (event) => {
    event.preventDefault();

    //////////////////////////// ligbcdvcli submit ////////////////////

    fetch(
      `http://192.168.1.100:81/api/LigBCDV?numfac=${this.props.numfaccc}
      &typfac=DV
      &numlig=${this.state.numlig}
      &codart=${this.state.codearticle}
      &desart=${this.state.des}
      &quantite=${this.state.qte}
      &priuni=${this.state.puht}
      &remise=${this.state.remisea}
      &tautva=${this.state.tva}
      &fodart=${this.state.faudec}
      &datfac=${this.props.dateee}
      &unite=${this.state.unite}
      &totalht=${this.state.totalht}
      &puttcnet=${this.state.puttcnet}`,
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
          this.setState({ snackbaropen: true, snackbarmsg: result });
          console.log(result);
          this.GetSameLig();
        },
        (error) => {
          this.setState({ snackbaropen: true, snackbarmsg: "failed" });
        }
      );

    this.setState({
      codearticle: "",
      qte: "",
      totalht: 0,
      des: "",
      unite: "",
      //  puht: "",
      remisea: 0,
      tva: 0,
      puttcnet: 0,
      faudec: "N",
      numlig: parseInt(this.state.numlig) + 10,
    });
  };

  GetSameLig = () => {
    fetch(
      `http://192.168.1.100:81/api/LigBCDV?type=DV&num=${this.props.numfaccc}`
    )
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          artligs: data,
          totalqte: data && data.reduce((a, v) => a + parseInt(v.quantite), 0),
          sumremisearticle:
            data &&
            data.reduce(
              (a, v) => a + (parseInt(v.quantite) * v.priuni * v.remise) / 100,
              0
            ),
          totalhtbrut:
            data &&
            data.reduce((a, v) => a + parseInt(v.quantite) * v.priuni, 0),
          totaltva:
            data &&
            data.reduce(
              (a, v) =>
                a +
                parseInt(v.quantite) *
                  v.priuni *
                  ((100 - v.remise) / 100) *
                  (v.tautva / 100),
              0
            ),
          totalhtnet:
            data &&
            data.reduce(
              (a, v) => a + v.totalht * ((100 - this.props.rem) / 100),
              0
            ),
          remiseglobal:
            data &&
            data.reduce((a, v) => a + v.totalht * (this.props.rem / 100), 0),
          netapayer:
            data &&
            data.reduce(
              (a, v) =>
                a +
                (v.totalht * ((100 - this.props.rem) / 100) +
                  v.quantite *
                    v.priuni *
                    ((100 - v.remise) / 100) *
                    (v.tautva / 100)),
              0
            ),
          //  snackbaropen: true,
          btnEnabled: true,
        })
      );
  };

  onCellChange = (event) => {
    this.setState({ codearticle: event.target.value });
  };

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.checked });
  };

  deleteRow = (index) => {
    if (window.confirm("Voulez vous supprimer cette ligne d'article ?")) {
      fetch(
        `http://192.168.1.100:81/api/LigBCDV/` +
          this.props.numfaccc +
          `?numl=${index}`,
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
          this.setState({ snackbarfail: true, snackbarmsg: result });
          this.GetSameLig();
          console.log(result);
        });
    }

    this.setState({
      numlig: parseInt(this.state.numlig) - 1,
    });
  };

  render() {
    let editModalClose = () => this.setState({ editModalShow: false });

    console.log(`totalht=${this.state.totalht} ++25`);

    console.log(this.state.puht);

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
          open={this.state.snackbarfail}
          autoHideDuration={2000}
          onClose={this.snackbarFailClose}
          message={<span id="message-id"> {this.state.snackbarmsg} </span>}
          action={[
            <IconButton
              key="close"
              color="inherit"
              onClick={this.snackbarFailClose}
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
          <Modal.Header closeButton style={{ color: "#00087E" }}>
            <Modal.Title id="contained-modal-title-vcenter">
              <b>Articles</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: "#fff" }}>
            <Row>
              <Col>
                <Card>
                  <Card.Body>
                    <form onSubmit={this.submitHandlers}>
                      <Row form>
                        <Col sm={4}>
                          <FormGroup>
                            <Label>Chercher article par :</Label>
                            <Typography component="div">
                              <Grid
                                component="label"
                                container
                                alignItems="center"
                                spacing={1}
                              >
                                <Grid item>Désignation</Grid>
                                <Grid item>
                                  <Switch
                                    color="primary"
                                    checked={this.state.gilad}
                                    onChange={this.handleChange("gilad")}
                                    value="gilad"
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
                              <Autocomplete
                                id="include-input-in-list"
                                includeInputInList
                                className="ajouter-client-input"
                                options={this.props.articles.articles}
                                getOptionLabel={(option) => option.codart}
                                onChange={(event, getOptionLabel) => {
                                  getOptionLabel
                                    ? this.setState({
                                        codearticle: getOptionLabel.codart,
                                        des: getOptionLabel.desart,
                                        unite: getOptionLabel.unite,
                                        puht: getOptionLabel.PUDHT,
                                        remisea: getOptionLabel.remise,
                                        tva: getOptionLabel.tautva,
                                        faudec: getOptionLabel.typfodec,
                                      })
                                    : this.setState({
                                        codearticle: "",
                                        totalht: 0,
                                        des: "",
                                        unite: "",
                                        puht: "",
                                        remisea: 0,
                                        tva: 0,
                                        faudec: "N",
                                      });
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Code article"
                                    margin="normal"
                                    fullWidth
                                  />
                                )}
                              />
                            ) : (
                              <Autocomplete
                                id="include-input-in-list"
                                includeInputInList
                                className="ajouter-client-input"
                                options={this.props.articles.articles}
                                getOptionLabel={(option) => option.desart}
                                onChange={(event, getOptionLabel) => {
                                  getOptionLabel
                                    ? this.setState({
                                        codearticle: getOptionLabel.codart,
                                        des: getOptionLabel.desart,
                                        unite: getOptionLabel.unite,
                                        puht: getOptionLabel.PUDHT,
                                        remisea: getOptionLabel.remise,
                                        tva: getOptionLabel.tautva,
                                        faudec: getOptionLabel.typfodec,
                                      })
                                    : this.setState({
                                        codearticle: "",
                                        totalht: 0,
                                        des: "",
                                        unite: "",
                                        puht: "",
                                        remisea: 0,
                                        tva: 0,
                                        faudec: "N",
                                      });
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Désignation article"
                                    margin="normal"
                                    fullWidth
                                  />
                                )}
                              />
                            )}
                          </FormGroup>
                        </Col>
                        <FormGroup style={{ display: "none" }}>
                          <Label> code artcile</Label>
                          <Input
                            type="text"
                            value={this.state.codearticle}
                            disabled
                          />
                        </FormGroup>

                        <Col sm={4}>
                          {this.state.gilad ? (
                            <FormGroup>
                              <TextField
                                id="standard-basic"
                                label="Désignation"
                                value={this.state.des}
                                disabled
                                margin="normal"
                                fullWidth
                              />
                            </FormGroup>
                          ) : (
                            <FormGroup>
                              <TextField
                                id="standard-basic"
                                label="Code article"
                                value={this.state.codearticle}
                                disabled
                                margin="normal"
                                fullWidth
                              />
                            </FormGroup>
                          )}
                        </Col>
                      </Row>
                      <Row form>
                        <Col sm={3}>
                          <FormGroup>
                            {this.state.des === "" ? (
                              <TextField
                                id="standard-basic"
                                label="Quantité"
                                type="number"
                                disabled
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                style={{ marginTop: "0px" }}
                                margin="normal"
                                fullWidth
                                required
                              />
                            ) : (
                              <TextField
                                id="standard-basic"
                                label="Quantité"
                                type="number"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                style={{ marginTop: "0px" }}
                                value={this.state.qte}
                                onChange={this.qteHandler}
                                margin="normal"
                                fullWidth
                                required
                              />
                            )}
                          </FormGroup>
                        </Col>

                        <Col sm={3}>
                          <FormGroup>
                            <TextField
                              id="standard-basic"
                              label="Unité"
                              value={this.state.unite}
                              fullWidth
                              disabled
                            />
                          </FormGroup>
                        </Col>

                        <Col sm={3}>
                          <FormGroup>
                            <TextField
                              id="standard-basic"
                              label="PU HT"
                              // value="100.0"
                              value={this.state.puht}
                              fullWidth
                              name="puhtt"
                            />
                          </FormGroup>
                        </Col>

                        <Col sm={3}>
                          <FormGroup>
                            <TextField
                              id="standard-basic"
                              label="Remise %"
                              value={this.state.remisea}
                              fullWidth
                              disabled
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row form>
                        <Col sm={3}>
                          <FormGroup>
                            <TextField
                              id="standard-basic"
                              label="TVA"
                              value={this.state.tva}
                              fullWidth
                              disabled
                            />
                          </FormGroup>
                        </Col>
                        <Col sm={3}>
                          <FormGroup>
                            <TextField
                              id="standard-basic"
                              label="Total HT"
                              value={this.state.totalht}
                              name="toti"
                              fullWidth
                              disabled
                            />
                          </FormGroup>
                        </Col>

                        <Col sm={3}>
                          <FormGroup>
                            <TextField
                              id="standard-basic"
                              label="PU TTC Net"
                              value={this.state.puttcnet}
                              fullWidth
                              disabled
                            />
                          </FormGroup>
                        </Col>

                        <Col sm={3}>
                          <FormGroup
                            style={{ marginTop: "10px", marginLeft: "10px" }}
                          >
                            <Label> Fodec </Label>
                            {this.state.faudec === "A" ? (
                              <Checkbox
                                defaultChecked
                                value="secondary"
                                color="primary"
                                inputProps={{
                                  "aria-label": "secondary checkbox",
                                }}
                              />
                            ) : (
                              <Label>
                                <Checkbox
                                  disabled
                                  value="disabled"
                                  inputProps={{
                                    "aria-label": "disabled checkbox",
                                  }}
                                />
                              </Label>
                            )}
                          </FormGroup>
                        </Col>
                      </Row>
                      {this.state.des === "" ? (
                        <Center>
                          <Button
                            disabled
                            style={{ width: "250px" }}
                            variant="contained"
                            color="primary"
                            type="submit"
                          >
                            Ajouter
                          </Button>
                        </Center>
                      ) : (
                        <Center>
                          <Button
                            style={{ width: "250px" }}
                            variant="contained"
                            color="primary"
                            type="submit"
                          >
                            Ajouter
                          </Button>
                        </Center>
                      )}
                    </form>
                  </Card.Body>
                </Card>

                <Card style={{ marginTop: "10px" }}>
                  <Card.Body>
                    {/* <div className="lig-table"> */}
                    <div className="tab28">
                      <table style={{ marginTop: "10px" }}>
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
                            <th></th>
                          </tr>
                        </thead>
                        <tbody style={{ textAlign: "center" }}>
                          {this.state.artligs.map((t, i) => (
                            <tr key={i}>
                              <td>{t.codart}</td>
                              <td style={{ fontSize: "12px" }}>{t.desart}</td>
                              <td>{t.quantite}</td>
                              <td>{t.unite}</td>
                              <td>{t.priuni}</td>
                              <td>
                                {t.fodart === "A" ? (
                                  <span>✔</span>
                                ) : (
                                  <span>Ø</span>
                                )}
                              </td>
                              <td>{t.remise}</td>
                              <td>{t.tautva}</td>
                              <td>{t.totalht}</td>
                              <td>{t.puttcnet}</td>

                              <td>
                                <Tooltip title="Supprimer cet article">
                                  <Fab size="small">
                                    <DeleteIcon
                                      style={{}}
                                      onClick={() => this.deleteRow(t.numlig)}
                                    />
                                  </Fab>
                                </Tooltip>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <EditArticleModal
                        show={this.state.editModalShow}
                        onHide={editModalClose}
                        qtte={this.state.qtte}
                      />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            {!this.state.btnEnabled ? (
              <Button disabled variant="contained" style={{ width: "30%" }}>
                Enregistrer
              </Button>
            ) : (
              <Button
                variant="contained"
                style={{
                  backgroundColor: "rgb(0, 8, 126)",
                  color: "white",
                  width: "30%",
                }}
                onClick={() => {
                  this.props.submitHandler(
                    this.state.tab,
                    this.state.artligs,
                    this.state.totalqte,
                    this.state.sumremisearticle,
                    this.state.totalhtbrut,
                    this.state.totaltva,
                    this.state.totalhtnet,
                    this.state.remiseglobal,
                    this.state.netapayer,
                    this.state.btnEnabled
                  );
                  this.props.onHide();
                }}
              >
                Enregistrer
              </Button>
            )}
          </Modal.Footer>
        </Modal>
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
    articles: state.articles,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LigModal);
