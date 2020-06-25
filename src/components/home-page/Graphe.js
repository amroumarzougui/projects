import React, { Component } from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import "./HomePage.scss";
ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const chartConfigs = {
  type: "column2d",
  width: 300,
  height: 250,
  dataFormat: "json",
  backgroundColor: "gray",
  dataSource: {
    chart: {
      caption: "Countries With Most Oil Reserves [2017-18]",
      subCaption: "In MMbbl = One Million barrels",
      xAxisName: "Country",
      yAxisName: "Reserves (MMbbl)",
      numberSuffix: "K",
      theme: "fusion",
    },
    data: [
      // {
      //   label: "Venezuela",
      //   value: "290",
      // },
      // {
      //   label: "Saudi",
      //   value: "260",
      // },
      // {
      //   label: "Canada",
      //   value: "180",
      // },
      // {
      //   label: "Iran",
      //   value: "140",
      // },
      // {
      //   label: "Russia",
      //   value: "115",
      // },
      // {
      //   label: "UAE",
      //   value: "100",
      // },
    ],
  },
};

class Charting extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    fetch(`http://192.168.1.100:81/api/BLBRs?typtyp=BL`)
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          series: this.state.series.concat({
            // name: data.map((t) => t.datfac),
            data: data.map((t) => t.sommemntbn),
          }),
          xaxis: this.state.xaxis.concat({
            categories: data.map((t) => t.datfac),
          }),
        })
      );
  }
  render() {
    return (
      <div className="graphe">
        <ReactFC {...chartConfigs} />
      </div>
    );
  }
}

export default Charting;
