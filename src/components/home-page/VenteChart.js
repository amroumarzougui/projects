import { Component } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import * as React from "react";

import Axios from "axios";

const DATE_OPTIONS = {
  month: "short",
  day: "numeric",
};

class VenteAchat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
    };
  }
  //////////////// Devis //////////////////////////////////////
  componentDidMount() {
    Axios.get(`http://192.168.1.100:81/api/BCDVCLIs?typpp=DV`).then((res) => {
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
              label: "Montant Devis / jour",

              data: runscore,

              backgroundColor: [
                "#28a745",

                "#28a745",

                "#28a745",

                "#28a745",

                "#28a745",

                "#28a745",

                "#28a745",
                "#28a745",

                "#28a745",

                "#28a745",
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

export default VenteAchat;
