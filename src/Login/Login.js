import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Row, Col, Button, Carousel, Alert, Card } from "react-bootstrap";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { Fab, TextField } from "@material-ui/core";
import Center from "react-center";
import { Snackbar } from "@material-ui/core";

import image6 from "./ts.jpg";
import image7 from "./ts3.jpg";
import image8 from "./ts2.jpg";

import image1 from "./k.jpg";
import image2 from "./k1.jpeg";
import image3 from "./k3.jpg";
import image4 from "./p3.png";
import image5 from "../components/contact-page/contactsyros.png";
import { connect } from "react-redux";
import { GetDBFolder } from "../redux/actions/GetDBFolders";
import { Label, Input } from "reactstrap";
import { setUserSession } from "./Common";

import "./login.css";

const imgMyimageexample = require("./b2.jpg");
const divStyle = {
  backgroundImage: `url(${image7})`,
  height: "100%",
  backgroundSize: "cover",
};

const divStylee = {
  width: "100%",
  height: "100vh",
  backgroundImage: `url(${imgMyimageexample})`,
  backgroundSize: "cover",
};

class Login extends Component {
  constructor(props) {
    const token = localStorage.getItem("token");

    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }
    super(props);
    this.state = {
      username: "",
      password: "",
      loggedIn,
      snackbaropen: false,
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    this.props.GetDBFolder();
    this.snackbarClose();
  }

  submitForm = (event) => {
    // e.preventDefault();
    // const { username, password } = this.state;

    // if (username === "a" && password === "b") {
    //   localStorage.setItem("token", "hqdgsdgkqkgqsdhqsdg");
    //   this.setState({ loggedIn: true });
    // }
    // this.setState({ snackbaropen: true });
    event.preventDefault(event);

    fetch(
      `http://192.168.1.100:81/api/Auth?nom=${event.target.username.value}&mp=${event.target.password.value}`,
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
          if (result.Status == "Invalid") alert("Invalid username or password");
          else
            localStorage.setItem(
              "token",
              `abcd${this.state.username}1234ghqsd`
            );
          localStorage.setItem("username", `${this.state.username}`);
          this.setState({ loggedIn: true });
        },
        (error) => {
          this.setState({ snackbaropen: true, snackbarmsg: "failed" });
        }
      );
  };

  snackbarClose = (event) => {
    this.setState({ snackbaropen: false });
  };

  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/homepage" />;
    }
    return (
      <div>
        <Snackbar
          open={this.state.snackbaropen}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          onClose={this.snackbarClose}
        >
          <Alert onClose={this.snackbarClose} variant={"danger"}>
            username ou password invalide!!!
          </Alert>
        </Snackbar>
        <div>
          <div>
            <Row>
              <Col
                sm={7}
                className="carous"
                style={{
                  textAlign: "center",
                }}
              >
                <div>
                  <Carousel>
                    <Carousel.Item>
                      <img
                        style={{ height: "97vh", width: "100%" }}
                        className="d-block w-100"
                        src={image1}
                        alt="First slide"
                      />
                      <Carousel.Caption>
                        <p style={{ color: "white", fontSize: "100px" }}>
                          SYROS
                        </p>
                        <p style={{ color: "white", fontSize: "50px" }}>
                          Gestion commercial
                        </p>
                      </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                      <img
                        style={{ height: "97vh", width: "100%" }}
                        className="d-block w-100"
                        src={image2}
                        alt="First slide"
                      />
                      <Carousel.Caption style={{ marginTop: "-250px" }}>
                        <p style={{ color: "white", fontSize: "50px" }}>
                          Gérer vos affaires
                        </p>
                        <ul
                          style={{
                            color: "white",
                            fontSize: "30px",
                            marginLeft: "50px",
                          }}
                        >
                          <li>
                            Vente <span>✔</span>
                          </li>
                          <li>
                            Achat <span>✔</span>
                          </li>
                          <li>
                            Facture <span>✔</span>
                          </li>
                          <li>
                            Statéstiques <span>✔</span>
                          </li>
                          <li>
                            Analyse <span>✔</span>
                          </li>
                        </ul>
                      </Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item>
                      <img
                        style={{ height: "97vh", width: "100%" }}
                        className="d-block w-100"
                        src={image5}
                        alt="First slide"
                      />
                      <Carousel.Caption></Carousel.Caption>
                    </Carousel.Item>
                  </Carousel>
                </div>
              </Col>

              <Col
                sm={5}
                style={{
                  marginTop: "100px",
                  textAlign: "center",
                }}
              >
                <Row>
                  <Col sm={2}></Col>

                  <Col sm={8}>
                    {/* <Card style={{ background: "rgba(4,0,64 ,0.2)" }}> */}
                    {/* <Card style={divStyle}>
                  <Card.Body> */}
                    <Center>
                      <div
                        style={{
                          backgroundColor: "rgb(220, 0, 78)",
                          color: "white",
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          justifyContent: "center",
                          justifyItems: "center",
                        }}
                      >
                        <LockOpenIcon
                          style={{
                            width: "35px",
                            height: "35px",
                            margin: "7px",
                          }}
                        />
                      </div>
                    </Center>

                    <br />
                    <h3>Login</h3>
                    <br />
                    <form onSubmit={this.submitForm}>
                      <TextField
                        id="outlined-basic"
                        label="username"
                        variant="outlined"
                        name="username"
                        value={this.state.username}
                        onChange={this.onChange}
                        required
                        fullWidth
                      />

                      <br />
                      <br />
                      <TextField
                        id="outlined-basic"
                        label="password"
                        type="password"
                        variant="outlined"
                        name="password"
                        // value={this.state.password}
                        onChange={this.onChange}
                        required
                        fullWidth
                      />
                      <br />
                      <br />
                      {/* <Label className="labell">Dossier</Label>
              <Input
                type="select"
                name="folder"
                // defaultValue={this.props.unitearticles}
              >
                {this.props.dbs.dbs.map((t, i) => (
                  <option key={i} value={t.coddos}>
                    {t.coddos}
                  </option>
                ))}
              </Input> */}
                      <br />

                      <Button
                        type="submit"
                        style={{ backgroundColor: "#1976d2", width: "100%" }}
                      >
                        Login
                      </Button>
                    </form>
                    {/* </Card.Body>
                </Card> */}
                  </Col>

                  <Col sm={2}></Col>
                </Row>
              </Col>

              <Col Sm={4}></Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    GetDBFolder: () => dispatch(GetDBFolder()),
  };
}

function mapStateToProps(state) {
  return {
    dbs: state.dbs,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
