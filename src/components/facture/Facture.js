import React, { Component } from "react";
import ConnectedSearchBar from "../content/SearchBar";
import { Row, Col, Button, Table } from "reactstrap";
import { SelectFacture } from "../../redux/actions/GetFacture";
import { connect } from "react-redux";
import "./facture.scss";
import AddFactureModal from "./AddFactureModal";
import GetFactureByIdModal from "./GetFactureByIdModal";
import { Redirect } from "react-router-dom";
import { TextField, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const DATE_OPTIONS = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
};

class Facture extends Component {
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
    this.props.SelectFacture();
  }

  toggle = () => this.setState({ modal: !this.state.modal });

  rechercheHandler = (event) => {
    fetch(`http://192.168.1.100:81/api/FACCLIs/${event.target.value}?type=FT`)
      .then((response) => response.json())
      .then((data) => this.setState({ rechs: data, rechercheclicked: true }));
  };

  render() {
    let addModalClose1 = () => this.setState({ addModalShow: false });
    let getModalClose = () => this.setState({ getBLByIdModalShow: false });
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
      sumqt,
    } = this.state;

    if (this.state.loggedIn === false) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <div className="f-icon">
          <i class="fas fa-file-invoice-dollar"> Facture</i>
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
          </Row>
        </div>
        <br />

        {this.state.rechercheclicked ? (
          <div className="tabf">
            <table>
              <thead>
                <tr>
                  <th>№ BL</th>
                  <th>Date</th>

                  <th style={{ width: "55%" }}>Client</th>
                  <th>Montant</th>
                </tr>
              </thead>
              <tbody>
                {this.state.rechs.map((test) => (
                  <tr
                    key={test.numfac}
                    onClick={() => {
                      fetch(
                        `http://192.168.1.100:81/Api/LigFACCLIs?type=FT&numfac=${test.numfac}`
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
                        client: test.codcli,
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
                      <span>{test.codcli}</span> &nbsp;&nbsp;&nbsp;&nbsp;
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
          <div className="tabf">
            <table>
              <thead>
                <tr>
                  <th>№ BL</th>
                  <th>Date</th>

                  <th style={{ width: "55%" }}>Client</th>

                  <th>Montant</th>
                </tr>
              </thead>
              <tbody>
                {this.props.factures.factures.map((test) => (
                  <tr
                    key={test.id}
                    onClick={() => {
                      fetch(
                        `http://192.168.1.100:81/Api/LigFACCLIs?type=FT&numfac=${test.numfac}`
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
                        client: test.codcli,
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
                      <span>{test.codcli}</span> &nbsp;&nbsp;&nbsp;&nbsp;
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

        <div className="tabf">
          <GetFactureByIdModal
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
            tabtab={this.state.tabtab}
            sumqt={sumqt}
          />
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    SelectFacture: () => dispatch(SelectFacture()),
  };
}

function mapStateToProps(state) {
  return {
    factures: state.factures,
    SearchingResult: state.SearchingReducer,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Facture);
