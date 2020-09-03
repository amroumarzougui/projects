import React, { Component } from "react";
import "./HomePage.scss";
import { connect } from "react-redux";
import { SelectTopclient } from "../../redux/actions/Top5";
import { SelectTopFrs } from "../../redux/actions/Top5Frs";
import { FormGroup, Row, Col, Label } from "reactstrap";
import { TextField } from "@material-ui/core";
import Axios from "axios";
import { Bar, Line, Pie } from "react-chartjs-2";

class FullWidthTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      change: true,
      data: {},
      annee: "2020",
    };
  }

  componentDidMount() {
    Axios.get(`http://192.168.1.100:81/api/CHIFFREs?annee=2020`).then((res) => {
      console.log(res);

      const ipl = res.data;

      let playername = [];

      let runscore = [];

      ipl.forEach((record) => {
        playername.push(record.Mois);

        runscore.push(record.Ventes);
      });

      this.setState({
        Data: {
          labels: playername,

          datasets: [
            {
              label: "chiffre d'année par mois",

              data: runscore,

              backgroundColor: [
                "rgb(220, 0, 78)",

                "rgb(220, 0, 78)",

                "rgb(220, 0, 78)",

                "rgb(220, 0, 78)",

                "rgb(220, 0, 78)",

                "rgb(220, 0, 78)",

                "rgb(220, 0, 78)",

                "rgb(220, 0, 78)",

                "rgb(220, 0, 78)",

                "rgb(220, 0, 78)",
              ],
              // borderColor: "rgba(0,0,0,1)",
              // borderWidth: 2,
            },
          ],
        },
      });
    });
  }

  anneeHandler = (event) => {
    Axios.get(
      `http://192.168.1.100:81/api/CHIFFREs?annee=${event.target.value}`
    ).then((res) => {
      console.log(res);

      const ipl = res.data;

      let playername = [];

      let runscore = [];

      ipl.forEach((record) => {
        playername.push(record.Mois);

        runscore.push(record.Ventes);
      });

      this.setState({
        Data: {
          labels: playername,

          datasets: [
            {
              label: "chiffre d'année par mois",

              data: runscore,

              backgroundColor: [
                "rgb(220, 0, 78)",

                "rgb(220, 0, 78)",

                "rgb(220, 0, 78)",

                "rgb(220, 0, 78)",

                "rgb(220, 0, 78)",

                "rgb(220, 0, 78)",

                "rgb(220, 0, 78)",

                "rgb(220, 0, 78)",

                "rgb(220, 0, 78)",

                "rgb(220, 0, 78)",
                "rgb(220, 0, 78)",

                "rgb(220, 0, 78)",
              ],
              // borderColor: "rgba(0,0,0,1)",
              // borderWidth: 2,
            },
          ],
        },
      });
    });
  };

  render() {
    return (
      <div>
        <p className="p1" style={{ margin: "10px" }}>
          Chiffre d'affaire Global
        </p>
        <form>
          <Row>
            <Col>
              <FormGroup>
                <TextField
                  id="standard-basic"
                  label="Année"
                  defaultValue={this.state.annee}
                  fullWidth
                  name="annee"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="dense"
                  variant="outlined"
                  onChange={this.anneeHandler}
                />

                <div>
                  <Bar
                    data={this.state.Data}
                    options={{ maintainAspectRatio: false }}
                    width={"300px"}
                    height={"200px"}
                  />
                </div>
              </FormGroup>
            </Col>
          </Row>
        </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(FullWidthTabs);
