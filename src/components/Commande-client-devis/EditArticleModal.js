import React, { Component } from "react";
import { Modal, Row, Col, FormGroup, Button } from "react-bootstrap";
import "../styling/Styles.css";
import { TextField, Snackbar, IconButton } from "@material-ui/core";
import { Label, Input } from "reactstrap";

const roundTo = require("round-to");

class EditArticleModal extends Component {
  constructor(props) {
    super(props);
    //  let totalh = this.props.totalhtt;
    this.state = {
      snackbaropen: false,
      snackbarmsg: "",
      //  puht: 0,
      totalht: 0,
      qte: this.props.quantt,
      shown: false,
    };
  }

  qteHandler = (event) => {
    const toti = roundTo(event.target.value * this.props.prixunix, 3);

    this.setState({
      qte: event.target.value,

      totalht: toti,
      shown: true,
    });
  };

  submitHandler = (event) => {
    event.preventDefault();

    fetch(
      `http://192.168.1.100:81/api/LigBCDV?numfac=${event.target.numfacccc.value}&numlig=${event.target.numligg.value}&codart=${event.target.artid.value}&quantite=${event.target.quantt.value}&remise=${event.target.remiss.value}&totalht=${event.target.totalhtt.value}&puttcnet=${event.target.puttcnett.value}`,
      {
        method: "PUT",
        header: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ snackbaropen: true, snackbarmsg: result });
        },
        (error) => {
          this.setState({ snackbaropen: true, snackbarmsg: "failed" });
        }
      );
    // this.props.SelectArticle();
    this.props.onHide();
    this.setState({ shown: false });
    // this.props.onHide01();
  };
  changeHandler = (event) => {
    this.setState({ Qtte: event.target.value });
  };

  snackbarClose = (event) => {
    this.setState({ snackbaropen: false });
  };

  render() {
    return (
      <div className="container">
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={this.state.snackbaropen}
          autoHideDuration={2000}
          onClose={this.snackbarClose}
          message={<span id="message-id"> {this.state.snackbarmsg} </span>}
          action={[
            <IconButton
              key="close"
              color="inherit"
              onClick={this.snackbarClose}
            >
              x
            </IconButton>,
          ]}
        ></Snackbar>

        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header
            closeButton
            style={{ backgroundColor: "#eee", color: "#020F64" }}
          >
            <Modal.Title id="contained-modal-title-vcenter">
              <b>
                Edit ligne article <span>{this.props.artid}</span>
              </b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: "#eee" }}>
            <form onSubmit={this.submitHandler}>
              <Row>
                <FormGroup>
                  <TextField
                    id="standard-basic"
                    label="Numfac"
                    defaultValue={this.props.numfacccc}
                    fullWidth
                    name="numfacccc"
                    disabled
                    style={{ display: "none" }}
                  />
                </FormGroup>

                <FormGroup>
                  <TextField
                    id="standard-basic"
                    label="NumLig"
                    defaultValue={this.props.numligg}
                    fullWidth
                    name="numligg"
                    style={{ display: "none" }}
                  />
                </FormGroup>

                <Col sm={2}>
                  <FormGroup>
                    <TextField
                      id="standard-basic"
                      label="codart"
                      defaultValue={this.props.artid}
                      fullWidth
                      name="artid"
                      disabled
                    />
                  </FormGroup>
                </Col>

                <Col sm={2}>
                  <FormGroup>
                    <TextField
                      id="standard-basic"
                      label="prixuni"
                      defaultValue={this.props.prixunix}
                      fullWidth
                      disabled
                      value={this.props.prixunix}
                    />
                  </FormGroup>
                </Col>

                <Col sm={2}>
                  <FormGroup>
                    {/* <Label className="labell">Quantité</Label>
                      <Input
                        type="text"
                        name="quantt"
                        value={this.state.qte}
                        onChange={this.qteHandler}
                        // defaultValue={this.props.codeabarrearticle}
                      ></Input> */}

                    <TextField
                      id="standard-basic"
                      label="Quantite"
                      defaultValue={this.props.quantt}
                      fullWidth
                      name="quantt"
                      onChange={this.qteHandler}
                    />
                  </FormGroup>
                </Col>
                <Col sm={2}>
                  <FormGroup>
                    <TextField
                      id="standard-basic"
                      label="Remise"
                      defaultValue={this.props.remiss}
                      fullWidth
                      name="remiss"
                    />
                  </FormGroup>
                </Col>
                <Col sm={2}>
                  <FormGroup>
                    {this.state.shown ? (
                      <TextField
                        id="standard-basic"
                        label="TotalHT"
                        // defaultValue={this.props.totalhtt}
                        fullWidth
                        name="totalhtt"
                        value={this.state.totalht}
                      />
                    ) : (
                      <TextField
                        id="standard-basic"
                        label="TotalHT"
                        defaultValue={this.props.totalhtt}
                        fullWidth
                        name="totalhtt"
                      />
                    )}
                  </FormGroup>
                </Col>
                <Col sm={2}>
                  <FormGroup>
                    <TextField
                      id="standard-basic"
                      label="PUTTCNET"
                      defaultValue={this.props.puttcnett}
                      fullWidth
                      name="puttcnett"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col sm={8}></Col>
                <Col sm={4}>
                  {this.state.shown ? (
                    <Button
                      type="submit"
                      className="btn btn-info"
                      style={{ width: "100%" }}
                    >
                      Enregistrer
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="btn btn-secondary"
                      style={{ width: "100%" }}
                      disabled
                    >
                      Enregistrer
                    </Button>
                  )}
                </Col>
              </Row>
            </form>
          </Modal.Body>
          {/* <Modal.Footer></Modal.Footer> */}
        </Modal>
      </div>
    );
  }
}

export default EditArticleModal;
