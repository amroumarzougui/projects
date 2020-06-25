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
    };
  }

  componentDidMount() {
    Axios.get(`http://192.168.1.100:81/api/BLBRs?typtyp=BL`).then((res) => {
      console.log(res);

      const ipl = res.data;

      let playername = [];

      let runscore = [];

      ipl.forEach((record) => {
        playername.push(
          new Date(record.datfac).toLocaleDateString("fr", DATE_OPTIONS)
        );

        runscore.push(record.sommemntbn);
      });

      this.setState({
        Data: {
          labels: playername,

          datasets: [
            {
              label: "Montant BL / jour",

              data: runscore,

              backgroundColor: [
                "#08052b",

                "#3cb371",

                "#0000FF",

                "#9966FF",

                "#4C4CFF",

                "#00FFFF",

                "#f990a7",

                "#aad2ed",

                "#FF00FF",

                "Red",
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
