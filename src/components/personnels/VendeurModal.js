import React, { Component } from "react";
import { Modal, Row, Col, Card, Button } from "react-bootstrap";
import "../styling/Styles.css";
import { Bar, Line, Pie } from "react-chartjs-2";
import Axios from "axios";
import BCDVGraph from "./BCDVGraph";

const DATE_OPTIONS = {
  month: "short",
  day: "numeric",
};

class VendeurModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      change: true,
      data: {},
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div className="container">
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header
            closeButton
            style={{ backgroundColor: "white", color: "#020F64" }}
          >
            <Modal.Title id="contained-modal-title-vcenter">
              <b>
                Vendeur: {this.props.codvendeur} &nbsp;&nbsp;{" "}
                {this.props.libvendeur}
              </b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Card>
                  <Card.Body>
                    <div>
                      <Bar
                        data={this.props.data}
                        options={{ maintainAspectRatio: false }}
                        width={300}
                        height={200}
                      />
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col sm={6}>
                <Card>
                  <Card.Body>
                    {/* <div>
                      <Bar
                        data={this.props.datadv}
                        options={{ maintainAspectRatio: false }}
                        width={300}
                        height={200}
                      />
                    </div> */}
                  </Card.Body>
                </Card>
                {/* <Card>
                  <Card.Body>
                    <div>
                      <Button
                        onClick={() => this.setState({ change: false })}
                        variant="outline-info"
                      >
                        Devis
                      </Button>{" "}
                      &nbsp;
                      <Button
                        onClick={() => this.setState({ change: true })}
                        variant="outline-danger"
                      >
                        BC
                      </Button>
                    </div>
                    <div>
                      {this.state.change ? (
                        <div>
                          <p className="p1" style={{ margin: "10px" }}>
                            Total Montant des BC par jour
                          </p>

                          <div>
                            <Bar
                              data={this.props.data}
                              options={{ maintainAspectRatio: false }}
                              width={300}
                              height={200}
                            />
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="p1" style={{ margin: "10px" }}>
                            Total Montant des devis par jour
                          </p>
                          <Card>
                            <Card.Body>
                              <div>
                                <Bar
                                  data={this.props.datadv}
                                  options={{ maintainAspectRatio: false }}
                                  width={300}
                                  height={200}
                                />
                              </div>
                            </Card.Body>
                          </Card>
                        </div>
                      )}
                    </div>
                  </Card.Body>
                </Card> */}
                {/* <BCDVGraph /> */}
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default VendeurModal;
