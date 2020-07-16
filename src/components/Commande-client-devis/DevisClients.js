import React, { Component } from "react";
import { Row, Col, Table } from "reactstrap";
import AddDevis from "./AddDevis";
import { connect } from "react-redux";
import { SelectUser } from "../../redux/actions/DevisClient";
import "../styling/Styles.css";
import ConnectedSearchBar from "../content/SearchBar";
import EditDevisClientModal from "./EditDevisClientModal";
import { SelectClient } from "../../redux/actions/GetClients";
import { Button } from "react-bootstrap";
import { SelectDevisLig } from "../../redux/actions/GetDevisLig";
import "./ss.scss";
import { Redirect } from "react-router-dom";
import { TextField, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const DATE_OPTIONS = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
};

class DevisClient extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");

    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }
    this.state = {
      editModalShow: false,
      loggedIn,
      rechs: [],
      icon: false,
      rechercheclicked: false,
      tabtab: [],
    };
  }

  componentDidMount() {
    this.props.SelectUser();
  }

  toggle = () => this.setState({ modal: !this.state.modal });

  rechercheHandler = (event) => {
    fetch(`http://192.168.1.100:81/api/BCDVCLIs/${event.target.value}?type=DV`)
      .then((response) => response.json())
      .then((data) => this.setState({ rechs: data, rechercheclicked: true }));
  };

  editModalClose = () => this.setState({ editModalShow: false });

  render() {
    const {
      devisid,
      datedevis,
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
      annuler,
      sumqt,
    } = this.state;

    if (this.state.loggedIn === false) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <div className="page-icon">
          <i class="fas fa-tasks"> Devis client</i>
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
              {/* Add second part devis // Ligs */}
              <AddDevis />
            </Col>
          </Row>
        </div>

        {/* <div className="bc-table"> */}
        {this.state.rechercheclicked ? (
          <div className="tabd">
            <table striped>
              <thead>
                <tr>
                  <th>№ DV</th>
                  <th>Date</th>
                  {/* <th style={{ width: "55%" }}>Client</th> */}
                  <th>Code client</th>
                  <th style={{ width: "40%" }}>Raison Social</th>
                  <th>Montant </th>
                </tr>
              </thead>
              <tbody>
                {this.state.rechs.map((test) => (
                  <tr
                    key={test.numfac}
                    onClick={() => {
                      fetch(
                        `http://192.168.1.100:81/api/LigBCDV?type=DV&numfac=${test.numfac}`
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
                        editModalShow: true,
                        devisid: test.numfac,
                        datedevis: test.datfac,
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
                        annuler: test.annuler,
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

                    {/* <td style={{ width: "55%" }}>
                      <span>{test.codcli}</span> &nbsp;&nbsp;&nbsp;&nbsp;
                      <span>{test.raisoc}</span>
                    </td> */}
                    <td>
                      <span>{test.codcli}</span>
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
          <div className="tabd">
            <table striped>
              <thead>
                <tr>
                  <th>№ DV</th>
                  <th>Date</th>
                  {/* <th style={{ width: "55%" }}>Client</th> */}
                  <th>Code client</th>
                  <th style={{ width: "40%" }}>Raison Sociale</th>
                  <th>Montant </th>
                </tr>
              </thead>
              <tbody>
                {this.props.devis.devis.map((test) => (
                  <tr
                    key={test.numfac}
                    onClick={() => {
                      fetch(
                        `http://192.168.1.100:81/api/LigBCDV?type=DV&numfac=${test.numfac}`
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
                        editModalShow: true,
                        devisid: test.numfac,
                        datedevis: test.datfac,
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
                        annuler: test.annuler,
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
                    {/* 
                    <td style={{ width: "55%" }}>
                      <span>{test.codcli}</span> &nbsp;&nbsp;&nbsp;&nbsp;
                      <span>{test.raisoc}</span>
                    </td> */}
                    <td>
                      <span>{test.codcli}</span>
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

        <br />

        <EditDevisClientModal
          show={this.state.editModalShow}
          onHide={this.editModalClose}
          devisid={devisid}
          datedevis={datedevis}
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
          cod={devisid}
          annuler={annuler}
          tabtab={this.state.tabtab}
          sumqt={sumqt}
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    SelectUser: () => dispatch(SelectUser()),
  };
}

function mapStateToProps(state) {
  return {
    devis: state.devis,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DevisClient);
