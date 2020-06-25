import { Component } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import * as React from "react";

import Axios from "axios";

const DATE_OPTIONS = {
  month: "short",
  day: "numeric",
};

class BCChaert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
    };
  }
  //////////////// BC //////////////////////////////////////
  componentDidMount() {
    Axios.get(`http://192.168.1.100:81/api/BCDVCLIs?typpp=BC`).then((res) => {
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
              label: "Montant Facture / jour",

              data: runscore,

              backgroundColor: [
                "#ffc107",

                "#ffc107",

                "#ffc107",

                "#ffc107",

                "#ffc107",

                "#ffc107",

                "#ffc107",
                "#ffc107",

                "#ffc107",

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
          <Bar
            data={this.state.Data}
            options={{ maintainAspectRatio: false }}
            //   width={"800px"}
            height={"180px"}
          />
        </div>
      </div>
    );
  }
}

export default BCChaert;
