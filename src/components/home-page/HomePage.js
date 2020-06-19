import React, { Component } from "react";
import "./HomePage.scss";
import CategoryIcon from "@material-ui/icons/Category";
import PeopleIcon from "@material-ui/icons/People";
import DescriptionIcon from "@material-ui/icons/Description";
import PostAddIcon from "@material-ui/icons/PostAdd";
import { Row, Card, Col, Table } from "react-bootstrap";
import { Button } from "reactstrap";
import CircleChart from "./CircleChart";
import { Divider, Paper } from "@material-ui/core";
import VenteChart from "./VenteChart";
import WeekVente from "./WeekVente";
import WeekAchat from "./WeekAchat";
import AchatChart from "./AchatChart";
import Charttwo from "./Charttwo";
import { Redirect } from "react-router-dom";

class HomePage extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");

    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }
    this.state = {
      show: false,
      loggedIn,
      tpk: token,
    };
  }

  render() {
    if (this.state.loggedIn === false) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <h3> {this.state.tpk} </h3>
        <Row>
          <Col sm={4} className="col" style={{ paddingLeft: "25px" }}>
            <Row style={{ paddingBottom: "10px" }}>
              <Col sm={6} className="col">
                <Card className="card11">
                  <Card.Body>
                    <p className="p1">Taches en reatrd</p>
                    <p className="p2">0</p>
                    <Divider style={{ background: "white" }}></Divider>
                    <p className="p3">0</p>
                    <p className="p4">cette semaine</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={6} className="col">
                <Card className="card11">
                  <Card.Body>
                    <p className="p1">Taches términées</p>
                    <p className="p2">0</p>
                    <Divider style={{ background: "white" }}></Divider>
                    <p className="p3">0</p>
                    <p className="p4">cette semaine</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col sm={6} className="col">
                <Card className="card11">
                  <Card.Body>
                    <p className="p1">Taches actuelles</p>
                    <p className="p2">0</p>
                    <Divider style={{ background: "white" }}></Divider>
                    <p className="p3">0</p>
                    <p className="p4">cette semaine</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={6} className="col">
                <Card className="card11">
                  <Card.Body>
                    <p className="p1">Futures Taches</p>
                    <p className="p2">0</p>
                    <Divider style={{ background: "white" }}></Divider>
                    <p className="p3">0</p>
                    <p className="p4">cette semaine</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>

          <Col sm={4} className="col" style={{ paddingLeft: "15px" }}>
            <Card className="card11" style={{ height: "314px" }}>
              <Card.Body>
                <p className="p1">Sources</p>
                <CircleChart />
                {/* <Charttwo /> */}
              </Card.Body>
            </Card>
          </Col>

          <Col sm={4} className="col1">
            <Card className="card11" style={{ height: "314px" }}>
              <Card.Body>
                <p className="p1">Futures Taches</p>
                <p className="p2">0</p>
                <Divider style={{ background: "white" }}></Divider>
                <p className="p3">0</p>
                <p className="p4">cette semaine</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <br />

        <Row>
          <Col sm={4} className="col" style={{ paddingLeft: "25px" }}>
            <Row style={{ paddingBottom: "10px" }}>
              <Col className="col">
                <Card className="card11">
                  <Card.Body>
                    <p className="p1">Taches en reatrd</p>
                    <p className="p2">0</p>
                    <Divider style={{ background: "white" }}></Divider>
                    <p className="p3">0</p>
                    <p className="p4">cette semaine</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col className="col">
                <Card className="card11">
                  <Card.Body>
                    <p className="p1">Taches actuelles</p>
                    <p className="p2">0</p>
                    <Divider style={{ background: "white" }}></Divider>
                    <p className="p3">0</p>
                    <p className="p4">cette semaine</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>

          <Col sm={4} className="col" style={{ paddingLeft: "15px" }}>
            <Card className="card55" style={{ height: "314px" }}>
              <Card.Body>
                <p className="p1">Vente</p>
                <WeekVente />
                {/* <Charttwo /> */}
              </Card.Body>
            </Card>
          </Col>

          <Col sm={4} className="col">
            <Card className="card55" style={{ height: "314px" }}>
              <Card.Body>
                <p className="p1">Achat</p>
                <WeekAchat />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <br />
      </div>
    );
  }
}

export default HomePage;
