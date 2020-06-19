import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import React from "react";
import "./HomePage.scss";
// Resolves charts dependancy
charts(FusionCharts);

const dataSource = {
  chart: {
    caption: "Android Distribution for our app",
    subcaption: "For all users in 2017",
    showpercentvalues: "1",
    defaultcenterlabel: "Android Distribution",
    aligncaptionwithcanvas: "0",
    captionpadding: "0",
    decimals: "1",
    plottooltext:
      "<b>$percentValue</b> of our Android users are on <b>$label</b>",
    centerlabel: "# Users: $value",
    theme: "fusion"
  },
  data: [
    {
      label: "Ice Cream Sandwich",
      value: "1000"
    },
    {
      label: "Jelly Bean",
      value: "5300"
    },
    {
      label: "Kitkat",
      value: "10500"
    },
    {
      label: "Lollipop",
      value: "18900"
    },
    {
      label: "Marshmallow",
      value: "17904"
    }
  ]
};

class Donut extends React.Component {
  render() {
    return (
      <div className="graphe">
        <ReactFusioncharts
          type="doughnut2d"
          width="400"
          height="400"
          dataFormat="JSON"
          dataSource={dataSource}
        />
      </div>
    );
  }
}
export default Donut;
