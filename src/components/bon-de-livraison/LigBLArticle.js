import React, { Component } from "react";
import { Modal, Card } from "react-bootstrap";
import "../styling/Styles.css";
import "./bl.scss";
import { Input, Label, FormGroup, Col, Row, Table } from "reactstrap";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { SelectArticle } from "../../redux/actions/GetArticles";
import { TextField, Fab, IconButton } from "@material-ui/core";
import "../styling/Styling.scss";
import Center from "react-center";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
// import EditArticleModal from "./EditArticleModal";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import Checkbox from "@material-ui/core/Checkbox";
import EditIcon from "@material-ui/icons/Edit";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const roundTo = require("round-to");

class LigBLArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codearticle: "",
      qte: "",
      totalht: 0,
      des: "",
      unite: "",
      puht: "",
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
      rechs: [],

      snackbarmsg: ",",
    };
  }

  componentDidMount() {
    this.props.SelectArticle();
  }

  //   enregistrer = () => {

  //     for (var i = 0; i < this.state.tab.length; i++) {
  //       fetch(
  //         `http://192.168.1.100:81/api/LigBLBRs/{ID}?numfac=20202301&typfac=BL&numlig=${i}&codart=${this.state.tab.map(
  //           (t) => t.codearticle
  //         )}&quantite=${this.state.tab.map((t) => t.qte)}&datfac=${
  //           this.props.datfac
  //         }&codtva=3&tautva=19`,
  //         {
  //           method: "POST",
  //           header: {
  //             Accept: "application/json",
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       )

  //         .then((res) => res.json())
  //         .then(
  //           (result) => {
  //             this.setState({ snackbaropen: true, snackbarmsg: result });

  //             console.log(result);
  //           },
  //           (error) => {
  //             this.setState({ snackbaropen: true, snackbarmsg: "failed" });
  //           }
  //         );
  //     }
  //   };

  articleHandlerChange = (event) => {
    fetch(`http://192.168.1.100:81/api/ARTICLEs?codartt=${event.target.value}`)
      .then((response) => response.json())
      .then((data) => this.setState({ rechs: data }));
  };

  snackbarClose = (event) => {
    this.setState({ snackbaropen: false });
  };

  snackbarFailClose = (event) => {
    this.setState({ snackbarfail: false });
  };

  qteHandler = (event) => {
    console.log(typeof parseInt(event.target.value));
    console.log(typeof this.state.totalqte);

    this.setState({
      qte: event.target.value,
      puttcnet: this.state.puht + this.state.puht * (this.state.tva / 100),
      totalht: event.target.value * this.state.puht,
    });
  };

  onCellChange = (event) => {
    this.setState({ codearticle: event.target.value });
  };

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.checked });
  };

  deleteRow = (index) => {
    var tab = [...this.state.tab];
    tab.splice(index, 1);
    const SumQte = tab && tab.reduce((a, v) => a + parseInt(v.qte), 0);
    const SumRemiseArticle =
      tab &&
      tab.reduce((a, v) => a + (parseInt(v.qte) * v.puht * v.remisea) / 100, 0);
    const SumHtBrut =
      tab && tab.reduce((a, v) => a + parseInt(v.qte) * v.puht, 0);
    const SumTva =
      tab &&
      tab.reduce(
        (a, v) =>
          a +
          parseInt(v.qte) * v.puht * ((100 - v.remisea) / 100) * (v.tva / 100),
        0
      );
    const SumHtNet =
      tab &&
      tab.reduce((a, v) => a + v.totalht * ((100 - this.props.rem) / 100), 0);
    const SumRemiseGlobale =
      tab && tab.reduce((a, v) => a + v.totalht * (this.props.rem / 100), 0);
    const SumNetAPayer =
      tab &&
      tab.reduce(
        (a, v) =>
          a +
          (v.totalht * ((100 - this.props.rem) / 100) +
            parseInt(v.qte) *
              v.puht *
              ((100 - v.remisea) / 100) *
              (v.tva / 100)),
        0
      );

    this.setState({
      tab,
      totalqte: SumQte,
      sumremisearticle: SumRemiseArticle,
      totalhtbrut: SumHtBrut,
      totaltva: SumTva,
      totalhtnet: SumHtNet,
      remiseglobal: SumRemiseGlobale,
      netapayer: SumNetAPayer,
      snackbarfail: true,
    });
  };

  submitHandlers = (event) => {
    event.preventDefault();

    const newtab = this.state.tab.concat({
      codearticle: this.state.codearticle,
      des: this.state.des,
      qte: this.state.qte,
      unite: this.state.unite,
      puht: this.state.puht,
      faudec: this.state.faudec,
      remisea: event.target.remiseea.value,
      tva: this.state.tva,
      puttcnet: this.state.puttcnet,
      totalht: this.state.totalht,
    });
    const SumQte = newtab && newtab.reduce((a, v) => a + parseInt(v.qte), 0);
    const SumRemiseArticle =
      newtab &&
      newtab.reduce(
        (a, v) => a + (parseInt(v.qte) * v.puht * v.remisea) / 100,
        0
      );
    const SumHtBrut =
      newtab && newtab.reduce((a, v) => a + parseInt(v.qte) * v.puht, 0);
    const SumTva =
      newtab &&
      newtab.reduce(
        (a, v) =>
          a +
          parseInt(v.qte) * v.puht * ((100 - v.remisea) / 100) * (v.tva / 100),
        0
      );
    const SumHtNet =
      newtab &&
      newtab.reduce(
        (a, v) => a + v.totalht * ((100 - this.props.rem) / 100),
        0
      );
    const SumRemiseGlobale =
      newtab &&
      newtab.reduce((a, v) => a + v.totalht * (this.props.rem / 100), 0);
    const SumNetAPayer =
      newtab &&
      newtab.reduce(
        (a, v) =>
          a +
          (v.totalht * ((100 - this.props.rem) / 100) +
            v.qte * v.puht * ((100 - v.remisea) / 100) * (v.tva / 100)),
        0
      );

    this.setState({
      tab: newtab,

      totalqte: SumQte,
      sumremisearticle: SumRemiseArticle,
      totalhtbrut: SumHtBrut,
      totaltva: SumTva,
      totalhtnet: SumHtNet,
      remiseglobal: SumRemiseGlobale,
      netapayer: SumNetAPayer,
      snackbaropen: true,
      btnEnabled: true,
    });

    this.setState({
      codearticle: "",
      qte: "",
      totalht: 0,
      des: "",
      unite: "",
      puht: "",
      remisea: 0,
      tva: 0,
      puttcnet: 0,
      faudec: "N",
    });
  };

  render() {
    let editModalClose = () => this.setState({ editModalShow: false });

    console.log(
      this.state.totalqte,
      `remise article =${this.state.sumremisearticle}`
    );

    return (
      <div className="container">
        <Snackbar
          open={this.state.snackbaropen}
          autoHideDuration={2000}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          onClose={this.snackbarClose}
        >
          <Alert
            style={{ height: "50px" }}
            onClose={this.snackbarClose}
            severity="success"
          >
            Article ajouté
          </Alert>
        </Snackbar>

        <Snackbar
          open={this.state.snackbarfail}
          autoHideDuration={2000}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          onClose={this.snackbarFailClose}
        >
          <Alert
            style={{ height: "50px" }}
            onClose={this.snackbarFailClose}
            severity="error"
          >
            Article supprimé
          </Alert>
        </Snackbar>

        {/* <Snackbar
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
        ></Snackbar> */}

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
                                // options={this.props.articles.articles}
                                options={this.state.rechs}
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
                                    onChange={this.articleHandlerChange}
                                  />
                                )}
                              />
                            ) : (
                              <Autocomplete
                                id="include-input-in-list"
                                includeInputInList
                                className="ajouter-client-input"
                                // options={this.props.articles.articles}
                                options={this.state.rechs}
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
                                    onChange={this.articleHandlerChange}
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
                              value={this.state.puht}
                              fullWidth
                              disabled
                            />
                          </FormGroup>
                        </Col>

                        <Col sm={3}>
                          <FormGroup>
                            <TextField
                              id="standard-basic"
                              label="Remise %"
                              defaultValue={this.state.remisea}
                              fullWidth
                              name="remiseea"
                              // disabled
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
                              label="PU TTC Net"
                              value={roundTo(this.state.puttcnet, 3)}
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
                              value={roundTo(this.state.totalht, 3)}
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
                    <div className="tabbl2">
                      <table style={{ marginTop: "10px" }}>
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
                            <th></th>
                          </tr>
                        </thead>
                        <tbody style={{ textAlign: "center" }}>
                          {this.state.tab.map((t, i) => (
                            <tr key={i}>
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

                              <td>
                                <Tooltip title="Supprimer cet article">
                                  <Fab size="small">
                                    <DeleteIcon
                                      style={{}}
                                      onClick={() => this.deleteRow(i)}
                                    />
                                  </Fab>
                                </Tooltip>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            {/* {
              // !this.state.btnEnabled ? (
              //   <Button disabled variant="contained" style={{ width: "30%" }}>
              //     Enregistrer
              //   </Button>
              // ) : (
              this.state.tab.map((t, i) => ( */}
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
                  this.state.totalqte,
                  this.state.sumremisearticle,
                  this.state.totalhtbrut,
                  this.state.totaltva,
                  this.state.totalhtnet,
                  this.state.remiseglobal,
                  this.state.netapayer,
                  this.state.btnEnabled
                );
                // this.enregistrer();
                this.props.onHide();
              }}
            >
              Enregistrer
            </Button>
            {/* ))
              // )
            } */}
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

export default connect(mapStateToProps, mapDispatchToProps)(LigBLArticle);
