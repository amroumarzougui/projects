import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { Snackbar, IconButton } from "@material-ui/core";

class TestAjout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snackbaropen: false,
      snackbarmsg: ","
    };
  }

  snackbarClose = () => {
    this.setState({ snackbaropen: false });
  };

  submitHandler = event => {
    event.preventDefault();
    console.log(`ajouter: $`);

    fetch(
      `http://192.168.1.100:81/api/ARTICLEs?codart=${event.target.codart.value}
      &desart=${event.target.desart.value}
      &unite=${event.target.unite.value}
      &tautva=${event.target.tautva.value}`,
      {
        method: "POST",
        header: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
        // body: JSON.stringify({
        //   codart: event.target.codart.value,
        //   desart: event.target.desart.value,
        //   unite: event.target.unite.value,
        //   tautva: event.target.tautva.value
        // })
        // body: `codart=${event.target.codart.value}& desart=${event.target.desart.value} & unite=${event.target.unite.value} & tautva=${event.target.tautva.value}`
        // body: `codart="20011556"& desart="sssd" & unite="PI & tautva=6`
      }
    )
      .then(res => res.json())
      .then(
        result => {
          // alert(result);
          this.setState({ snackbaropen: true, snackbarmsg: result });
          console.log(result);
        },
        error => {
          // alert('Failed')
          this.setState({ snackbaropen: true, snackbarmsg: "failed" });
        }
      );
  };
  render() {
    return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical: "center", horizontal: "right" }}
          open={this.state.snackbaropen}
          //  autoHideDuration={2000}
          onClose={this.snackbarClose}
          message={<span id="message-id"> {this.state.snackbarmsg} </span>}
          action={[
            <IconButton
              key="close"
              color="inherit"
              onClick={this.snackbarClose}
            >
              x
            </IconButton>
          ]}
        ></Snackbar>

        <Form onSubmit={this.submitHandler}>
          <Form.Group controlId="codart">
            <Form.Control type="text" name="codart" />
          </Form.Group>
          <Form.Group controlId="desart">
            <Form.Control type="text" name="desart" />
          </Form.Group>
          <Form.Group controlId="unite">
            <Form.Control type="text" name="unite" />
          </Form.Group>
          <Form.Group controlId="tautva">
            <Form.Control type="text" name="tautva" />
          </Form.Group>
          <Form.Group>
            <Button type="submit">Submit</Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default TestAjout;
