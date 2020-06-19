import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Row, Col, Button, Carousel, Alert } from "react-bootstrap";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { Fab, TextField } from "@material-ui/core";
import Center from "react-center";
import { Snackbar } from "@material-ui/core";

import image1 from "./k.jpg";
import image2 from "./k1.jpeg";
import image3 from "./k3.jpg";
import image4 from "./p3.png";
import image5 from "../components/contact-page/contactsyros.png";
import { connect } from "react-redux";
import { GetDBFolder } from "../redux/actions/GetDBFolders";
import { Label, Input } from "reactstrap";
import { setUserSession } from "./Common";

const imgMyimageexample = require("./b2.jpg");
const divStyle = {
  width: "100%",
  //  height: '100vh',
  minHeight: "640px",
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
          // setUserSession(result.data.Codrep, result.data);
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

        <Row>
          <Col
            sm={12}
            style={{
              paddingRight: "50px",
              marginTop: "100px",
              textAlign: "center",
            }}
          >
            <Center>
              {/* <Fab size="medium" color="secondary"> */}
              <div
                style={{
                  backgroundColor: "rgb(220, 0, 78)",
                  color: "white",
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                }}
              >
                <LockOpenIcon
                  style={{ width: "35px", height: "35px", margin: "7px" }}
                />
              </div>
            </Center>
            <br />

            {/* </Fab> */}
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
              <br />
              <Button
                type="submit"
                style={{ backgroundColor: "#1976d2", width: "100%" }}
              >
                Login
              </Button>
              <br />
            </form>
          </Col>
        </Row>
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
