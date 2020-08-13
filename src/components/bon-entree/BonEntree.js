import React, { Component } from "react";
import { Row, Col, Button, Table, FormGroup } from "reactstrap";
import { connect } from "react-redux";
import "./be.scss";
import { Redirect } from "react-router-dom";
import {
  TextField,
  InputAdornment,
  Typography,
  Grid,
  Switch,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AddBEModal from "./AddBEModal";
import GetBEByIdModal from "./GetBEByIdModal";
import { SelectBE } from "../../redux/actions/GetBE";

const DATE_OPTIONS = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
};

var curr = new Date();
curr.setDate(curr.getDate());
var date = curr.toISOString().substr(0, 10);

class BonEntree extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");

    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }
    this.state = {
      addModalShow: false,
      getBLByIdModalShow: false,
      loggedIn,
      rechs: [],
      icon: false,
      rechercheclicked: false,
      tabtab: [],

      defaultdate: date,
      firstdate: date,
      seconddate: date,
      rechdats: [],
      showrechbydate: false,

      gilad: true,
    };
  }

  componentDidMount() {
    this.props.SelectBE();
  }

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.checked });

    this.state.gilad
      ? this.setState({ showrechbydate: false })
      : this.setState({ rechercheclicked: false });
  };

  rechercheHandler = (event) => {
    fetch(`http://192.168.1.100:81/api/BEREs/${event.target.value}?type=BE`)
      .then((response) => response.json())
      .then((data) => this.setState({ rechs: data, rechercheclicked: true }));
  };

  toggle = () => this.setState({ modal: !this.state.modal });

  firstrechdatHandler = (event) => {
    this.setState({ firstdate: event.target.value });

    fetch(
      `http://192.168.1.100:81/api/BEREs?datt=${event.target.value}&dattt=${this.state.seconddate}&typpe=BE`
    )
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          rechdats: data,
          showrechbydate: true,
          rechercheclicked: false,
        })
      );
  };

  secondrechdatHandler = (event) => {
    this.setState({ seconddate: event.target.value });

    fetch(
      `http://192.168.1.100:81/api/BEREs?datt=${this.state.firstdate}&dattt=${event.target.value}&typpe=BE`
    )
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          rechdats: data,
          showrechbydate: true,
          rechercheclicked: false,
        })
      );
  };

  render() {
    if (this.state.loggedIn === false) {
      return <Redirect to="/" />;
    }

    const {
      blid,
      datebl,
      client,
      raisonsociale,
      totalqteee,
      totalhtbrut,
      remiselignes,
      remiseglobale,
      totalhtnet,
      totaldc,
      totalcos,
      totalttc,
      totaltva,
      droitdetimbre,
      avanceimpot,
      rem,
      annuler,
      sumqt,
      facture,
      catfisc,
      typach,
      pj,
    } = this.state;

    let addModalClose1 = () => this.setState({ addModalShow: false });
    let getModalClose = () => this.setState({ getBLByIdModalShow: false });

    return (
      <div>
        <div className="bl-icon">
          <i class="fa fa-retweet" aria-hidden="true">
            {" "}
            Bon d'Entrée
          </i>
        </div>
        <br />
        <div>
          <Row style={{ marginTop: "-30px" }}>
            <Col sm={12}>
              <FormGroup style={{ marginTop: "25px" }}>
                <Typography component="div">
                  <Grid
                    component="label"
                    container
                    alignItems="center"
                    spacing={1}
                  >
                    <Grid item style={{ color: "grey" }}>
                      Recherche par date
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
                      Recherche par № BE / Fournisseur
                    </Grid>
                  </Grid>
                </Typography>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            {/* Recherche */}
            {/* <ConnectedSearchBar /> */}
            {this.state.gilad ? (
              <Col sm="4">
                <div className="search-bar">
                  <TextField
                    placeholder="Recherche..."
                    id="input-with-icon-textfield"
                    className="input-search"
                    onChange={this.rechercheHandler}
                    onClick={this.toggle}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon className="search-icon" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
              </Col>
            ) : (
              <Row style={{ marginTop: "-25px", marginLeft: "10px" }}>
                <Col sm={6}>
                  <TextField
                    id="standard-basic"
                    label="Date Début"
                    margin="normal"
                    type="date"
                    fullWidth
                    name="firstdate"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={this.firstrechdatHandler}
                    value={this.state.firstdate}
                    defaultValue={this.state.defaultdate}
                  />
                </Col>

                <Col sm={6}>
                  <TextField
                    id="standard-basic"
                    label="Date Fin"
                    margin="normal"
                    type="date"
                    fullWidth
                    name="seconddate"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    defaultValue={this.state.defaultdate}
                    onChange={this.secondrechdatHandler}
                    value={this.state.seconddate}
                  />
                </Col>
              </Row>
            )}

            <Col sm="2">
              {/* Add second part devis // Ligs */}
              {/* <AddDevis /> */}
              <div id="" style={{ textAlign: "center" }}>
                <button
                  className="icon-btn add-btn"
                  onClick={() => this.setState({ addModalShow: true })}
                >
                  <div className="add-icon"></div>
                  <div className="btn-txt">Ajouter BE</div>
                </button>
              </div>
            </Col>
          </Row>
        </div>
        <br />

        {this.state.rechercheclicked ? (
          <div className="tabbe">
            <table>
              <thead>
                <tr>
                  <th>№ BE</th>
                  <th>Date</th>

                  {/* <th style={{ width: "55%" }}>Fournisseur</th> */}
                  <th>Code Frs</th>
                  <th style={{ width: "40%" }}>Raison social</th>
                  <th>Montant</th>
                </tr>
              </thead>
              <tbody>
                {this.state.rechs.map((test, i) => (
                  <tr
                    key={i}
                    onClick={() => {
                      fetch(
                        `http://192.168.1.100:81/api/LIGBEREs?type=BE&numfac=${test.numfac}`
                      )
                        .then((response) => response.json())
                        .then((data) =>
                          this.setState({
                            tabtab: data,
                            sumqt:
                              data &&
                              data.reduce(
                                (a, v) => a + parseInt(v.quantite),
                                0
                              ),
                          })
                        );
                      this.setState({
                        getBLByIdModalShow: true,
                        blid: test.numfac,
                        datebl: test.datfac,
                        client: test.codfrs,
                        raisonsociale: test.raisoc,
                        totalhtbrut: test.smhtb,
                        remiselignes: test.smremart,
                        remiseglobale: test.smremglo,
                        totalhtnet: test.smhtn,
                        totaldc: test.smDC,
                        totalcos: test.smCOS,
                        totalttc: test.mntbon,
                        totaltva: test.smtva,
                        droitdetimbre: test.timbre,
                        avanceimpot: test.ForfaitCli,
                        annuler: test.annuler,
                        facture: test.facture,
                        catfisc: test.catfisc,
                        typach: test.typach,
                        pj: pj,
                      });
                    }}
                  >
                    <td>
                      <span>{test.numfac}</span>
                    </td>

                    <td>
                      <span>
                        {new Date(test.datfac).toLocaleDateString(
                          "fr",
                          DATE_OPTIONS
                        )}
                      </span>
                    </td>

                    {/* <td style={{ width: "55%" }}>
                      <span>{test.codfrs}</span> &nbsp;&nbsp;&nbsp;&nbsp;
                      <span>{test.raisoc}</span>
                    </td> */}
                    <td>
                      <span>{test.codfrs}</span>
                    </td>
                    <td style={{ width: "40%" }}>
                      <span>{test.raisoc}</span>
                    </td>

                    <td>
                      <span>{Number(test.mntbon).toFixed(3)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : this.state.showrechbydate ? (
          <div className="tabbe">
            <table>
              <thead>
                <tr>
                  <th>№ BE</th>
                  <th>Date</th>

                  {/* <th style={{ width: "55%" }}>Fournisseur</th> */}
                  <th>Code Frs</th>
                  <th style={{ width: "40%" }}>Raison social</th>
                  <th>Montant</th>
                </tr>
              </thead>
              <tbody>
                {this.state.rechdats.map((test, i) => (
                  <tr
                    key={i}
                    onClick={() => {
                      fetch(
                        `http://192.168.1.100:81/api/LIGBEREs?type=BE&numfac=${test.numfac}`
                      )
                        .then((response) => response.json())
                        .then((data) =>
                          this.setState({
                            tabtab: data,
                            sumqt:
                              data &&
                              data.reduce(
                                (a, v) => a + parseInt(v.quantite),
                                0
                              ),
                          })
                        );
                      this.setState({
                        getBLByIdModalShow: true,
                        blid: test.numfac,
                        datebl: test.datfac,
                        client: test.codfrs,
                        raisonsociale: test.raisoc,
                        totalhtbrut: test.smhtb,
                        remiselignes: test.smremart,
                        remiseglobale: test.smremglo,
                        totalhtnet: test.smhtn,
                        totaldc: test.smDC,
                        totalcos: test.smCOS,
                        totalttc: test.mntbon,
                        totaltva: test.smtva,
                        droitdetimbre: test.timbre,
                        avanceimpot: test.ForfaitCli,
                        annuler: test.annuler,
                        facture: test.facture,
                        catfisc: test.catfisc,
                        typach: test.typach,
                        pj: pj,
                      });
                    }}
                  >
                    <td>
                      <span>{test.numfac}</span>
                    </td>

                    <td>
                      <span>
                        {new Date(test.datfac).toLocaleDateString(
                          "fr",
                          DATE_OPTIONS
                        )}
                      </span>
                    </td>

                    {/* <td style={{ width: "55%" }}>
                      <span>{test.codfrs}</span> &nbsp;&nbsp;&nbsp;&nbsp;
                      <span>{test.raisoc}</span>
                    </td> */}
                    <td>
                      <span>{test.codfrs}</span>
                    </td>
                    <td style={{ width: "40%" }}>
                      <span>{test.raisoc}</span>
                    </td>

                    <td>
                      <span>{Number(test.mntbon).toFixed(3)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="tabbe">
            <table>
              <thead>
                <tr>
                  <th>№ BE</th>
                  <th>Date</th>
                  <th>Code Frs</th>
                  <th style={{ width: "40%" }}>Raison social</th>
                  {/* <th style={{ width: "55%" }}>Fournisseur</th> */}

                  <th>Montant</th>
                </tr>
              </thead>
              <tbody>
                {this.props.bes.bes.map((test, i) => (
                  <tr
                    key={i}
                    onClick={() => {
                      fetch(
                        `http://192.168.1.100:81/api/LIGBEREs?type=BE&numfac=${test.numfac}`
                      )
                        .then((response) => response.json())
                        .then((data) =>
                          this.setState({
                            tabtab: data,
                            sumqt:
                              data &&
                              data.reduce(
                                (a, v) => a + parseInt(v.quantite),
                                0
                              ),
                          })
                        );
                      this.setState({
                        getBLByIdModalShow: true,
                        blid: test.numfac,
                        datebl: test.datfac,
                        client: test.codfrs,
                        raisonsociale: test.raisoc,
                        totalhtbrut: test.smhtb,
                        remiselignes: test.smremart,
                        remiseglobale: test.smremglo,
                        totalhtnet: test.smhtn,
                        totaldc: test.smDC,
                        totalcos: test.smCOS,
                        totalttc: test.mntbon,
                        totaltva: test.smtva,
                        droitdetimbre: test.timbre,
                        avanceimpot: test.ForfaitCli,
                        //  rem: test.id,
                        annuler: test.annuler,
                        facture: test.facture,
                        catfisc: test.catfisc,
                        typach: test.typach,
                        pj: pj,
                      });
                    }}
                  >
                    <td>
                      <span>{test.numfac}</span>
                    </td>

                    <td>
                      <span>
                        {new Date(test.datfac).toLocaleDateString(
                          "fr",
                          DATE_OPTIONS
                        )}
                      </span>
                    </td>

                    {/* <td style={{ width: "55%" }}>
                      <span>{test.codfrs}</span> &nbsp;&nbsp;&nbsp;&nbsp;
                      <span>{test.raisoc}</span>
                    </td> */}

                    <td>
                      <span>{test.codfrs}</span>
                    </td>
                    <td style={{ width: "40%" }}>
                      <span>{test.raisoc}</span>
                    </td>

                    <td>
                      <span>{Number(test.mntbon).toFixed(3)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <AddBEModal show={this.state.addModalShow} onHide={addModalClose1} />

        <GetBEByIdModal
          show={this.state.getBLByIdModalShow}
          onHide={getModalClose}
          blid={blid}
          datebl={datebl}
          client={client}
          raisonsociale={raisonsociale}
          totalhtbrut={totalhtbrut}
          remiselignes={remiselignes}
          remiseglobale={remiseglobale}
          totalhtnet={totalhtnet}
          totaldc={totaldc}
          totalcos={totalcos}
          totalttc={totalttc}
          totaltva={totaltva}
          droitdetimbre={droitdetimbre}
          avanceimpot={avanceimpot}
          rem={rem}
          annuler={annuler}
          tabtab={this.state.tabtab}
          sumqt={sumqt}
          facture={facture}
          catfisc={catfisc}
          typach={typach}
          pj={pj}
        />
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
  return {
    bes: state.bes,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BonEntree);
