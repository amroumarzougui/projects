import React, { Component } from "react";
import { TextField, InputAdornment } from "@material-ui/core";
import { Col, Row } from "reactstrap";
import SearchIcon from "@material-ui/icons/Search";
import { Redirect } from "react-router-dom";
import AddReModal from "./AddReModal";
import { connect } from "react-redux";
import { SelectReglement } from "../../redux/actions/GetReg";
import "./re.scss";
import GetREByIdModal from "./GetREByIdModal";

const DATE_OPTIONS = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
};

class Reglement extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");

    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }
    this.state = {
      addModalShow: false,
      getREByIdModalShow: false,
      loggedIn,
      rechs: [],
      icon: false,
      rechercheclicked: false,
      tabtab: [],
    };
  }

  componentDidMount() {
    this.props.SelectReglement();
  }

  rechercheHandler = (event) => {
    fetch(`http://192.168.1.100:81/api/REGCLIs/${event.target.value}`)
      .then((response) => response.json())
      .then((data) => this.setState({ rechs: data, rechercheclicked: true }));
  };

  toggle = () => this.setState({ modal: !this.state.modal });

  render() {
    if (this.state.loggedIn === false) {
      return <Redirect to="/" />;
    }

    let addModalClose1 = () => this.setState({ addModalShow: false });
    let getModalClose = () => this.setState({ getREByIdModalShow: false });

    const {
      regid,
      datereg,
      client,
      raisonsociale,
      modreg,
      numcais,
      numchq,
      titulaire,
      datech,
      mntreg,
      bqescompte,
      codccb,
      agence,
      monreg,
      verser,
      matban,
      note,
    } = this.state;

    return (
      <div>
        <div className="bl-icon">
          <i className="fab fa-dashcube"> Règlement Client</i>
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
                  <div className="btn-txt">Ajouter Règlement</div>
                </button>
              </div>
            </Col>
          </Row>
        </div>
        <br />{" "}
        {this.state.rechercheclicked ? (
          <div className="tabre">
            <table>
              <thead>
                <tr>
                  <th>№ REG</th>
                  <th>Date</th>
                  <th>Code client</th>
                  <th style={{ width: "40%" }}>Raison Sociale</th>
                  <th>Montant</th>
                  <th>Solde</th>
                </tr>
              </thead>
              <tbody>
                {this.state.rechs.map((test) => (
                  <tr
                    key={test.numreg}
                    onClick={() =>
                      this.setState({
                        getREByIdModalShow: true,
                        regid: test.numreg,
                        datereg: test.datreg,
                        client: test.codcli,
                        raisonsociale: test.raisoc,
                        modreg: test.modreg,
                        numcais: test.numcais,
                        numchq: test.numchq,
                        titulaire: test.titulaire,
                        datech: test.datech,
                        mntreg: test.mntreg,
                        bqescompte: test.BqEscompte,
                        codccb: test.codccb,
                        agence: test.agence,
                        monreg: test.monreg,
                        verser: test.verser,
                        matban: test.matban,
                        note: test.lib_reg,
                      })
                    }
                  >
                    <td>
                      <span>{test.numreg}</span>
                    </td>

                    <td>
                      <span>
                        {new Date(test.datreg).toLocaleDateString(
                          "fr",
                          DATE_OPTIONS
                        )}
                      </span>
                    </td>

                    <td>
                      <span>{test.codcli}</span>
                    </td>

                    <td style={{ width: "40%" }}>
                      <span>{test.raisoc}</span>
                    </td>
                    <td>
                      <span> {Number(test.mntreg).toFixed(3)} </span>
                    </td>
                    <td>
                      <span>{Number(test.Reste).toFixed(3)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="tabre">
            <table>
              <thead>
                <tr>
                  <th>№ REG</th>
                  <th>Date</th>
                  <th>Code client</th>
                  <th style={{ width: "40%" }}>Raison Sociale</th>
                  <th>Montant</th>

                  <th>Solde</th>
                </tr>
              </thead>
              <tbody>
                {this.props.regs.regs.map((test) => (
                  <tr
                    key={test.numreg}
                    onClick={() =>
                      this.setState({
                        getREByIdModalShow: true,
                        regid: test.numreg,
                        datereg: test.datreg,
                        client: test.codcli,
                        raisonsociale: test.raisoc,
                        modreg: test.modreg,
                        numcais: test.numcais,
                        numchq: test.numchq,
                        titulaire: test.titulaire,
                        datech: test.datech,
                        mntreg: test.mntreg,
                        bqescompte: test.BqEscompte,
                        codccb: test.codccb,
                        agence: test.agence,
                        monreg: test.monreg,
                        verser: test.verser,
                        matban: test.matban,
                        note: test.lib_reg,
                      })
                    }
                  >
                    <td>
                      <span>{test.numreg}</span>
                    </td>

                    <td>
                      <span>
                        {new Date(test.datreg).toLocaleDateString(
                          "fr",
                          DATE_OPTIONS
                        )}
                      </span>
                    </td>

                    <td>
                      <span>{test.codcli}</span>
                    </td>

                    <td style={{ width: "40%" }}>
                      <span>{test.raisoc}</span>
                    </td>
                    <td>
                      <span> {Number(test.mntreg).toFixed(3)} </span>
                    </td>
                    <td>
                      <span>{Number(test.Reste).toFixed(3)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <AddReModal show={this.state.addModalShow} onHide={addModalClose1} />
        <GetREByIdModal
          show={this.state.getREByIdModalShow}
          onHide={getModalClose}
          regid={regid}
          datereg={datereg}
          client={client}
          raisonsociale={raisonsociale}
          modreg={modreg}
          numcais={numcais}
          numchq={numchq}
          titulaire={titulaire}
          datech={datech}
          mntreg={mntreg}
          bqescompte={bqescompte}
          codccb={codccb}
          agence={agence}
          monreg={monreg}
          verser={verser}
          matban={matban}
          note={note}
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    SelectReglement: () => dispatch(SelectReglement()),
  };
}

function mapStateToProps(state) {
  return {
    regs: state.regs,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Reglement);
