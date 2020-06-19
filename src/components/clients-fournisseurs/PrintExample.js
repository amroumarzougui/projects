import React from "react";
import ReactToPrint from "react-to-print";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";

class ComponentToPrint extends React.Component {
  render() {
    return (
      <div>
        <table>
          <thead>
            <th>column 1</th>
            <th>column 2</th>
            <th>column 3</th>
          </thead>
          <tbody>
            <tr>
              <td>data 1</td>
              <td>data 2</td>
              <td>data 3</td>
            </tr>
            <tr>
              <td>data 1</td>
              <td>data 2</td>
              <td>data 3</td>
            </tr>
            <tr>
              <td>data 1</td>
              <td>data 2</td>
              <td>data 3</td>
            </tr>
          </tbody>
        </table>

        <Row>
          <Col>
            <h3>Name</h3>
          </Col>
          <Col>
            <p>22</p>
          </Col>
        </Row>
      </div>
    );
  }
}

class Example extends React.Component {
  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => <button>Print 2 ème méthode</button>}
          content={() => this.componentRef}
        />
        <ComponentToPrint ref={el => (this.componentRef = el)} />
      </div>
    );
  }
}

export default Example;
