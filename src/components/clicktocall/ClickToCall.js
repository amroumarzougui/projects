import React, { Component } from "react";
import { Row, Col } from "reactstrap";

import { Tabs, Tab, Table } from "react-bootstrap";
import ClientCall from "./ClientCall";

class ClickToCall extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <div className="page-icon">
          <u>
            {" "}
            <i class="fas fa-phone-volume"> Click To Call</i>
          </u>
        </div>
        <Tabs
          defaultActiveKey="home"
          transition={false}
          id="noanim-tab-example"
        >
          <Tab eventKey="home" title="Client" style={{ padding: "5px" }}>
            <Row>
              <Col>
                {/* <Famille /> */}
                <ClientCall />
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="profile" title="Fournisseur">
            <Row>
              <Col sm={3}></Col>
              <Col>
                <h3
                  style={{
                    margin: "20px",
                    marginTop: "30px",
                    color: "#6610f2",
                  }}
                >
                  Fournisseurs
                </h3>
                {/* <SousFamille /> */}
              </Col>
              <Col sm={3}></Col>
            </Row>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default ClickToCall;
