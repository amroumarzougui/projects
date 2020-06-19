import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import "../styling/Styles.css";
import { Input, Label, FormGroup, Col, Row } from "reactstrap";
import "../styling/Styling.scss";
import Center from "react-center";

class AddClientPassagerModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="container">
        <Modal
          {...this.props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header
            closeButton
            style={{ backgroundColor: "#17a2b8", color: "white" }}
          >
            <Modal.Title id="contained-modal-title-vcenter">
              <b>MAJ du Client Passager</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: "#17a2b8" }}>
            <div style={{ padding: 15 }}>
              <Row>
                <Col sm={12}>
                  <form>
                    <FormGroup row>
                      <Label className="txt" for="numpiece" sm={4}>
                        Piéce №
                      </Label>
                      <Col sm={8}>
                        <Input
                          type="text"
                          name="numpiece"
                          id="numpiece"
                          disabled
                          defaultValue={this.props.dvnumfac}
                          placeholder="Piéce №..."
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label className="txt" for="raisoc" sm={4}>
                        Raison sociale
                      </Label>
                      <Col sm={8}>
                        <Input
                          type="text"
                          name="raisoc"
                          id="raisoc"
                          defaultValue={this.props.dvraisoc}
                          placeholder="Raison sociale..."
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label className="txt" for="adresse" sm={4}>
                        Adresse
                      </Label>
                      <Col sm={8}>
                        <Input
                          type="text"
                          name="adresse"
                          id="adresse"
                          placeholder="Adresse ..."
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Label className="txt" for="cdp" sm={4}>
                        Code postal
                      </Label>
                      <Col sm={3}>
                        <Input
                          type="text"
                          name="cdp"
                          id="cdp"
                          placeholder="..."
                        />
                      </Col>
                      <Label className="txt" for="ville" sm={1}>
                        Ville
                      </Label>
                      <Col sm={4}>
                        <Input
                          type="text"
                          name="ville"
                          id="ville"
                          placeholder="Ville ..."
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Label className="txt" for="pays" sm={4}>
                        Pays
                      </Label>
                      <Col sm={8}>
                        <Input
                          type="text"
                          name="pays"
                          id="pays"
                          placeholder="Pays ..."
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label className="txt" for="tva" sm={4}>
                        Code TVA
                      </Label>
                      <Col sm={4}>
                        <Input
                          type="text"
                          name="tva"
                          id="tva"
                          placeholder="Code TVA ..."
                        />
                      </Col>

                      <Label className="txt" sm={4}>
                        Timbre &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Input
                          type="checkbox"
                          style={{ width: "20px", height: "20px" }}
                        />{" "}
                      </Label>
                    </FormGroup>
                    <br />

                    <Center>
                      <button
                        className="button"
                        // onClick={console.log("hhhhhhhh")}
                      >
                        Enregistrer
                        <div className="button__horizontal"></div>
                        <div className="button__vertical"></div>
                      </button>
                    </Center>
                  </form>
                </Col>
              </Row>
            </div>
          </Modal.Body>
          {/* <Modal.Footer></Modal.Footer> */}
        </Modal>
      </div>
    );
  }
}

export default AddClientPassagerModal;
