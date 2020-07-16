import React, { Component } from "react";
import ConnectedSearchBar from "../content/SearchBar";
import { Row, Col, Button, Table } from "reactstrap";
import { SelectBL } from "../../redux/actions/GetBL";
import { connect } from "react-redux";
import "./bl.scss";
import AddBLModal from "./AddBLModal";
import GetBLByIdModal from "./GetBLByIdModal";
import { Redirect } from "react-router-dom";
import { TextField, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ModalAjout from "./modalajout";

const DATE_OPTIONS = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
};

class BonDeLivraison extends Component {
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
    this.props.SelectBL();
  }

  toggle = () => this.setState({ modal: !this.state.modal });

  rechercheHandler = (event) => {
    fetch(`http://192.168.1.100:81/api/BLBRs/${event.target.value}?type=bl`)
      .then((response) => response.json())
      .then((data) => this.setState({ rechs: data, rechercheclicked: true }));
  };

  render() {
    let addModalClose1 = () => this.setState({ addModalShow: false });
    let getModalClose = () => this.setState({ getBLByIdModalShow: false });
    // let exit;
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
      SumHtBrut,
    } = this.state;

    if (this.state.loggedIn === false) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <div className="bl-icon">
          <i class="fas fa-list-alt"> Bon de Livraison</i>
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
                  <div className="btn-txt">Ajouter BL</div>
                </button>
              </div>
            </Col>
          </Row>
        </div>
        <br />

        {this.state.rechercheclicked ? (
          <div className="tabbl">
            <table>
              <thead>
                <tr>
                  <th>№ BL</th>
                  <th>Date</th>
                  <th>Code client</th>
                  <th style={{ width: "40%" }}>Raison Sociale</th>
                  {/* <th style={{ width: "40%" }}>Client</th> */}
                  <th>Facturé</th>
                  <th>Montant</th>
                </tr>
              </thead>
              <tbody>
                {this.state.rechs.map((test) => (
                  <tr
                    key={test.numfac}
                    onClick={() => {
                      fetch(
                        `http://192.168.1.100:81/Api/LigBLBRs?type=BL&numfac=${test.numfac}`
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
                            SumHtBrut:
                              data &&
                              data.reduce(
                                (a, v) => a + parseInt(v.quantite) * v.priuni,
                                0
                              ),
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
                          })
                        );
                      // this.setState({
                      //   getBLByIdModalShow: true,
                      //   blid: test.numfac,
                      //   datebl: test.datfac,
                      //   client: test.codcli,
                      //   raisonsociale: test.raisoc,
                      //   totalhtbrut: test.smhtb,
                      //   remiselignes: test.smremart,
                      //   remiseglobale: test.smremglo,
                      //   totalhtnet: test.smhtn,
                      //   totaldc: test.smDC,
                      //   totalcos: test.smCOS,
                      //   totalttc: test.mntbon,
                      //   totaltva: test.smtva,
                      //   droitdetimbre: test.timbre,
                      //   avanceimpot: test.ForfaitCli,
                      //   //  rem: test.id,
                      //   annuler: test.annuler,
                      //   facture: test.facture,
                      //   catfisc: test.catfisc,
                      // });
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

                    <td>
                      <span>{test.codcli}</span>
                    </td>

                    <td style={{ width: "40%" }}>
                      <span>{test.raisoc}</span>
                    </td>
                    {/* 
                    <td style={{ width: "40%" }}>
                      <span>{test.codcli}</span> &nbsp;&nbsp;&nbsp;&nbsp;
                      <span>{test.raisoc}</span>
                    </td> */}
                    <td>
                      {test.facture === test.numfac ? (
                        <span>✔</span>
                      ) : (
                        <span>Ø</span>
                      )}
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
          <div className="tabbl">
            <table>
              <thead>
                <tr>
                  <th>№ BL</th>
                  <th>Date</th>
                  <th>Code client</th>
                  <th style={{ width: "40%" }}>Raison Sociale</th>
                  {/* <th style={{ width: "40%" }}>Client</th> */}
                  <th>Facturé</th>

                  <th>Montant</th>
                </tr>
              </thead>
              <tbody>
                {this.props.bls.bls.map((test) => (
                  <tr
                    key={test.id}
                    onClick={() => {
                      fetch(
                        `http://192.168.1.100:81/Api/LigBLBRs?type=BL&numfac=${test.numfac}`
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
                            SumHtBrut:
                              data &&
                              data.reduce(
                                (a, v) => a + parseInt(v.quantite) * v.priuni,
                                0
                              ),
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
                          })
                        );

                      // this.setState({
                      //   getBLByIdModalShow: true,
                      //   blid: test.numfac,
                      //   datebl: test.datfac,
                      //   client: test.codcli,
                      //   raisonsociale: test.raisoc,
                      //   totalhtbrut: test.smhtb,
                      //   remiselignes: test.smremart,
                      //   remiseglobale: test.smremglo,
                      //   totalhtnet: test.smhtn,
                      //   totaldc: test.smDC,
                      //   totalcos: test.smCOS,
                      //   totalttc: test.mntbon,
                      //   totaltva: test.smtva,
                      //   droitdetimbre: test.timbre,
                      //   avanceimpot: test.ForfaitCli,
                      //   //  rem: test.id,
                      //   annuler: test.annuler,
                      //   facture: test.facture,
                      //   catfisc: test.catfisc,
                      // });
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

                    {/* <td style={{ width: "40%" }}>
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
                      {test.facture === test.numfac ? (
                        <span>✔</span>
                      ) : (
                        <span>Ø</span>
                      )}
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

        <AddBLModal show={this.state.addModalShow} onHide={addModalClose1} />

        <GetBLByIdModal
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
          SumHtBrut={SumHtBrut}
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    SelectBL: () => dispatch(SelectBL()),
  };
}

function mapStateToProps(state) {
  return {
    bls: state.bls,
    SearchingResult: state.SearchingReducer,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BonDeLivraison);
