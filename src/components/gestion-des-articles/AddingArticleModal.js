import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "../styling/Styles.css";
import {
  TextField,
  MenuItem,
  CardHeader,
  Snackbar,
  IconButton,
  Fab,
} from "@material-ui/core";
import { Input, Label, FormGroup, Col, Row } from "reactstrap";
import Center from "react-center";
import Autocomplete from "@material-ui/lab/Autocomplete";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import { SelectNome } from "../../redux/actions/GetNome";
import { connect } from "react-redux";
import { SelectSousFamille } from "../../redux/actions/GetSousFamille";
import { GetCodart } from "../../redux/actions/GetCodart";
import { SelectArticle } from "../../redux/actions/GetArticles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Tooltip from "@material-ui/core/Tooltip";
import AddFamilleModal from "./AddFamilleModal";
import AddSousFamilleModal from "./AddSousFamilleModal";
import AddBoxIcon from "@material-ui/icons/AddBox";
import InputMask from "react-input-mask";
import Mask from "react-masking";
import NumberFormat from "react-number-format";
import { SelectNomenclature } from "../../redux/actions/GetNomenclature";

const roundTo = require("round-to");

class AddingArticleModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tt: "dqsd",
      purnhtnet: 0,
      remisefrs: 0,
      purbrut: 0,
      purttc: 0,
      tvaa: 0,
      marged: 0,
      pudhtt: 0,
      pudhttc: 0,
      tableunite: [
        { libele: "KG", name: "KG" },
        { libele: "PI", name: "PI" },
      ],
      tabletva: [
        { code: 0, label: 0 },
        { code: 1, label: 7 },
        { code: 2, label: 10 },
        { code: 3, label: 19 },
      ],
      van: [
        { code: "V", label: "Sur Vente" },
        { code: "A", label: "Sur Achat" },
        { code: "N", label: "Sans Faudec" },
      ],
      unite: "",
      famille: "",
      // codeabarre: "",
      // designation: "",
      snackbaropen: false,
      snackbarmsg: ",",
    };
  }

  componentDidMount() {
    this.props.SelectNome();
    this.props.SelectSousFamille();
    this.props.GetCodart();
    this.props.SelectArticle();
    this.props.SelectNomenclature("TV");
  }

  snackbarClose = () => {
    this.setState({ snackbaropen: false });
  };

  codeabarrechange = (event) => {
    this.setState({
      codeabarre: event.target.value,
    });
  };

  designationchange = (event) => {
    this.setState({
      designation: event.target.value,
    });
  };

  submitHandler = (event) => {
    event.preventDefault();

    fetch(
      `http://192.168.1.100:81/api/ARTICLEs?codart=${event.target.codart.value}
    &desart=${event.target.desart.value}
    &unite=${event.target.unite.value}
    &tautva=${event.target.tautva.value}
    &famart=${event.target.famart.value}
    &codbar=${event.target.codbar.value}
    &reffrs=${event.target.reffrs.value}
    &PUDTTC=${event.target.PUDTTC.value}
    &typfodec=${event.target.typfodec.value}
    &typdc=${event.target.typdc.value}
    &PUDHT=${event.target.PUDHT.value}
    &sousfam=${event.target.sousfam.value}
    &TDC=${event.target.TDC.value}
    &PURBHT=${event.target.PURBHT.value}
    &remisefrs=${event.target.remisefrs.value}
    &PURNHT=${event.target.PURNHT.value}
    &PURNTTC=${event.target.PURNTTC.value}
    &margedet=${event.target.margedet.value}`,
      {
        method: "POST",
        header: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.props.onHide();
          this.props.SelectArticle();

          this.setState({ snackbaropen: true, snackbarmsg: result });
          this.props.GetCodart();
          console.log(result);

          window.location.reload();
        },
        (error) => {
          this.setState({ snackbaropen: true, snackbarmsg: "failed" });
        }
      );
  };

  tvaaHandler = (event) => {
    this.setState({
      tvaa: event.target.value,
      pudhttc: roundTo(this.state.pudhtt * (1 + event.target.value / 100), 3),
      purttc: roundTo(this.state.purnhtnet * (1 + event.target.value / 100), 3),
    });
  };

  // codtvaHandler = (event) => {
  //   this.setState({
  //     tvaa: this.props.nomenclatures.nomenclatures.map((t) => t.lib),
  //   });
  // };

  brutHandler = (event) => {
    const purnh = roundTo(
      event.target.value * (1 - this.state.remisefrs / 100),
      3
    );
    const pu = roundTo(purnh * (1 + this.state.marged / 100), 3);

    this.setState({
      purbrut: Number(event.target.value).toFixed(3),
      purnhtnet: purnh,
      purttc: roundTo(purnh * (1 + this.state.tvaa / 100), 3),
      pudhtt: pu,
      pudhttc: roundTo(pu * (1 + this.state.tvaa / 100), 3),
    });
  };

  remisefrsHandler = (event) => {
    const purnh = roundTo(
      this.state.purbrut * (1 - event.target.value / 100),
      3
    );

    this.setState({
      remisefrs: event.target.value,
      purnhtnet: purnh,
      purttc: roundTo(
        this.state.purbrut *
          (1 - event.target.value / 100) *
          (1 + this.state.tvaa / 100),
        3
      ),
    });
  };

  margedHandler = (event) => {
    const pudh = roundTo(
      this.state.purnhtnet * (1 + event.target.value / 100),
      3
    );
    const tuut = event.target.value;

    this.setState({
      marged: tuut,
      pudhtt: pudh,
      pudhttc: roundTo(pudh * (1 + this.state.tvaa / 100), 3),
    });
  };

  render() {
    console.log(
      "codart=",
      this.props.codarts.codarts.map((cod) => cod.Column1 + 1)
    );
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
            style={{ backgroundColor: "white", color: "#020F64" }}
          >
            <Modal.Title id="contained-modal-title-vcenter">
              <b>Ajouter Article</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <Form onSubmit={this.submitHandler}>
                <Row sm={12}>
                  <Col>
                    <Card>
                      <CardContent>
                        <Row form style={{ marginBottom: "0px" }}>
                          <Col md={3}>
                            <Form.Group controlId="codart">
                              {this.props.codarts.codarts.map((cod) => (
                                <TextField
                                  id="standard-basic"
                                  label="Code article"
                                  margin="dense"
                                  variant="outlined"
                                  fullWidth
                                  name="codart"
                                  value={parseInt(cod.Column1)}
                                  disabled
                                />
                              ))}
                            </Form.Group>
                          </Col>

                          <Col md={3}>
                            <Form.Group controlId="codbar">
                              <TextField
                                id="standard-basic"
                                label="Code à barre"
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                name="codbar"
                              />
                            </Form.Group>
                          </Col>

                          <Col md={6}>
                            <Form.Group controlId="desart">
                              <TextField
                                id="standard-basic"
                                label="Désignation"
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                name="desart"
                                required
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row form>
                          <Col md={3}>
                            <Form.Group controlId="unite">
                              <Autocomplete
                                id="include-input-in-list"
                                includeInputInList
                                className="ajouter-client-input"
                                options={this.state.tableunite}
                                getOptionLabel={(option) => option.name}
                                onChange={(event, getOptionLabel) => {
                                  getOptionLabel
                                    ? this.setState({
                                        unite: getOptionLabel.name,
                                      })
                                    : this.setState({
                                        unite: "",
                                      });
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Unité"
                                    margin="dense"
                                    variant="outlined"
                                    required
                                    name="unite"
                                    fullWidth
                                  />
                                )}
                              />
                            </Form.Group>
                          </Col>

                          <Col md={3}>
                            <Form.Group controlId="famart">
                              <Autocomplete
                                id="include-input-in-list"
                                includeInputInList
                                className="ajouter-client-input"
                                options={this.props.nomes.nomes}
                                getOptionLabel={(option) => option.code}
                                onChange={(event, getOptionLabel) => {
                                  getOptionLabel
                                    ? this.setState({
                                        famille: getOptionLabel.code,
                                      })
                                    : this.setState({
                                        famille: "",
                                      });
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Famille"
                                    margin="dense"
                                    variant="outlined"
                                    fullWidth
                                    name="famart"
                                  />
                                )}
                              />
                            </Form.Group>
                          </Col>

                          <Col md={3}>
                            <Form.Group controlId="sousfam">
                              <Autocomplete
                                id="include-input-in-list"
                                includeInputInList
                                className="ajouter-client-input"
                                options={this.props.sousfamilles.sousfamilles}
                                getOptionLabel={(option) =>
                                  option.chdec == this.state.famille
                                    ? option.code
                                    : ""
                                }
                                onChange={(event, getOptionLabel) => {
                                  getOptionLabel
                                    ? this.setState({
                                        unite: getOptionLabel.name,
                                      })
                                    : this.setState({
                                        unite: "",
                                      });
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Sous Famille"
                                    margin="dense"
                                    variant="outlined"
                                    fullWidth
                                    name="sousfam"
                                  />
                                )}
                              />
                            </Form.Group>
                          </Col>

                          <Col md={3}>
                            <Form.Group controlId="reffrs">
                              <TextField
                                type="text"
                                label="Réf Fournisseur"
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                name="reffrs"
                              />
                            </Form.Group>
                          </Col>
                        </Row>

                        <Row>
                          <Col sm={2}>
                            <Form.Group controlId="codtva">
                              <Autocomplete
                                id="include-input-in-list"
                                includeInputInList
                                className="ajouter-client-input"
                                options={this.props.nomenclatures.nomenclatures}
                                getOptionLabel={(option) => option.code}
                                onChange={(event, getOptionLabel) => {
                                  getOptionLabel
                                    ? this.setState({
                                        tvaa: getOptionLabel.lib,
                                        pudhttc: roundTo(
                                          this.state.pudhtt *
                                            (1 +
                                              parseInt(getOptionLabel.lib) /
                                                100),
                                          3
                                        ),
                                        purttc: roundTo(
                                          this.state.purnhtnet *
                                            (1 +
                                              parseInt(getOptionLabel.lib) /
                                                100),
                                          3
                                        ),
                                      })
                                    : this.setState({
                                        tvaa: 0,
                                      });
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="TVA"
                                    margin="dense"
                                    variant="outlined"
                                    fullWidth
                                    //  onChange={this.clientHandlerChange}
                                    // name="tautva"
                                  />
                                )}
                              />
                              {/* <TextField
                                id="outlined-select-currency"
                                select
                                label="Code TVA"
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                name="codtva"
                                required
                                // onChange={this.codtvaHandler}
                                // value={this.state.tvaa}
                              >
                                {this.props.nomenclatures.nomenclatures.map(
                                  (option) => (
                                    <MenuItem
                                      key={option.code}
                                      value={option.code}
                                      
                                    >
                                      {option.code}
                                    </MenuItem>
                                  )
                                )}
                              </TextField> */}
                            </Form.Group>
                          </Col>

                          <Col sm={2}>
                            <Form.Group controlId="tautva">
                              <TextField
                                label="%"
                                id="outlined-margin-dense"
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                name="tautva"
                                disabled
                                value={this.state.tvaa}
                              />
                            </Form.Group>
                          </Col>

                          <Col sm={3}>
                            <Form.Group controlId="typfodec">
                              <TextField
                                id="outlined-select-currency"
                                select
                                label="Type Fodec"
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                name="typfodec"
                              >
                                {this.state.van.map((option) => (
                                  <MenuItem
                                    key={option.code}
                                    value={option.code}
                                  >
                                    {option.label}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </Form.Group>
                          </Col>
                          <Col sm={2}>
                            <Form.Group controlId="TDC">
                              <TextField
                                label="Taux D.C"
                                id="outlined-margin-dense"
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                name="TDC"
                              />
                            </Form.Group>
                          </Col>
                          <Col sm={3}>
                            <Form.Group controlId="typdc">
                              <TextField
                                id="outlined-select-currency"
                                select
                                label="Type DC"
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                name="typdc"
                              >
                                {this.state.van.map((option) => (
                                  <MenuItem
                                    key={option.code}
                                    value={option.code}
                                  >
                                    {option.label}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </Form.Group>
                          </Col>
                        </Row>
                      </CardContent>
                    </Card>
                  </Col>
                </Row>

                <br />
                {/* ////////////////////////////////////////////////////////////////////////////////////////////////// */}

                <Row sm={12}>
                  <Col>
                    <Card>
                      <CardHeader
                        style={{ height: "20px" }}
                        avatar={<MonetizationOnIcon />}
                        title="Prix"
                      />
                      <CardContent>
                        <Row>
                          <Col sm={3}>
                            <Form.Group controlId="PURBHT">
                              <TextField
                                id="outlined-basic"
                                label="P.U Revient Brut HT"
                                variant="outlined"
                                margin="dense"
                                fullWidth
                                name="PURBHT"
                                onChange={this.brutHandler}
                                defaultValue={this.state.purbrut}
                              />
                            </Form.Group>
                          </Col>
                          <Col sm={3}>
                            <Form.Group controlId="remisefrs">
                              <TextField
                                id="outlined-basic"
                                label="Remise Frs (%)"
                                variant="outlined"
                                fullWidth
                                name="remisefrs"
                                margin="dense"
                                // value={this.state.remisefrs}
                                defaultValue={this.state.remisefrs}
                                onChange={this.remisefrsHandler}
                              />
                            </Form.Group>
                          </Col>
                          <Col sm={3}>
                            <Form.Group controlId="PURNHT">
                              <TextField
                                id="outlined-basic"
                                label="P.U Revient Net HT"
                                variant="outlined"
                                margin="dense"
                                fullWidth
                                name="PURNHT"
                                value={this.state.purnhtnet.toFixed(3)}
                              />
                            </Form.Group>
                          </Col>
                          <Col sm={3}>
                            <Form.Group controlId="PURNTTC">
                              <TextField
                                id="outlined-basic"
                                label="P.U Revient Net TTC"
                                variant="outlined"
                                margin="dense"
                                fullWidth
                                name="PURNTTC"
                                value={this.state.purttc.toFixed(3)}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        {/* ////////////////////////////////////////////////////////////////////// */}
                        <Row>
                          <Col sm={3}>
                            <Form.Group controlId="margedet">
                              <TextField
                                id="outlined-basic"
                                label="Marge/ P.R Net (%)"
                                variant="outlined"
                                margin="dense"
                                fullWidth
                                name="margedet"
                                // defaultValue={this.state.marged}
                                value={this.state.marged}
                                onChange={this.margedHandler}
                              />
                              {/* <InputMask
                                mask="/.000"
                                onChange={this.margedHandler}
                                value={this.state.marged}
                                name="margedet"
                              /> */}
                              {/* <Mask mask="#.###">
                                <input
                                  type="text"
                                  onChange={this.margedHandler}
                                  value={this.state.marged}
                                />
                              </Mask> */}
                              {/* <NumberFormat mask="n3" /> */}
                              {/* <input mask="n3"></input> */}
                            </Form.Group>
                          </Col>
                          <Col sm={3}>
                            <Form.Group controlId="PUDHT">
                              <TextField
                                id="outlined-basic"
                                label="P.U Vente HT"
                                variant="outlined"
                                margin="dense"
                                fullWidth
                                name="PUDHT"
                                value={this.state.pudhtt.toFixed(3)}
                              />
                            </Form.Group>
                          </Col>
                          <Col sm={3}>
                            <Form.Group controlId="PUDTTC">
                              <TextField
                                id="outlined-basic"
                                label="P.U Vente TTC"
                                variant="outlined"
                                margin="dense"
                                fullWidth
                                name="PUDTTC"
                                value={this.state.pudhttc.toFixed(3)}
                              />
                            </Form.Group>
                          </Col>

                          {/* //////test////////////// */}
                        </Row>
                      </CardContent>
                    </Card>
                  </Col>
                </Row>

                <br />
                <Row>
                  <Col sm={8}></Col>
                  <Col sm={4}>
                    {this.state.tt === "" ? (
                      <Center>
                        <Button
                          disabled
                          style={{ width: "100%" }}
                          variant="outlined"
                          //color="primary"
                          type="submit"
                        >
                          Enregistrer
                        </Button>
                      </Center>
                    ) : (
                      <Center>
                        <Button
                          style={{
                            width: "100%",
                            background: "#020f64",
                            color: "white",
                          }}
                          //color="primary"

                          type="submit"
                        >
                          Enregistrer
                        </Button>
                      </Center>
                    )}
                  </Col>
                </Row>
              </Form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    SelectNome: () => dispatch(SelectNome()),
    SelectSousFamille: () => dispatch(SelectSousFamille()),
    GetCodart: () => dispatch(GetCodart()),
    SelectArticle: () => dispatch(SelectArticle()),
    SelectNomenclature: () => dispatch(SelectNomenclature("TV")),
  };
}

function mapStateToProps(state) {
  return {
    nomes: state.nomes,
    sousfamilles: state.sousfamilles,
    codarts: state.codarts,
    nomenclatures: state.nomenclatures,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddingArticleModal);
