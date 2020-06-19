import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { connect } from "react-redux";
import { SelectClient } from "../../redux/actions/GetClients";
import { SelectArticle } from "../../redux/actions/GetArticles";
import { Row, Col } from "react-bootstrap";
import { Button } from "@material-ui/core";
import Center from "react-center";

class ComboBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.SelectClient();
    this.props.SelectArticle();
  }

  render() {
    const id = this.props.clients.clients.map(client => client);
    const ar = this.props.articles.articles.map(article => article);

    const optionsar = ar.map(e => ({
      value: e.$id,
      label: e.codart,
      name: e.desart
    }));

    const optionss = id.map(e => ({
      value: e.$id,
      label: e.codcli,
      name: e.raisoc
    }));

    console.log(optionss.map(o => o.name));
    return (
      <div>
        <Row>
          <Col md={6}>
            <Autocomplete
              id="article"
              options={optionsar}
              getOptionLabel={option => option.label}
              style={{ width: 300 }}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Article"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Col>
          <Col md={6}>
            <Autocomplete
              id="fournisseur"
              options={optionss}
              getOptionLabel={option => option.label}
              style={{ width: 300 }}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Fournisseur"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col md={6}>
            <Autocomplete
              id="famille"
              options={optionsar}
              getOptionLabel={option => option.label}
              style={{ width: 300 }}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Famille"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Col>
          <Col md={6}>
            <Autocomplete
              id="sousfamille"
              options={optionss}
              getOptionLabel={option => option.label}
              style={{ width: 300 }}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Sous famille"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Col>
        </Row>
        <br />
        <Center>
          <Row>
            <Button variant="contained" color="primary">
              Apérçu
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button variant="contained" color="secondary">
              Imprimer
            </Button>
          </Row>
        </Center>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    SelectClient: () => dispatch(SelectClient()),
    SelectArticle: () => dispatch(SelectArticle())
  };
}

function mapStateToProps(state) {
  return {
    clients: state.clients,
    articles: state.articles
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ComboBox);
