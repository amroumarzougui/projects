import React, { Component } from "react";
import { Row, Col, Button, Table } from "reactstrap";
import { connect } from "react-redux";
import "./be.scss";
import { Redirect } from "react-router-dom";
import { TextField, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AddBEModal from "./AddBEModal";
import GetBEByIdModal from "./GetBEByIdModal";
import { SelectBE } from "../../redux/actions/GetBE";

const DATE_OPTIONS = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
};

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
    };
  }

  componentDidMount() {
    this.props.SelectBE();
  }

  rechercheHandler = (event) => {
    fetch(`http://192.168.1.100:81/api/BEREs/${event.target.value}?type=BE`)
      .then((response) => response.json())
      .then((data) => this.setState({ rechs: data, rechercheclicked: true }));
  };

  toggle = () => this.setState({ modal: !this.state.modal });

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
          <Row>
            <Col sm="9">
              {/* Recherche */}
              {/* <ConnectedSearchBar /> */}
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
            <Col sm="3">
              {/* Add second part tests // Ligs */}
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

                  <th style={{ width: "55%" }}>Fournisseur</th>
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

                    <td style={{ width: "55%" }}>
                      <span>{test.codfrs}</span> &nbsp;&nbsp;&nbsp;&nbsp;
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
                  {/* <th>Code Fournisseur</th>
                  <th style={{ width: "40%" }}>Raison Sociale</th> */}
                  <th style={{ width: "55%" }}>Fournisseur</th>

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

                    <td style={{ width: "55%" }}>
                      <span>{test.codfrs}</span> &nbsp;&nbsp;&nbsp;&nbsp;
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
