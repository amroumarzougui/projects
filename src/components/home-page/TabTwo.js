import React, { Component } from "react";
import { Tabs, Tab, Table, Button } from "react-bootstrap";
import "./HomePage.scss";
import { connect } from "react-redux";
import { SelectTopclient } from "../../redux/actions/Top5";
import { SelectTopFrs } from "../../redux/actions/Top5Frs";
import FTChart from "./FTChart";
import AchatChart from "./AchatChart";
import CircleChart from "./CircleChart";
import TopArticle from "./TopArticle";

class TabTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      change: false,
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <div>
          <Button
            onClick={() => this.setState({ change: false })}
            variant="light"
          >
            Articles
          </Button>{" "}
          &nbsp;
          <Button
            onClick={() => this.setState({ change: true })}
            variant="light"
          >
            Clients
          </Button>
        </div>
        <div>
          {this.state.change ? (
            <div>
              <p className="p1" style={{ margin: "10px" }}>
                % clients par région
              </p>
              <CircleChart />
            </div>
          ) : (
            <div>
              <p className="p1" style={{ margin: "10px" }}>
                Les articles les vendus
              </p>

              <TopArticle />
            </div>
          )}
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    SelectTopclient: () => dispatch(SelectTopclient()),
    SelectTopFrs: () => dispatch(SelectTopFrs()),
  };
}

function mapStateToProps(state) {
  return {
    tops: state.tops,
    topfrss: state.topfrss,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TabTwo);
