import React, { Component } from "react";
import Chart from "react-apexcharts";

class Chartone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [
        // {
        //   name: "Session Duration",
        //   data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10],
        // },
        // {
        //   name: "Page Views",
        //   data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35],
        // },
        // {
        //   name: "Total Visits",
        //   data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47],
        // },
      ],
      options: {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: [5, 7, 5],
          curve: "straight",
          dashArray: [0, 8, 5],
        },
        title: {
          text: "Page Statistics",
          align: "left",
        },
        legend: {
          tooltipHoverFormatter: function (val, opts) {
            return (
              val +
              " - " +
              opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
              ""
            );
          },
        },
        markers: {
          size: 0,
          hover: {
            sizeOffset: 6,
          },
        },
        xaxis: [],
        //  {
        //   categories: [
        //     // "01 Jan",
        //     // "02 Jan",
        //     // "03 Jan",
        //     // "04 Jan",
        //     // "05 Jan",
        //     // "06 Jan",
        //     // "07 Jan",
        //     // "08 Jan",
        //     // "09 Jan",
        //     // "10 Jan",
        //     // "11 Jan",
        //     // "12 Jan",
        //   ],
        // },
        tooltip: {
          y: [
            {
              title: {
                formatter: function (val) {
                  return val + " (mins)";
                },
              },
            },
            {
              title: {
                formatter: function (val) {
                  return val + " per session";
                },
              },
            },
            {
              title: {
                formatter: function (val) {
                  return val;
                },
              },
            },
          ],
        },
        grid: {
          borderColor: "#f1f1f1",
        },
      },
    };
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
      <div>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="line"
          height={200}
          width={300}
        />
      </div>
    );
  }
}

export default Chartone;
