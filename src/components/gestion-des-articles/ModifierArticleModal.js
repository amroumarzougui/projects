import React, { Component } from "react";
import { Modal, Form } from "react-bootstrap";
import "../styling/Styles.css";
import {
  TextField,
  MenuItem,
  CardHeader,
  Snackbar,
  IconButton,
} from "@material-ui/core";
import { Input, Label, FormGroup, Col, Row } from "reactstrap";
import Center from "react-center";
import { Button } from "reactstrap";
import Autocomplete from "@material-ui/lab/Autocomplete";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import { SelectSousFamille } from "../../redux/actions/GetSousFamille";
import { SelectNome } from "../../redux/actions/GetNome";
import { connect } from "react-redux";
import { SelectArticle } from "../../redux/actions/GetArticles";
import { SelectNomenclature } from "../../redux/actions/GetNomenclature";

const roundTo = require("round-to");

class ModifierArticleModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tt: "dqsd",
      purnhtnet: this.props.purevientnetht,
      remisefrs: this.props.remisefrs,
      purbrut: this.props.purevientbrut,
      purttc: this.props.purevientnetttc,
      tvaa: this.props.tvaarticle,
      marged: this.props.margeprrnet,
      pudhtt: this.props.puventeht,
      pudhttc: this.props.puventettc,
      tableunite: [
        { libele: "KG", name: 0 },
        { libele: "PI", name: 1 },
      ],
      tabletva: [
        { code: 0, label: 0 },
        { code: 1, label: 6 },
        { code: 2, label: 12 },
        { code: 3, label: 18 },
        { code: 5, label: 29 },
        { code: 6, label: 10 },
      ],
      van: [
        { code: "V", label: "Sur Vente" },
        { code: "A", label: "Sur Achat" },
        { code: "N", label: "Sans Faudec" },
      ],
      vann: [
        { code: "V", label: "Sur Vente" },
        { code: "A", label: "Sur Achat" },
        { code: "N", label: "Sans Faudec" },
      ],
      //  unite: "",
      codeabarre: "",
      designation: "",
      snackbaropen: false,
      snackbarmsg: ",",
    };
  }

  componentDidMount() {
    this.props.SelectNome();
    this.props.SelectSousFamille();
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
      `http://192.168.1.100:81/api/ARTICLEs?codart=${event.target.codart.value}&desart=${event.target.desart.value}&unite=${event.target.unite.value}&tautva=${event.target.tautva.value}&famart=${event.target.famart.value}&codbar=${event.target.codbar.value}&typfodec=${event.target.typfodec.value}&typdc=${event.target.typdc.value}&sousfam=${event.target.sousfam.value}&TDC=${event.target.TDC.value}&reffrs=${event.target.reffrs.value}&PUDTTC=${event.target.PUDTTC.value}&PUDHT=${event.target.PUDHT.value}&PURBHT=${event.target.PURBHT.value}
      &remisefrs=${event.target.remisefrs.value}
      &PURNHT=${event.target.PURNHT.value}
      &PURNTTC=${event.target.PURNTTC.value}
      &margedet=${event.target.margedet.value}`,
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
          this.props.onHide();
          this.props.SelectArticle();

          this.setState({ snackbaropen: true, snackbarmsg: result });
          console.log(result);

          window.location.reload();
        },
        (error) => {
          this.setState({ snackbaropen: true, snackbarmsg: "failed" });
        }
      );
    //  this.props.onHide01();
  };

  tvaaHandler = (event) => {
    this.setState({
      tvaa: event.target.value,
      pudhttc: roundTo(this.state.pudhtt * (1 + event.target.value / 100), 3),
      purttc: roundTo(this.state.purnhtnet * (1 + event.target.value / 100), 3),
    });
  };

  brutHandler = (event) => {
    const purnh = roundTo(
      event.target.value * (1 - this.state.remisefrs / 100),
      3
    );
    const pu = roundTo(purnh * (1 + this.state.marged / 100), 3);

    this.setState({
      purbrut: event.target.value,
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

    this.setState({
      marged: event.target.value,
      pudhtt: pudh,
      pudhttc: roundTo(pudh * (1 + this.state.tvaa / 100), 3),
    });
  };

  render() {
    console.log(`unité egale à${this.props.unitearticles}//`);
    return (
      <div className="container">
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={this.state.snackbaropen}
          autoHideDuration={6000}
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
              <b>Modifier Article</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: "white" }}>
            <div>
              <Form onSubmit={this.submitHandler}>
                <Row form>
                  <Col md={3}>
                    <Form.Group controlId="codart">
                      <Label className="labell">Code article</Label>
                      <Input
                        type="text"
                        name="codart"
                        defaultValue={this.props.codearticle}
                        disabled
                      ></Input>
                    </Form.Group>
                  </Col>

                  <Col md={3}>
                    <Form.Group controlId="codbar">
                      <Label className="labell">Code à barre</Label>
                      <Input
                        type="text"
                        name="codbar"
                        defaultValue={this.props.codeabarrearticle}
                      ></Input>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group controlId="desart">
                      <Label className="labell">Désignation</Label>
                      <Input
                        type="text"
                        name="desart"
                        defaultValue={this.props.designationarticle}
                      ></Input>
                    </Form.Group>
                  </Col>
                </Row>
                <Row form>
                  <Col md={3}>
                    <Form.Group controlId="unite">
                      <Label className="labell">Unité</Label>
                      <Input
                        type="select"
                        name="unite"
                        defaultValue={this.props.unitearticles}
                      >
                        {this.state.tableunite.map((t) => (
                          <option key={t.name} value={t.libele}>
                            {t.libele}
                          </option>
                        ))}
                      </Input>
                    </Form.Group>
                  </Col>

                  <Col md={3}>
                    <Form.Group controlId="famart">
                      <Label className="labell">Famille article</Label>
                      <Input
                        type="select"
                        name="famart"
                        defaultValue={this.props.famillearticle}
                      >
                        {this.props.nomes.nomes.map((t, index) => (
                          <option key={index} value={t.code}>
                            {t.code}
                          </option>
                        ))}
                      </Input>
                    </Form.Group>
                  </Col>

                  <Col md={3}>
                    <Form.Group controlId="sousfam">
                      <Label className="labell">Sous Famille</Label>
                      <Input
                        type="select"
                        name="sousfam"
                        defaultValue={this.props.sousfamillearticle}
                      >
                        {this.props.sousfamilles.sousfamilles.map(
                          (t, index) => (
                            <option key={index} value={t.code}>
                              {" "}
                              {t.code}{" "}
                            </option>
                          )
                        )}
                      </Input>
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group controlId="reffrs">
                      <Label className="labell">Réf Fournisseur</Label>
                      <Input
                        type="text"
                        name="reffrs"
                        defaultValue={this.props.reffrsarticle}
                      ></Input>
                    </Form.Group>
                  </Col>
                </Row>

                {/* <Card style={{ backgroundColor: "white", margin: "10px" }}>
                      <CardContent> */}
                <Row>
                  {/* <Col sm={3}>
                    <Form.Group controlId="tautva">
                      <TextField
                        id="outlined-select-currency"
                        select
                        label="TVA %"
                        margin="dense"
                        variant="outlined"
                        fullWidth
                        name="tautva"
                        onChange={this.tvaaHandler}
                        value={this.state.tvaa}
                      >
                        {this.state.tabletva.map((option) => (
                          <MenuItem key={option.code} value={option.label}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Form.Group>
                  </Col> */}

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
                                    (1 + parseInt(getOptionLabel.lib) / 100),
                                  3
                                ),
                                purttc: roundTo(
                                  this.state.purnhtnet *
                                    (1 + parseInt(getOptionLabel.lib) / 100),
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
                            value={this.state.tvaa}
                          />
                        )}
                      />
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
                        //  onChange={this.tvaaHandler}
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
                        defaultValue={this.props.typefodecarticle}
                      >
                        {this.state.van.map((option) => (
                          <MenuItem key={option.code} value={option.code}>
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
                        defaultValue={this.props.tauxdcarticle}
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
                        defaultValue={this.props.typedcarticle}
                      >
                        {this.state.vann.map((option) => (
                          <MenuItem key={option.code} value={option.code}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Form.Group>
                  </Col>
                </Row>
                {/* </CardContent>
                    </Card> */}

                <br />
                {/* ////////////////////////////////////////// partie des liste des prix//////////////////////////////////////////////////////// */}

                <Row sm={12}>
                  <Col>
                    <Card>
                      <CardHeader
                        style={{ height: "20px" }}
                        avatar={<MonetizationOnIcon />}
                        title="Prix De Revient"
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
                                value={this.state.purbrut}
                                onChange={this.brutHandler}
                                //  onChange={this.brutHandler}
                              />
                            </Form.Group>
                          </Col>
                          <Col sm={3}>
                            <Form.Group controlId="remisefrs">
                              <TextField
                                id="outlined-basic"
                                label="Remise Frs (%)"
                                variant="outlined"
                                margin="dense"
                                fullWidth
                                name="remisefrs"
                                value={this.state.remisefrs}
                                // defaultValue={this.state.remisefrs}
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
                                value={this.state.purnhtnet}
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
                                value={this.state.purttc}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        {/* ////////////////////////////////////////////////////////////////////// */}
                        <br />
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
                                value={this.state.marged}
                                onChange={this.margedHandler}
                              />
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
                                value={this.state.pudhtt}
                                //  defaultValue={this.props.puventeht}
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
                                // defaultValue={this.state.pudhttc}
                                value={this.state.pudhttc}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                      </CardContent>
                    </Card>
                  </Col>
                </Row>
                <br />
                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                <Row>
                  <Col sm={8}></Col>
                  <Col sm={4}>
                    {this.state.tt === "" ? (
                      <Center>
                        <Button
                          disabled
                          style={{ width: "100%", backgroundColor: "#020F64" }}
                          variant="outlined"
                          type="submit"
                        >
                          Enregistrer
                        </Button>
                      </Center>
                    ) : (
                      <Center>
                        <Button
                          style={{ width: "100%", backgroundColor: "#020F64" }}
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
    SelectArticle: () => dispatch(SelectArticle()),
    SelectNomenclature: () => dispatch(SelectNomenclature("TV")),
  };
}

function mapStateToProps(state) {
  return {
    nomes: state.nomes,
    sousfamilles: state.sousfamilles,
    nomenclatures: state.nomenclatures,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModifierArticleModal);
