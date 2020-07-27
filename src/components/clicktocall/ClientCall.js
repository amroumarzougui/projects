import React, { Component } from "react";
import { connect } from "react-redux";
import "../Commande-client-devis/Styling.css";
import { getClientHeader } from "../../redux/actions/ClientActions";
import "./click.scss";

import "../../App.css";
import { SelectTest } from "../../redux/actions/TestAction";
import { Table, Row, Col } from "reactstrap";
import { Redirect } from "react-router-dom";
import { SelectClient } from "../../redux/actions/GetClients";
import SearchIcon from "@material-ui/icons/Search";
import { TextField, InputAdornment, Fab, Tooltip } from "@material-ui/core";
import { Button } from "react-bootstrap";
import PhoneIcon from "@material-ui/icons/Phone";
import AppelModalClient from "./AppelModalClient";

class FicheClientt extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");

    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }
    this.state = {
      loggedIn,
      rechs: [],
      icon: false,
      rechercheclicked: false,
      appelModal: false,
    };
  }

  componentDidMount() {
    this.props.SelectClient();
  }

  rechercheHandler = (event) => {
    fetch(`http://192.168.1.100:81/api/CLIEntS?codclii=${event.target.value}`)
      .then((response) => response.json())
      .then((data) => this.setState({ rechs: data, rechercheclicked: true }));
  };

  render() {
    let appelModalClose = () => this.setState({ appelModal: false });

    if (this.state.loggedIn === false) {
      return <Redirect to="/" />;
    }

    const { tel1, tel2, raisonsocial } = this.state;

    return (
      <div>
        <main className="gestion-des-clients">
          <Row style={{ marginTop: "20px" }}>
            <Col sm={12}>
              <Row>
                <Col sm="9">
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
                <Col sm="3"></Col>
              </Row>
            </Col>
          </Row>

          {this.state.rechercheclicked ? (
            <div className="tabcf">
              <table striped>
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Raison sociale</th>
                    <th>Ville</th>
                    <th>Télephone 1</th>
                    <th>Télephone 2</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.rechs.map((test) => (
                    <tr
                      key={test.codcli}
                      onClick={() => {
                        this.setState({
                          GetByIdModalShow: true,
                          passager: test.passager,
                          codeclient: test.codcli,
                          raisoc: test.raisoc,
                          tel1: test.tel1,
                          tel2: test.tel2,
                          email: test.email,
                          adresse: test.adr,
                          siteweb: test.sitweb,
                          cin: test.cin,
                          ville: test.ville,
                          codepostal: test.cp,
                          identifiant: test.fax,
                          tauxfodec: test.compte,
                          timbre: test.timbre,
                          soustraitant: test.NAR,

                          acontacter: test.RC,
                          impot: test.CodDep,
                          comptable: test.RIB2,
                        });
                      }}
                    >
                      <td>
                        <span>{test.codcli}</span>
                      </td>

                      <td>
                        <span>{test.raisoc}</span>
                      </td>

                      {test.ville === "" ? (
                        <td>
                          <span>--</span>
                        </td>
                      ) : (
                        <td>
                          <span>{test.ville}</span>
                        </td>
                      )}

                      <td>
                        {test.tel1 === "" || test.tel1 === null ? (
                          <span>--</span>
                        ) : (
                          <span>{test.tel1}</span>
                        )}
                      </td>
                      <td>
                        {test.tel2 === "" || test.tel2 === null ? (
                          <span>--</span>
                        ) : (
                          <span>{test.tel2}</span>
                        )}
                      </td>
                      <td>
                        <Tooltip title="Effectuer un appel">
                          <Fab
                            size="small"
                            onClick={() =>
                              this.setState({
                                appelModal: true,
                                tel1: test.tel1,
                                tel2: test.tel2,
                                raisonsocial: test.raisoc,
                              })
                            }
                          >
                            {" "}
                            <PhoneIcon
                              style={{ fontSize: "18px", color: "green" }}
                            />{" "}
                          </Fab>
                        </Tooltip>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="tabcf">
              <table striped>
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Raison sociale</th>
                    <th>Ville</th>
                    <th>Télephone 1</th>
                    <th>Télephone 2</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.clients.clients.map((test) => (
                    <tr
                      key={test.codcli}
                      onClick={() => {
                        this.setState({
                          GetByIdModalShow: true,
                          passager: test.passager,
                          codeclient: test.codcli,
                          raisoc: test.raisoc,
                          tel1: test.tel1,
                          tel2: test.tel2,
                          email: test.email,
                          adresse: test.adr,
                          siteweb: test.sitweb,
                          cin: test.cin,
                          ville: test.ville,
                          codepostal: test.cp,
                          identifiant: test.fax,
                          tauxfodec: test.compte,
                          timbre: test.timbre,
                          soustraitant: test.NAR,

                          acontacter: test.RC,
                          impot: test.CodDep,
                          comptable: test.RIB2,
                        });
                      }}
                    >
                      <td>
                        <span>{test.codcli}</span>
                      </td>

                      <td>
                        <span>{test.raisoc}</span>
                      </td>
                      {test.ville === "" ? (
                        <td>
                          <span>--</span>
                        </td>
                      ) : (
                        <td>
                          <span>{test.ville}</span>
                        </td>
                      )}

                      <td>
                        {test.tel1 === "" || test.tel1 === null ? (
                          <span>--</span>
                        ) : (
                          <span>{test.tel1}</span>
                        )}
                      </td>
                      <td>
                        {test.tel2 === "" || test.tel2 === null ? (
                          <span>--</span>
                        ) : (
                          <span>{test.tel2}</span>
                        )}
                      </td>
                      <td>
                        <Tooltip title="Effectuer un appel">
                          <Fab
                            size="small"
                            onClick={() =>
                              this.setState({
                                appelModal: true,
                                tel1: test.tel1,
                                tel2: test.tel2,
                                raisonsocial: test.raisoc,
                              })
                            }
                          >
                            {" "}
                            <PhoneIcon
                              style={{ fontSize: "18px", color: "green" }}
                            />{" "}
                          </Fab>
                        </Tooltip>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
        <AppelModalClient
          show={this.state.appelModal}
          onHide={appelModalClose}
          tel1={tel1}
          tel2={tel2}
          raisonsocial={raisonsocial}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    DataTables: state.DataTablesReducer,
    tests: state.tests,
    SearchingResult: state.SearchingReducer,
    clients: state.clients,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getClientHeader: () => {
    dispatch(getClientHeader());
  },
  SelectTest: () => {
    dispatch(SelectTest());
  },
  SelectClient: () => {
    dispatch(SelectClient());
  },
});
const ClientCall = connect(mapStateToProps, mapDispatchToProps)(FicheClientt);
export default ClientCall;
