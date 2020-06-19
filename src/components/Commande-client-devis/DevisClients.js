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
      testing: [
        {
          t0: 100,
          des: 1,
          qte: 2,
          t3: 3,
          puht: 4,
          t5: 5,
          t6: 6,
          tva: 0,
          t8: 8,
          t9: 9,
        },
        {
          t0: 200,
          des: 11,
          qte: 12,
          t3: 13,
          puht: 14,
          t5: 15,
          t6: 16,
          tva: 0,
          t8: 18,
          t9: 19,
        },
      ],
      sums: [],
    };
  }

  componentDidMount() {
    this.props.SelectUser();
    this.props.SelectDevisLig();
  }

  deleteDevis(devisid) {
    if (window.confirm("are you sure?")) {
      fetch(`http://192.168.1.100:81/api/BCDVCLIs/` + devisid, {
        method: "DELETE",
        header: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    }
  }

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
    } = this.state;

    var Totalqteee =
      this.props.ligs.ligs &&
      this.props.ligs.ligs.reduce((a, v) => a + parseInt(v.quantite), 0);

    if (this.state.loggedIn === false) {
      return <Redirect to="/" />;
    }

    fetch(`http://192.168.1.100:81/api/LigBCDV?typpe=DV&numm=${devisid}`)
      .then((response) => response.json())
      .then((data) => this.setState({ sums: data }));

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
              <ConnectedSearchBar />
            </Col>

            <Col sm="3">
              {/* Add second part devis // Ligs */}
              <AddDevis />
            </Col>
          </Row>
        </div>

        {/* <div className="bc-table"> */}
        <div className="tabd">
          <table stripped>
            <thead>
              <tr>
                <th>№</th>
                <th>Date</th>
                <th>Code client</th>
                <th style={{ width: "40%" }}>Raison Sociale</th>
                <th>Montant TTC</th>
              </tr>
            </thead>
            <tbody>
              {this.props.devis.devis
                .filter(
                  (el) =>
                    el.numfac
                      .toString()
                      .includes(this.props.SearchingResult.searching) ||
                    el.raisoc.includes(this.props.SearchingResult.searching) ||
                    el.codcli
                      .toString()
                      .includes(this.props.SearchingResult.searching)
                )
                .map((devi) => (
                  <tr
                    key={devi.$id}
                    onClick={() =>
                      this.setState({
                        editModalShow: true,
                        devisid: devi.numfac,
                        datedevis: devi.datfac,
                        client: devi.codcli,
                        raisonsociale: devi.raisoc,
                        totalhtbrut: devi.smhtb,
                        remiselignes: devi.smremart,
                        remiseglobale: devi.smremglo,
                        totalhtnet: devi.smhtn,
                        totaldc: devi.smDC,
                        totalcos: devi.smCOS,
                        totalttc: devi.mntbon,
                        totaltva: devi.smtva,
                        droitdetimbre: devi.valtimbre,
                        avanceimpot: devi.ForfaitCli,
                        annuler: devi.annuler,
                      })
                    }
                  >
                    <td>
                      <span>{devi.numfac}</span>
                    </td>
                    <td>
                      {" "}
                      <span> {devi.datfac}</span>
                    </td>
                    <td>
                      {" "}
                      <span>{devi.codcli}</span>
                    </td>

                    <td style={{ width: "40%" }}>
                      {" "}
                      <span>{devi.raisoc}</span>
                    </td>
                    <td>
                      {" "}
                      <span>{Number(devi.mntbon).toFixed(3)}</span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
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
            totalqteee={Totalqteee}
            cod={devisid}
            annuler={annuler}
            sum={this.state.sums.map((su) => su.Column1)}
          />
        </div>
        <br />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    SelectUser: () => dispatch(SelectUser()),
    SelectClient: () => dispatch(SelectClient()),
    SelectDevisLig: () => dispatch(SelectDevisLig()),
  };
}

function mapStateToProps(state) {
  return {
    devis: state.devis,
    SearchingResult: state.SearchingReducer,
    ligs: state.ligs,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DevisClient);
