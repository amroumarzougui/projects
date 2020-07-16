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
import { SelectUser } from "../../redux/actions/DevisClient";

const roundTo = require("round-to");

var curr = new Date();
curr.setDate(curr.getDate());
var date = curr.toISOString().substr(0, 10);

class ModifierLigDevis extends Component {
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
      snackbarmsg: ",",
      numlig: 0,
      artligs: [],
      numligs: [],
      defaultdate: date,
      shown: true,
      openEditModal: false,
      rechs: [],
      changeButton: false,
    };
  }
  componentDidMount() {
    this.props.SelectArticle();
    this.sameTable();
  }

  articleHandlerChange = (event) => {
    fetch(`http://192.168.1.100:81/api/ARTICLEs?codartt=${event.target.value}`)
      .then((response) => response.json())
      .then((data) => this.setState({ rechs: data }));
  };

  modifiermodification = (event) => {
    // event.preventDefault();

    const newtab = this.state.tab.concat({
      codart: this.state.codearticle,
      desart: this.state.des,
      quantite: this.state.qte,
      unite: this.state.unite,
      priuni: this.state.puht,
      remise: this.state.remisea,
      tautva: this.state.tva,
      montht: this.state.puttcnet,
      PUTTCNET: this.state.totalht,
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
      changeButton: false,
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

  submitHandler = (event) => {
    event.preventDefault();

    const newtab = this.state.tab.concat({
      codart: this.state.codearticle,
      desart: this.state.des,
      quantite: this.state.qte,
      unite: this.state.unite,
      priuni: this.state.puht,
      remise: event.target.remiseea.value,
      tautva: this.state.tva,
      montht: this.state.puttcnet,
      PUTTCNET: this.state.totalht,
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

  sameTable = () => {
    fetch(
      `http://192.168.1.100:81/api/LigBCDV?type=DV&numfac=${this.props.numfacc}`
    )
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          tab: data,
        })
      );
  };

  qteHandler = (event) => {
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

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.checked });
  };

  snackbarClose = (event) => {
    this.setState({ snackbaropen: false });
  };

  snackbarFailClose = (event) => {
    this.setState({ snackbarfail: false });
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

  ///////////// delete for modification without snackbaropende ///////////
  deleteRowMod = (index) => {
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
      btnEnabled: true,
    });
  };

  enregistrer = () => {
    ////////// first part delete ///////////////////
    fetch(
      `http://192.168.1.100:81/api/LigBCDV/${this.props.numfacc}?typfacc=DV`,
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
        // this.setState({ enrsnackbaropen: true, snackbarmsg: result });

        ///////////// second part add new table to database //////////////

        this.state.tab.map((k, index) => {
          for (var i = 0; i < this.state.tab.length; i++) {
            fetch(
              `http://192.168.1.100:81/api/LigBCDV/{ID}?numfac=${
                this.props.numfacc
              }&typfac=DV&numlig=${index + 10}&codart=${k.codart}&quantite=${
                k.quantite
              }&fodart=0&desart=${k.desart}&datfac=${
                this.props.datfac
              }&priuni=${k.priuni}&remise=${k.remise}&unite${
                k.unite
              }&codtva=3&tautva=${k.tautva}`,
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
                  //   this.setState({ enrsnackbaropen: true, snackbarmsg: result });

                  console.log(result);
                  // window.alert(result);
                },
                (error) => {
                  this.setState({
                    enrsnackbaropen: true,
                    snackbarmsg: "failed",
                  });
                }
              );
          }
        });

        //////////////////// third party /////////////////

        fetch(
          `http://192.168.1.100:81/api/LigBCDV?FAC=${this.props.numfacc}&typfacc=DV`,
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
              console.log(result);
              window.location.reload();
            },
            (error) => {
              this.setState({ snackbaropen: true, snackbarmsg: "failed" });
            }
          );
      });
  };

  render() {
    let EditModalClose = () => this.setState({ openEditModal: false });
    const {
      quantt,
      remiss,
      artid,
      totalhtt,
      puttcnett,
      numligg,
      numfacccc,
      prixunix,
    } = this.state;
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

        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={this.state.enrsnackbaropen}
          autoHideDuration={2000}
          onClose={this.enrsnackbarClose}
          message={<span id="message-id"> {this.state.snackbarmsg} </span>}
          action={[
            <IconButton
              key="close"
              color="inherit"
              onClick={this.enrsnackbarClose}
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
              <b>Modifier table des article</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card>
              <Card.Body>
                <form onSubmit={this.submitHandler}>
                  <Row form style={{ marginBottom: "-20px" }}>
                    <Col sm={8}>
                      <FormGroup>
                        <Typography component="div">
                          <Grid
                            component="label"
                            container
                            alignItems="center"
                            spacing={1}
                          >
                            <Grid>
                              <b>Chercher article par :</b>
                            </Grid>
                            &nbsp;&nbsp;
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

                    <Col sm={3}>
                      <FormGroup
                        style={{ marginTop: "10px", marginLeft: "10px" }}
                      >
                        {this.state.faudec === "A" ? (
                          <p style={{ color: "grey" }}>Fodec: ✔</p>
                        ) : null}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col sm={5}>
                      <FormGroup>
                        {this.state.changeButton ? (
                          <TextField
                            id="standard-basic"
                            label="Code Article"
                            value={this.state.codearticle}
                            disabled
                            margin="normal"
                            fullWidth
                          />
                        ) : this.state.gilad ? (
                          <Autocomplete
                            id="include-input-in-list"
                            includeInputInList
                            className="ajouter-client-input"
                            //   options={this.props.articles.articles}
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
                            //   options={this.props.articles.articles}
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

                    <Col sm={5}>
                      {this.state.changeButton ? (
                        <TextField
                          id="standard-basic"
                          label="Désignation"
                          value={this.state.des}
                          disabled
                          margin="normal"
                          fullWidth
                        />
                      ) : this.state.gilad ? (
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

                    <Col sm={2}>
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
                            style={{ marginTop: "16px" }}
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
                            style={{ marginTop: "16px" }}
                            value={this.state.qte}
                            onChange={this.qteHandler}
                            margin="normal"
                            fullWidth
                            required
                          />
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col sm={2}>
                      <FormGroup>
                        <TextField
                          id="standard-basic"
                          label="Unité"
                          value={this.state.unite}
                          fullWidth
                          disabled
                        />
                      </FormGroup>

                      <FormGroup>
                        {this.state.numligs.map((t) => (
                          <TextField
                            id="standard-basic"
                            label="numlig"
                            value={t.Column1 + 1}
                            name="numligg"
                            fullWidth
                            disabled
                            style={{ display: "none" }}
                          />
                        ))}
                      </FormGroup>
                    </Col>

                    <Col sm={2}>
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

                    <Col sm={2}>
                      <FormGroup>
                        <TextField
                          id="standard-basic"
                          label="Remise %"
                          value={this.state.remisea}
                          fullWidth
                          disabled
                          name="remiseea"
                        />
                      </FormGroup>
                    </Col>
                    <Col sm={2}>
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
                    <Col sm={2}>
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

                    <Col sm={2}>
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
                  </Row>
                  {this.state.changeButton ? (
                    <Center>
                      <Button
                        style={{ width: "320px" }}
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          this.modifiermodification();
                        }}
                      >
                        Enregistrer les modifications
                      </Button>
                    </Center>
                  ) : this.state.des === "" ? (
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
                <div className="tabd28">
                  <table style={{ marginTop: "10px" }}>
                    <thead style={{ fontSize: "12px", textAlign: "center" }}>
                      <tr>
                        <th>Code</th>
                        <th style={{ width: "40%" }}>Désignation</th>
                        <th>Quantité</th>
                        <th>PUHT</th>
                        <th>Remise</th>
                        <th>TVA</th>
                        <th>TotalHT</th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody
                      style={{
                        overflowY: "auto",
                        display: "block",
                        maxHeight: "10em",
                      }}
                    >
                      {this.state.tab.map((t, i) => (
                        <tr key={i}>
                          <td>
                            <span>{t.codart}</span>
                          </td>
                          <td style={{ fontSize: "12px", width: "40%" }}>
                            {t.desart}
                          </td>
                          <td>
                            <span>{t.quantite}</span>
                          </td>
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
                            <span>{Number(t.montht).toFixed(3)}</span>
                          </td>
                          <td>
                            <Tooltip title="Modifier cet article">
                              <Fab size="small">
                                <EditIcon
                                  style={{}}
                                  onClick={() => {
                                    this.setState({
                                      codearticle: t.codart,
                                      des: t.desart,
                                      unite: t.unite,
                                      puht: t.priuni,
                                      remisea: t.remise,
                                      tva: t.tautva,
                                      faudec: t.typfodec,
                                      qte: t.quantite,
                                      changeButton: true,
                                    });
                                    this.deleteRowMod(i);
                                  }}
                                />
                              </Fab>
                            </Tooltip>
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
                  this.enregistrer();
                  this.props.onHide();
                  this.props.onHide01();
                  window.alert("Modification enregistré");
                  this.props.SelectUser();
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
    SelectUser: () => dispatch(SelectUser()),
  };
}

function mapStateToProps(state) {
  return {
    articles: state.articles,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModifierLigDevis);
