import { Component } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import * as React from "react";

import Axios from "axios";

const DATE_OPTIONS = {
  month: "short",
  day: "numeric",
};

class CircleChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      sum: [],
      k: 0,
    };
  }

  componentDidMount() {
    // fetch(`http://192.168.1.100:81/api/TotalClient`)
    //   .then((response) => response.json())
    //   .then((data) => this.setState({ sum: data, k: data.Column1 }));

    // this.state.sum.map((t) => this.setState({ k: t.Column1 }));

    Axios.get(`http://192.168.1.100:81/api/GraphCperR`).then((res) => {
      console.log(res);

      const ipl = res.data;

      let playername = [];

      let runscore = [];

      ipl.forEach((record) => {
        playername.push(record.ville);

        runscore.push(record.num);
      });

      this.setState({
        Data: {
          labels: playername,

          datasets: [
            {
              label: "Clients / Région",

              data: runscore,

              backgroundColor: [
                "#20c997",

                "#6610f2",

                "#0000FF",

                "#007bff",

                "#ffc107",
              ],
            },
          ],
        },
      });
    });
  }
  render() {
    return (
      <div>
        <div>
          <Pie
            data={this.state.Data}
            options={{ maintainAspectRatio: false }}
            width={"300px"}
            height={"200px"}
          />
        </div>
      </div>
    );
  }
}

export default CircleChart;
