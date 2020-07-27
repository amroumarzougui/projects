import React, { Component } from "react";
import { Modal, Card } from "react-bootstrap";
import "../styling/Styles.css";
import PhoneIcon from "@material-ui/icons/Phone";
import { Col, Button, Row } from "reactstrap";
import { Snackbar, IconButton } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import "./click.scss";
import "./clicks.css";
import PhoneForwardedIcon from "@material-ui/icons/PhoneForwarded";
import PhoneDisabledIcon from "@material-ui/icons/PhoneDisabled";

class AppelModalClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snackbaropen: false,
      snackbarmsg: ",",
      snackbaropen2: false,
      snackbarmsg2: ",",
    };
  }

  call1 = () => {
    fetch(
      `http://192.168.1.14/couplagetel/calling.php?exten=${this.props.tel1}&number=${this.props.tel1}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => response.json())
      .then((data) =>
        //console.log(data)
        // window.alert(data)
        this.setState({ snackbaropen: true, snackbarmsg: data })
      );
  };

  call2 = () => {
    fetch(
      `http://192.168.1.14/couplagetel/calling.php?exten=${this.props.tel2}&number=${this.props.tel2}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => response.json())
      .then((data) =>
        //console.log(data)
        // window.alert(data)
        this.setState({ snackbaropen2: true, snackbarmsg2: data })
      );
  };

  snackbarClose = () => {
    this.setState({ snackbaropen: false });
  };

  snackbarClose2 = () => {
    this.setState({ snackbaropen2: false });
  };

  render() {
    return (
      <div className="container">
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={this.state.snackbaropen}
          onClose={this.snackbarClose}
        >
          <Card
            style={{
              borderRadius: "8px",
            }}
          >
            <Card.Body
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              <h5>
                {" "}
                Appel efféctué vers{" "}
                <span style={{ fontWeight: "bold", color: "#20c997" }}>
                  {this.props.raisonsocial}
                </span>{" "}
              </h5>{" "}
              <br />
              <h3 style={{ color: "#20c997" }}>
                {" "}
                <PhoneForwardedIcon /> {this.props.tel1}{" "}
              </h3>
              <div class="spinner">
                <div class="double-bounce1"></div>
                <div class="double-bounce2"></div>
              </div>
              <p>Appel en cours ...</p>
              <Button color="danger" onClick={this.snackbarClose}>
                <PhoneDisabledIcon />
              </Button>
              <br />
              {this.state.snackbarmsg}
            </Card.Body>
          </Card>
        </Snackbar>

        {/* ///// snackbar sim2 ////////// */}

        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={this.state.snackbaropen2}
          onClose={this.snackbarClose2}
        >
          <Card>
            <Card.Body
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              <h5>
                {" "}
                Appel efféctué vers{" "}
                <span style={{ fontWeight: "bold", color: "#20c997" }}>
                  {this.props.raisonsocial}
                </span>{" "}
              </h5>{" "}
              <br />
              <h3 style={{ color: "#20c997" }}>
                {" "}
                <PhoneForwardedIcon /> {this.props.tel2}{" "}
              </h3>
              <div class="spinner">
                <div class="double-bounce1"></div>
                <div class="double-bounce2"></div>
              </div>
              <p>Appel en cours ...</p>
              <Button color="danger" onClick={this.snackbarClose2}>
                <PhoneDisabledIcon />
              </Button>
              <br />
              {this.state.snackbarmsg2}
            </Card.Body>
          </Card>
        </Snackbar>

        <Modal
          {...this.props}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header
            closeButton
            style={{ backgroundColor: "#F5F5F5", color: "#020F64" }}
          >
            <Modal.Title id="contained-modal-title-vcenter">
              {" "}
              <PhoneIcon /> {this.props.raisonsocial}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: "#F5F5F5" }}>
            {this.props.tel1 === "" || this.props.tel1 === null ? (
              <Row>
                <Col sm={6}>
                  <p style={{ padding: "5px", fontWeight: "bold" }}>--</p>
                </Col>
                <Col sm={6}>
                  <Button outline color="secondary" size="sm" disabled>
                    <PhoneIcon /> Appeler
                  </Button>
                </Col>
              </Row>
            ) : (
              <Row>
                <Col sm={6}>
                  <p style={{ padding: "5px", fontWeight: "bold" }}>
                    {" "}
                    {this.props.tel1}{" "}
                  </p>
                </Col>
                <Col sm={6}>
                  <Button
                    outline
                    color="success"
                    size="sm"
                    onClick={this.call1}
                  >
                    <PhoneIcon /> Appeler
                  </Button>
                </Col>
              </Row>
            )}

            {/* ////// tel2 /////////////// */}

            {this.props.tel2 === "" || this.props.tel2 === null ? (
              <Row>
                <Col sm={6}>
                  <p style={{ padding: "5px", fontWeight: "bold" }}>--</p>
                </Col>
                <Col sm={6}>
                  <Button outline color="secondary" size="sm" disabled>
                    <PhoneIcon /> Appeler
                  </Button>
                </Col>
              </Row>
            ) : (
              <Row>
                <Col sm={6}>
                  <p style={{ padding: "5px", fontWeight: "bold" }}>
                    {" "}
                    {this.props.tel2}{" "}
                  </p>
                </Col>
                <Col sm={6}>
                  <Button
                    outline
                    color="success"
                    size="sm"
                    onClick={this.call2}
                  >
                    <PhoneIcon /> Appeler
                  </Button>
                </Col>
              </Row>
            )}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default AppelModalClient;
