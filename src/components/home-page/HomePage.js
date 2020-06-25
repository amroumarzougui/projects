import React, { Component } from "react";
import "./HomePage.scss";
import CategoryIcon from "@material-ui/icons/Category";
import PeopleIcon from "@material-ui/icons/People";
import DescriptionIcon from "@material-ui/icons/Description";
import PostAddIcon from "@material-ui/icons/PostAdd";
import { Row, Card, Col, Table } from "react-bootstrap";
import { Button } from "reactstrap";
import CircleChart from "./CircleChart";
import { Divider, Paper, Grid, makeStyles } from "@material-ui/core";
import VenteChart from "./VenteChart";
import WeekVente from "./WeekVente";
import WeekAchat from "./WeekAchat";
import AchatChart from "./AchatChart";
import Charttwo from "./Charttwo";
import { Redirect } from "react-router-dom";
import Chartone from "./Chartone";
import Charting from "./Graphe";
import Lineone from "./Lineone";
import ColumnChart from "./ColumnChart";
import { connect } from "react-redux";
import { SelectTopclient } from "../../redux/actions/Top5";
import { SelectClient } from "../../redux/actions/GetClients";

import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import FullWidthTabs from "./Tab";
import TabTop from "./TabTop";
import TabBLFT from "./TabBLFT";

class HomePage extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }
    this.state = {
      show: false,
      loggedIn,
      tpk: token,
      user: username,
      activeTab: "2",
    };
  }
  componentDidMount() {
    this.props.SelectTopclient();
    this.props.SelectClient();
  }

  toggle = (tab) => {
    if (this.state.activeTab !== tab) this.setState({ activeTab: tab });
  };

  render() {
    if (this.state.loggedIn === false) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <div className="scroll">
          {/* <h3>
          Bienvenu chez SYROS{" "}
          <span style={{ color: "rgb(220, 0, 78)" }}>{this.state.user}</span>{" "}
        </h3> */}

          <Row>
            <Col sm={4} style={{ marginBottom: "15px" }}>
              <Card className="card111">
                <Card.Body>
                  <p className="p1">Total Charge des Fournisseurs par jour</p>
                  <p className="p2">0</p>
                  <Divider style={{ background: "#0f2535" }}></Divider>
                  <p className="p3">0</p>
                  <p className="p4">cette semaine</p>
                </Card.Body>
              </Card>
            </Col>

            <Col sm={4} style={{ marginBottom: "15px" }}>
              <Card className="card111">
                <Card.Body>
                  <p className="p1">Sources</p>

                  {/* <CircleChart /> */}
                </Card.Body>
              </Card>
            </Col>
            <Col sm={4} style={{ marginBottom: "15px" }}>
              <Card className="card111">
                <Card.Body>
                  {/* <AchatChart /> */}
                  <TabBLFT />
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <br />
          <Row>
            <Col sm={5} style={{ marginBottom: "15px" }}>
              <Card className="card111">
                <Card.Body>
                  <FullWidthTabs></FullWidthTabs>
                </Card.Body>
              </Card>
            </Col>

            <Col sm={7} style={{ marginBottom: "15px" }}>
              <Card className="card111">
                <Card.Body>
                  <TabTop />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    SelectTopclient: () => dispatch(SelectTopclient()),
    SelectClient: () => dispatch(SelectClient()),
  };
}

function mapStateToProps(state) {
  return {
    tops: state.tops,
    clients: state.clients,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
