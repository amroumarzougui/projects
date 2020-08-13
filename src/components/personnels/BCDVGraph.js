import React, { Component } from "react";
import { Tabs, Tab, Table, Button } from "react-bootstrap";
import { connect } from "react-redux";
import FTChart from "../home-page/FTChart";
import AchatChart from "../home-page/AchatChart";

class BCDVGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      change: false,
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <div>
          <Button
            onClick={() => this.setState({ change: false })}
            variant="outline-info"
          >
            BL
          </Button>{" "}
          &nbsp;
          <Button
            onClick={() => this.setState({ change: true })}
            variant="outline-danger"
          >
            Facture
          </Button>
        </div>
        <div>
          {this.state.change ? (
            <div>
              <p className="p1" style={{ margin: "10px" }}>
                Total Montant des Factures par jour
              </p>

              <FTChart />
            </div>
          ) : (
            <div>
              <p className="p1" style={{ margin: "10px" }}>
                Total Montant des BL par jour
              </p>

              <AchatChart></AchatChart>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default BCDVGraph;
