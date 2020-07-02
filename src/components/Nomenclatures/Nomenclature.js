import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import AddFamilleModal from "../gestion-des-articles/AddFamilleModal";
import AddSousFamilleModal from "../gestion-des-articles/AddSousFamilleModal";
import { Tooltip } from "@material-ui/core";
import { Button } from "react-bootstrap";
import { Tabs, Tab, Table } from "react-bootstrap";
import Famille from "./Famille";
import SousFamille from "./SousFamille";
import TVA from "./TVA";

class Nomenclature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addFamilleModalShow: false,
      addSousFamilleModalShow: false,
    };
  }
  render() {
    let addFamilleModalClose = () =>
      this.setState({ addFamilleModalShow: false });

    let addSousFamilleModalClose = () =>
      this.setState({ addSousFamilleModalShow: false });
    return (
      <div>
        <div className="page-icon">
          <u>
            {" "}
            <i class="far fa-plus-square"> Nomenclature</i>
          </u>
        </div>
        <Tabs
          defaultActiveKey="home"
          transition={false}
          id="noanim-tab-example"
        >
          <Tab eventKey="home" title="Famille">
            <Row>
              <Col sm={3}></Col>
              <Col>
                <h3
                  style={{
                    margin: "20px",
                    marginTop: "30px",
                    color: "#17a2b8",
                  }}
                >
                  Ajouter Famille Article
                </h3>
                <Famille />
              </Col>
              <Col sm={3}></Col>
            </Row>
          </Tab>
          <Tab eventKey="profile" title="Sous Famille">
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
                  Ajouter Sous-Famille Article
                </h3>
                <SousFamille />
              </Col>
              <Col sm={3}></Col>
            </Row>
          </Tab>

          <Tab eventKey="tva" title="TVA">
            <Row>
              <Col sm={3}></Col>
              <Col>
                <h3
                  style={{
                    margin: "20px",
                    marginTop: "30px",
                    color: "#17a2b8",
                  }}
                >
                  Ajouter TVA
                </h3>
                <TVA />
              </Col>
              <Col sm={3}></Col>
            </Row>
          </Tab>
        </Tabs>

        {/* <Row>
          <Col sm={5}>
            <Tooltip title="ajouter une nouvelle famille article">
              <Button
                variant="outline-info"
                style={{
                  width: "100%",
                  height: "100px",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
                onClick={() => this.setState({ addFamilleModalShow: true })}
              >
                Ajouter Famille
              </Button>
            </Tooltip>
            <AddFamilleModal
              show={this.state.addFamilleModalShow}
              onHide={addFamilleModalClose}
            />
          </Col>

          <Col sm={2}></Col>

          <Col sm={5}>
            <Tooltip title="ajouter une nouvelle Sous famille article">
              <Button
                variant="outline-info"
                style={{
                  width: "100%",
                  height: "100px",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
                onClick={() => this.setState({ addSousFamilleModalShow: true })}
              >
                Ajouter sous-famille
              </Button>
            </Tooltip>
            <AddSousFamilleModal
              show={this.state.addSousFamilleModalShow}
              onHide={addSousFamilleModalClose}
            />
          </Col>
        </Row>
      */}
      </div>
    );
  }
}

export default Nomenclature;
