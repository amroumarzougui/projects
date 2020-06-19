import React, { Component } from "react";

import { connect } from "react-redux";
import { SelectBC } from "../../redux/actions/GetBC";
import ConnectedSearchBar from "../content/SearchBar";
import { Row, Col, Button, Table } from "reactstrap";
import "./ss.scss";
import AddBCModal from "./AddBCModal";
import GetBCByIdModal from "./GetBCByIdModal";
import { Redirect } from "react-router-dom";

import EmailModal from "./EmailModal";

class BonDeCommande extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");

    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }
    this.state = {
      addModalShow: false,
      getBCByIdModalShow: false,
      loggedIn,
    };
  }

  componentDidMount() {
    this.props.SelectBC();
  }
  render() {
    let addModalClose1 = () => this.setState({ addModalShow: false });
    let getModalClose = () => this.setState({ getBCByIdModalShow: false });
    const {
      bcid,
      datebc,
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
    } = this.state;

    if (this.state.loggedIn === false) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <div className="bc-icon">
          <i class="fas fa-clipboard-list"> Bon de commande</i>
        </div>
        <br />
        <div>
          <Row>
            <Col sm="9">
              {/* Recherche */}
              <ConnectedSearchBar />
            </Col>
            <Col sm="3">
              {/* Add second part tests // Ligs */}
              <div id="" style={{ textAlign: "center" }}>
                <button
                  className="icon-btn add-btn"
                  onClick={() => this.setState({ addModalShow: true })}
                >
                  <div className="add-icon"></div>
                  <div className="btn-txt">Ajouter BC</div>
                </button>
              </div>
            </Col>
          </Row>
        </div>
        <br />

        {/* <div className="bc-table"> */}
        <div className="tab30">
          <table striped>
            <thead>
              <tr>
                <th>№</th>
                <th>Date</th>
                <th>Code client</th>
                <th>Raison Sociale</th>
                <th>Montant TotalTTC</th>
              </tr>
            </thead>
            <tbody>
              {this.props.bcs.bcs
                .filter(
                  (test) =>
                    test.id
                      .toString()
                      .includes(this.props.SearchingResult.searching) ||
                    test.title
                      .toLowerCase()
                      .includes(this.props.SearchingResult.searching)
                )
                .map((test) => (
                  <tr
                    key={test.id}
                    onClick={() => {
                      this.setState({
                        getBCByIdModalShow: true,
                        bcid: test.id,
                        datebc: test.title,
                        client: test.id,
                        raisonsociale: test.title,
                        totalhtbrut: test.userId,
                        remiselignes: test.id,
                        remiseglobale: test.userId,
                        totalhtnet: test.id,
                        totaldc: test.id,
                        totalcos: test.id,
                        totalttc: test.userId,
                        totaltva: test.userId,
                        droitdetimbre: test.id,
                        avanceimpot: test.userId,
                        rem: test.id,
                      });
                    }}
                  >
                    <td>
                      <span>{test.id}</span>
                    </td>

                    <td>
                      <span>{test.title}</span>
                    </td>

                    <td>
                      <span>{test.userId}</span>
                    </td>

                    <td>
                      <span>{test.title}</span>
                    </td>
                    <td>
                      <span>{test.userId}</span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <AddBCModal show={this.state.addModalShow} onHide={addModalClose1} />

        <GetBCByIdModal
          show={this.state.getBCByIdModalShow}
          onHide={getModalClose}
          bcid={bcid}
          datebc={datebc}
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
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    SelectBC: () => dispatch(SelectBC()),
  };
}

function mapStateToProps(state) {
  return {
    bcs: state.bcs,
    SearchingResult: state.SearchingReducer,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BonDeCommande);
