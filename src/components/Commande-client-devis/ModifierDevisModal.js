import React, { Component } from 'react';
import { Modal, Card } from 'react-bootstrap';
import '../styling/Styles.css';
import { Input, Label, FormGroup, Col, Row, Button } from "reactstrap";
import { connect } from "react-redux";
import { SelectArticle } from "../../redux/actions/GetArticles";
import { TextField, Fab } from "@material-ui/core";
import "../styling/Styling.scss";
import Center from "react-center";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import EditArticleModal from "./EditArticleModal";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import Checkbox from '@material-ui/core/Checkbox';
import EditIcon from '@material-ui/icons/Edit';

import Autocomplete from '@material-ui/lab/Autocomplete';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';


const roundTo = require('round-to');




class ModifierDevisModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codearticle: '',
      qte: '',
      totalht: 0,
      des: '',
      unite: '',
      puht: '',
      remisea: 0,
      tva: 0,
      puttcnet: 0,
      faudec: "N",
      //   tab: [],
      tab: this.props.testt,
      gilad: true,
      btnEnabled: false,

      totalqte: this.props.totalqtee,
      sumremisearticle: 0,
      totalhtbrut: 0,
      //   totaltva: 0,
      totaltva: this.props.tvaaa,
      totalhtnet: 0,
      remiseglobal: 0,
      netapayer: 0,
    }
  }


  componentDidMount() {
    this.props.SelectArticle();
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  qteHandler = event => {
    this.setState({
      qte: event.target.value,
      puttcnet: (this.state.puht + (this.state.puht * (this.state.tva / 100))),
      totalht: (event.target.value * this.state.puht),

    })
  };


  submitHandler = event => {
    event.preventDefault();

    const newtab = this.state.tab.concat({
      codearticle: this.state.codearticle,
      des: this.state.des,
      qte: this.state.qte,
      unite: this.state.unite,
      puht: this.state.puht,
      faudec: this.state.faudec,
      remisea: this.state.remisea,
      tva: this.state.tva,
      puttcnet: this.state.puttcnet,
      totalht: this.state.totalht,
    });
    const SumQte = newtab && newtab.reduce((a, v) => a + parseInt(v.qte), 0);
    const SumRemiseArticle = newtab && newtab.reduce((a, v) => a + (parseInt(v.qte) * v.puht * v.remisea) / 100, 0);
    const SumHtBrut = newtab && newtab.reduce((a, v) => a + (parseInt(v.qte) * v.puht), 0);
    const SumTva = newtab && newtab.reduce((a, v) => a + ((parseInt(v.qte) * v.puht * ((100 - v.remisea) / 100) * (v.tva / 100))), 0);
    const SumHtNet = newtab && newtab.reduce((a, v) => a + (v.totalht * ((100 - this.props.rem) / 100)), 0);
    const SumRemiseGlobale = newtab && newtab.reduce((a, v) => a + (v.totalht * (this.props.rem / 100)), 0);
    const SumNetAPayer = newtab && newtab.reduce((a, v) => a + ((v.totalht * ((100 - this.props.rem) / 100)) + ((v.qte * v.puht * ((100 - v.remisea) / 100) * (v.tva / 100)))), 0);

    this.setState({
      tab: newtab,

      totalqte: SumQte,
      sumremisearticle: SumRemiseArticle,
      totalhtbrut: SumHtBrut,
      totaltva: SumTva,
      totalhtnet: SumHtNet,
      remiseglobal: SumRemiseGlobale,
      netapayer: SumNetAPayer,
      snackbaropen: true,
      btnEnabled: true,
    });

    this.setState({
      codearticle: '',
      qte: '',
      totalht: 0,
      des: '',
      unite: '',
      puht: '',
      remisea: 0,
      tva: 0,
      puttcnet: 0,
      faudec: "N",
    });
    console.log(this.state.totalqte);
  };


  deleteRow = index => {
    var tab = [...this.state.tab];
    tab.splice(index, 1);
    const SumQte = tab && tab.reduce((a, v) => a + parseInt(v.qte), 0);
    const SumRemiseArticle = tab && tab.reduce((a, v) => a + (parseInt(v.qte) * v.puht * v.remisea) / 100, 0);
    const SumHtBrut = tab && tab.reduce((a, v) => a + (parseInt(v.qte) * v.puht), 0);
    const SumTva = tab && tab.reduce((a, v) => a + ((parseInt(v.qte) * v.puht * ((100 - v.remisea) / 100) * (v.tva / 100))), 0);
    const SumHtNet = tab && tab.reduce((a, v) => a + (v.totalht * ((100 - this.props.rem) / 100)), 0);
    const SumRemiseGlobale = tab && tab.reduce((a, v) => a + (v.totalht * (this.props.rem / 100)), 0);
    const SumNetAPayer = tab && tab.reduce((a, v) => a + ((v.totalht * ((100 - this.props.rem) / 100)) + ((parseInt(v.qte) * v.puht * ((100 - v.remisea) / 100) * (v.tva / 100)))), 0);

    this.setState({
      tab,
      totalqte: SumQte,
      sumremisearticle: SumRemiseArticle,
      totalhtbrut: SumHtBrut,
      totaltva: SumTva,
      totalhtnet: SumHtNet,
      remiseglobal: SumRemiseGlobale,
      netapayer: SumNetAPayer,
      snackbarfail: true,
    });


  };

  render() {
    //         var curr = this.props.dateDeviss;
    // var date = curr.toString().substr(0, 10); 
    return (
      <div className="container">

        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton style={{ backgroundColor: "white", color: "#00087E" }}>
            <Modal.Title id="contained-modal-title-vcenter">
              Liste des articles <b>{this.props.numDeviss}</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body >


            <Row  >
              <Col>
                <Card>
                  <Card.Body>


                    <form onSubmit={this.submitHandler}>
                      <Row form>
                        <Col sm={4}>
                          <FormGroup>
                            <Label>Chercher article par :</Label>
                            <Typography component="div">
                              <Grid component="label" container alignItems="center" spacing={1}>
                                <Grid item>Désignation</Grid>
                                <Grid item>
                                  <Switch color="primary" checked={this.state.gilad}
                                    onChange={this.handleChange('gilad')} value="gilad" />
                                </Grid>
                                <Grid item style={{ color: "#3f51b5" }}>Code</Grid>
                              </Grid>
                            </Typography>

                          </FormGroup>
                        </Col>

                        <Col sm={4}>

                          <FormGroup>
                            {this.state.gilad ?
                              <Autocomplete
                                id="include-input-in-list"
                                includeInputInList
                                className="ajouter-client-input"

                                options={this.props.articles.articles}
                                getOptionLabel={option => option.codart}

                                onChange={(event, getOptionLabel) => {
                                  getOptionLabel ?
                                    this.setState({
                                      codearticle: getOptionLabel.codart,
                                      des: getOptionLabel.desart,
                                      unite: getOptionLabel.unite,
                                      puht: getOptionLabel.PUDHT,
                                      remisea: getOptionLabel.remise,
                                      tva: getOptionLabel.tautva,
                                      faudec: getOptionLabel.typfodec,
                                    })

                                    :
                                    this.setState({
                                      codearticle: '',
                                      totalht: 0,
                                      des: '',
                                      unite: '',
                                      puht: '',
                                      remisea: 0,
                                      tva: 0,
                                      faudec: "N"
                                    })
                                }}

                                renderInput={params => (
                                  <TextField
                                    {...params}
                                    label="Code article"
                                    margin="normal"
                                    fullWidth
                                  />
                                )}
                              />
                              :
                              <Autocomplete
                                id="include-input-in-list"
                                includeInputInList
                                className="ajouter-client-input"

                                options={this.props.articles.articles}
                                getOptionLabel={option => option.desart}

                                onChange={(event, getOptionLabel) => {
                                  getOptionLabel ?
                                    this.setState({
                                      codearticle: getOptionLabel.codart,
                                      des: getOptionLabel.desart,
                                      unite: getOptionLabel.unite,
                                      puht: getOptionLabel.PUDHT,
                                      remisea: getOptionLabel.remise,
                                      tva: getOptionLabel.tautva,
                                      faudec: getOptionLabel.typfodec,
                                    })

                                    :
                                    this.setState({
                                      codearticle: '',
                                      totalht: 0,
                                      des: '',
                                      unite: '',
                                      puht: '',
                                      remisea: 0,
                                      tva: 0,
                                      faudec: "N"
                                    })
                                }}

                                renderInput={params => (
                                  <TextField
                                    {...params}
                                    label="Désignation article"
                                    margin="normal"
                                    fullWidth
                                  />
                                )}
                              />
                            }
                          </FormGroup>

                        </Col>
                        <FormGroup style={{ display: "none" }}>
                          <Label> code artcile</Label>
                          <Input
                            type="text"
                            value={this.state.codearticle}
                            disabled
                          />
                        </FormGroup>

                        <Col sm={4}>
                          {this.state.gilad ?
                            <FormGroup>

                              <TextField id="standard-basic" label="Désignation"
                                value={this.state.des}
                                disabled
                                margin="normal"
                                fullWidth
                              />
                            </FormGroup>
                            :
                            <FormGroup >
                              <TextField id="standard-basic" label="Code article"
                                value={this.state.codearticle}
                                disabled
                                margin="normal"
                                fullWidth
                              />
                            </FormGroup>
                          }

                        </Col>


                      </Row>


                      <Row form>

                        <Col sm={3}>
                          <FormGroup>
                            {this.state.des === '' ?
                              <TextField id="standard-basic" label="Quantité" disabled
                                type="number"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                style={{ marginTop: "0px" }}
                                value={this.state.qte}
                                onChange={this.qteHandler}
                                margin="normal"
                                fullWidth
                                required
                              />
                              :
                              <TextField id="standard-basic" label="Quantité"
                                type="number"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                value={this.state.qte}
                                onChange={this.qteHandler}
                                margin="normal"
                                fullWidth
                                required
                              />
                            }

                          </FormGroup>
                        </Col>

                        <Col sm={3}>
                          <FormGroup>

                            <TextField id="standard-basic" label="Unité"
                              value={this.state.unite}
                              fullWidth
                              disabled />
                          </FormGroup>
                        </Col>

                        <Col sm={3}>
                          <FormGroup>

                            <TextField id="standard-basic" label="PU HT"
                              value={this.state.puht}
                              fullWidth
                              disabled />
                          </FormGroup>
                        </Col>

                        <Col sm={3}>
                          <FormGroup>

                            <TextField id="standard-basic" label="Remise %"
                              value={this.state.remisea}
                              fullWidth
                              disabled />
                          </FormGroup>
                        </Col>

                      </Row>


                      <Row form>

                        <Col sm={3}>
                          <FormGroup>

                            <TextField id="standard-basic" label="TVA"
                              value={this.state.tva}
                              fullWidth
                              disabled />
                          </FormGroup>
                        </Col>

                        <Col sm={3}>
                          <FormGroup>

                            <TextField id="standard-basic" label="Total HT"
                              // value={roundTo( this.state.totalht, 3)}
                              value={this.state.totalht}
                              fullWidth
                              disabled />
                          </FormGroup>
                        </Col>

                        <Col sm={3}>
                          <FormGroup>

                            <TextField id="standard-basic" label="PU TTC Net"
                              // value={ roundTo( this.state.puttcnet, 3)}
                              value={this.state.puttcnet}
                              fullWidth
                              disabled />
                          </FormGroup>
                        </Col>

                        <Col sm={3}>
                          <FormGroup style={{ marginTop: "10px", marginLeft: "10px" }}>
                            <Label> Fodec </Label>
                            {
                              this.state.faudec === "A" ?

                                <Checkbox
                                  defaultChecked
                                  value="secondary"
                                  color="primary"
                                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />

                                :
                                <Label>
                                  <Checkbox disabled
                                    value="disabled"
                                    inputProps={{ 'aria-label': 'disabled checkbox' }} />
                                </Label>
                            }

                          </FormGroup>
                        </Col>
                      </Row>
                      {
                        this.state.des === '' ?
                          <Center>
                            <Button disabled
                              style={{ width: "250px" }}
                              color="primary" type="submit" >Ajouter</Button>
                          </Center>
                          :
                          <Center>
                            <Button
                              style={{ width: "250px" }}
                              color="primary" type="submit" >Ajouter</Button>
                          </Center>
                      }

                    </form>

                  </Card.Body>
                </Card>
                {/* ///////////////////////////////////////////////////////////////////////// */}

                {/* <div className="TableArticle"> */}
                <Card style={{ marginTop: "10px" }}>
                  <Card.Body>
                    <div className="tab28">

                      <table style={{ marginTop: "10px" }} >
                        <thead style={{ fontSize: "12px", textAlign: "center" }}>
                          <tr>
                            <th >Article</th>
                            <th >Désignation</th>
                            <th >Quantité</th>
                            <th>Unité</th>
                            <th >PU HT</th>
                            <th>Fodec</th>
                            <th>Remise</th>
                            <th>TVA</th>
                            <th >TotalHT</th>
                            <th >PUNet</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody style={{ overflowY: "auto", display: "block", maxHeight: "10em" }} >
                          {this.state.tab.map((t, i) =>

                            <tr key={i}
                            >
                              <td>
                                {t.codearticle}
                              </td>
                              <td>
                                {t.des}
                              </td>
                              <td>
                                {t.qte}
                              </td>
                              <td>
                                {t.unite}
                              </td>
                              <td>
                                {t.puht}
                              </td>
                              <td>
                                {t.faudec === "A" ? (
                                  <span>✔</span>
                                ) : (
                                    <span>Ø</span>
                                  )}
                              </td>
                              <td>
                                {t.remisea}
                              </td>
                              <td>
                                {t.tva}
                              </td>

                              <td>
                                {/* { roundTo(t.puttcnet, 3)} */}
                                {t.puttcnet}
                              </td>
                              <td>
                                {/* {roundTo(t.totalht, 3)} */}
                                {t.totalht}
                              </td>
                              {/* <Td>
                                                    

                                                 <Tooltip title="Editer cet article">    
                                                    <EditIcon 
                                                    style={{color: "green"}}
                                                    onClick={() => {
                                                   this.setState({
                                                     editModalShow: true,
                                                     qtte: t.qte
                                                   })
                                                  console.log( `hahahahah ${this.state.qtte}` );
                                                 }}/>                                                    
                                                </Tooltip>
                                                 </Td> */}
                              <td>

                                <Tooltip title="Supprimer cet article">
                                  <Fab size="small">
                                    <DeleteIcon
                                      style={{}}
                                      onClick={() => this.deleteRow(i)} />
                                  </Fab>

                                </Tooltip>

                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>




                      {/* 
                               <EditArticleModal
       show={this.state.editModalShow}
       onHide={editModalClose}
       qtte={this.state.qtte}
     /> */}

                    </div>
                  </Card.Body>
                </Card>

              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            {/* <Button onClick={() => {
                       this.setState({ totalqte : this.state.totalqte }), 
                       this.props.onHide()}}>Enregistrer</Button> */}

            {/* <Button onClick={() => {
              this.props.onHide()
              this.props.submitHandler(this.state.totalqte)

            }}>Enregistrer</Button> */}

            {
              !this.state.btnEnabled ?

                <Button disabled variant="contained"

                >Enregistrer</Button>
                :
                <Button variant="contained" style={{ backgroundColor: "rgb(0, 8, 126)", color: "white" }}

                  onClick={() => {
                    this.props.onHide()
                  }}>Enregistrer</Button>
            }


          </Modal.Footer>
        </Modal>
      </div >

    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    SelectArticle: () => dispatch(SelectArticle())
  };
}

function mapStateToProps(state) {
  return {
    articles: state.articles
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModifierDevisModal);