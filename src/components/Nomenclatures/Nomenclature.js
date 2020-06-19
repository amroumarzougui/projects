import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import AddFamilleModal from "../gestion-des-articles/AddFamilleModal";
import AddSousFamilleModal from "../gestion-des-articles/AddSousFamilleModal";
import { Tooltip } from "@material-ui/core";
import { Button } from "react-bootstrap";

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
        <h3>Nomenclature</h3>
        <Row>
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
      </div>
    );
  }
}

export default Nomenclature;
