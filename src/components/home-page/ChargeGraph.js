import { Component } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import * as React from "react";

import Axios from "axios";

const DATE_OPTIONS = {
  month: "short",
  day: "numeric",
};

class ChargeGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    Axios.get(`http://192.168.1.100:81/api/BEREs`).then((res) => {
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
              label: "Montant / jour",

              data: runscore,

              backgroundColor: [
                "#6610f2",

                "#6610f2",

                "#6610f2",

                "#6610f2",

                "#6610f2",

                "#6610f2",

                "#6610f2",

                "#6610f2",

                "#6610f2",

                "#6610f2",
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
          <Bar
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

export default ChargeGraph;
