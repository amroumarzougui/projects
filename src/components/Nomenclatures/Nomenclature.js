import React, { Component } from "react";

import {
  Tabs,
  Tab,
  Table,
  Button,
  Card,
  Row,
  Col,
  Form,
} from "react-bootstrap";

import { connect } from "react-redux";
import { SelectAllNome } from "../../redux/actions/GetAllNome";
import { TextField, Snackbar, IconButton } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { SelectCatNome } from "../../redux/actions/GetCatNome";
import "./nome.scss";

class Nomenclature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cat: "",
      tab: [],
      show: false,
      snackbaropen: false,
      snackbarmsg: ",",
    };
  }

  componentDidMount() {
    this.props.SelectAllNome();
    this.props.SelectCatNome();
  }

  catHandlerChange = () => {
    fetch(`http://192.168.1.100:81/api/Nome?cat=${this.state.cat}`)
      .then((response) => response.json())
      .then((data) => this.setState({ tab: data, show: true }));
  };

  submitHandler = (event) => {
    event.preventDefault();

    fetch(
      `http://192.168.1.100:81/api/Nome?cat=${this.state.cat}&code=${event.target.code.value}&lib=${event.target.lib.value}&chdec=0`,
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
          this.setState({ snackbaropen: true, snackbarmsg: result });
          window.location.reload();
          console.log(result);
        },
        (error) => {
          this.setState({ snackbaropen: true, snackbarmsg: "failed" });
        }
      );
  };

  snackbarClose = () => {
    this.setState({ snackbaropen: false });
  };

  render() {
    return (
      <div>
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

        <div className="page-icon">
          <u>
            {" "}
            <i class="far fa-plus-square"> Nomenclature</i>
          </u>
        </div>

        <br />

        <Row>
          <Col sm={5}>
            <Card>
              <Card.Body>
                <div style={{ margin: "20px" }}>
                  <Form onSubmit={this.submitHandler}>
                    <Row form>
                      <Col>
                        <Form.Group controlId="code">
                          <Autocomplete
                            id="include-input-in-list"
                            includeInputInList
                            className="ajouter-client-input"
                            options={this.props.catnomes.catnomes}
                            getOptionLabel={(option) => option.cat}
                            onChange={(event, getOptionLabel) => {
                              getOptionLabel
                                ? fetch(
                                    `http://192.168.1.100:81/api/Nome?cat=${getOptionLabel.cat}`
                                  )
                                    .then((response) => response.json())
                                    .then((data) =>
                                      this.setState({
                                        tab: data,
                                        cat: getOptionLabel.cat,
                                        show: true,
                                      })
                                    )
                                : this.setState({
                                    cat: "",
                                    show: false,
                                  });
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Catégorie"
                                margin="normal"
                                fullWidth
                                //  onChange={this.catHandlerChange}
                                name="cat"
                              />
                            )}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row form>
                      <Col>
                        <Form.Group controlId="code">
                          <TextField
                            id="standard-basic"
                            label="Code"
                            margin="normal"
                            fullWidth
                            name="code"
                            type="text"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row form>
                      <Col>
                        <Form.Group controlId="lib">
                          <TextField
                            id="standard-basic"
                            label="Libellé"
                            margin="normal"
                            fullWidth
                            name="lib"
                            type="text"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row form>
                      <Col sm={4}></Col>
                      <Col sm={4}>
                        <Form.Group>
                          <Button
                            type="submit"
                            style={{
                              backgroundColor: "#17a2b8",
                              width: "100%",
                              borderColor: "#17a2b8",
                            }}
                          >
                            Enregistrer
                          </Button>
                        </Form.Group>
                      </Col>
                      <Col sm={4}></Col>
                    </Row>
                  </Form>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={7}>
            <Card style={{ height: "100%", marginTop: "5px" }}>
              <Card.Body>
                <h4 style={{ marginBottom: "30px" }}>
                  {" "}
                  Nomenclature &nbsp;{" "}
                  <span style={{ color: "rgb(23, 162, 184)" }}>
                    {" "}
                    {this.state.cat}{" "}
                  </span>{" "}
                </h4>
                <Row>
                  <Col>
                    {this.state.show ? (
                      <div className="tabnome">
                        <Table striped hover size="sm">
                          <thead
                            style={{ background: "#454d55", color: "white" }}
                          >
                            <tr>
                              <th>Code</th>
                              <th>Libellé</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.tab.map((t, i) => (
                              <tr key={i}>
                                <td> {t.code} </td>
                                <td> {t.lib} </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    ) : null}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    SelectAllNome: () => dispatch(SelectAllNome()),
    SelectCatNome: () => dispatch(SelectCatNome()),
  };
}

function mapStateToProps(state) {
  return {
    allnomes: state.allnomes,
    catnomes: state.catnomes,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Nomenclature);
