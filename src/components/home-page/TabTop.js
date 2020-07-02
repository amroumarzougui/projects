import React, { Component } from "react";
import { Tabs, Tab, Table } from "react-bootstrap";
import "./HomePage.scss";
import { connect } from "react-redux";
import { SelectTopclient } from "../../redux/actions/Top5";
import { SelectTopFrs } from "../../redux/actions/Top5Frs";

class TabTop extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.SelectTopclient();
    this.props.SelectTopFrs();
  }

  render() {
    return (
      <div>
        <Tabs
          defaultActiveKey="home"
          transition={false}
          id="noanim-tab-example"
        >
          <Tab eventKey="home" title="Clients">
            <p className="p1" style={{ marginTop: "20px" }}>
              Top 5 clients
            </p>
            <Table striped hover size="sm">
              <thead style={{ background: "#454d55", color: "white" }}>
                <tr>
                  <th>Code</th>
                  <th>Raison Social</th>
                  <th>Montant</th>
                </tr>
              </thead>
              <tbody>
                {this.props.tops.tops.map((t) =>
                  t.raisoc === "CLIENT PASSAGER" ? null : (
                    <tr key={t.codcli}>
                      <td> {t.codcli} </td>
                      <td> {t.raisoc} </td>
                      <td> {Number(t.sommemntbn).toFixed(3)} </td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>
          </Tab>
          <Tab eventKey="profile" title="Fournisseurs">
            <p className="p1" style={{ marginTop: "20px" }}>
              Top 5 Fournisseurs
            </p>

            <Table striped hover size="sm">
              <thead style={{ background: "#454d55", color: "white" }}>
                <tr>
                  <th>Code</th>
                  <th>Raison Social</th>
                  <th>Montant</th>
                </tr>
              </thead>
              <tbody>
                {this.props.topfrss.topfrss.map((t) => (
                  <tr key={t.codfrs}>
                    <td> {t.codfrs} </td>
                    <td> {t.raisoc} </td>
                    <td> {Number(t.sommemntbn).toFixed(3)} </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    SelectTopclient: () => dispatch(SelectTopclient()),
    SelectTopFrs: () => dispatch(SelectTopFrs()),
  };
}

function mapStateToProps(state) {
  return {
    tops: state.tops,
    topfrss: state.topfrss,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TabTop);
