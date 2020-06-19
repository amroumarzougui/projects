import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { top100Films } from "../../constants/dataTables";
const AddArticleModal = props => {
  const [modal, setModal] = React.useState(false);
  const [code, setCode] = React.useState("");
  const toggle = () => setModal(!modal);
  const getCode = event => setCode(event);
  return (
    <div>
      <Tooltip placement="top" title="Ajouter article">
        <Fab
          id="add-button"
          size="medium"
          color="secondary"
          aria-label="add"
          // className={classes.margin}
          onClick={toggle}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>Ajouter article</ModalHeader>
        <ModalBody>
          {code}
          <form noValidate autoComplete="off">
            <div className="ajouter-client-input">
              <Autocomplete
                onChange={(event, getOptionLabel) => {
                  console.log(getOptionLabel && getOptionLabel);
                  getCode(getOptionLabel.title);
                }}
                className="ajouter-client-input"
                id="combo-box-demo"
                options={top100Films}
                getOptionLabel={option => option.year.toString()}
                style={{ width: 150 }}
                renderInput={params => <input>{console.log(...params)}</input>}
              />
              <TextField
                className="ajouter-client-input"
                id="standard-number"
                label="CIN"
                type="number"
                InputLabelProps={{
                  shrink: true
                }}
              />
            </div>
            <div className="ajouter-client-input">
              <Autocomplete
                style={{ margin: "25px" }}
                id="combo-box-demo"
                options={top100Films}
                getOptionLabel={option => option.title}
                style={{ width: 300 }}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Raison sociale"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
            </div>
            <div className="ajouter-client-input">
              <TextField
                style={{ width: "80%", marginLeft: "10px" }}
                id="standard-basic"
                label="A contacter"
              />
            </div>
            <div className="ajouter-client-input">
              <TextField
                id="standard-basic"
                label="Adresse"
                style={{ width: "80%", marginLeft: "10px" }}
              />
              <TextField
                style={{ width: "40%", margin: "10px" }}
                id="standard-number"
                label="Code postal"
                type="number"
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                style={{ width: "40%", margin: "10px" }}
                id="standard-basic"
                label="Pays"
              />
            </div>
            <div className="ajouter-client-input">
              <TextField
                style={{ width: "40%", margin: "10px" }}
                id="standard-number"
                label="Numéro téléphone 1"
                type="number"
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                style={{ width: "40%", margin: "10px" }}
                id="standard-number"
                label="Numéro téléphone 2"
                type="number"
                InputLabelProps={{
                  shrink: true
                }}
              />
            </div>
            <div className="ajouter-client-input">
              <TextField
                style={{ width: "40%", margin: "10px" }}
                className="ajouter-client-input"
                id="standard-basic"
                label="E-mail"
              />
              <TextField
                style={{ width: "40%", margin: "10px" }}
                className="ajouter-client-input"
                id="standard-basic"
                label="Site Web"
              />
            </div>
            <Autocomplete
              className="ajouter-client-input"
              id="combo-box-demo"
              options={top100Films}
              getOptionLabel={option => option.title}
              style={{ width: 300 }}
              renderInput={params => (
                <TextField
                  className="ajouter-client-input"
                  {...params}
                  label="Représentant"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={props.toggle}>
            Enregistrer
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </div>
  );
};
const mapDispatchToProps = dispatch => ({});
const mapStateToProps = state => {
  return {
    SideBarTitles: state.SideBarTitles,
    DataTables: state.DataTablesReducer,
    SearchingResult: state.SearchingReducer.searching
  };
};
const ConnectedAddArticleModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddArticleModal);

export default ConnectedAddArticleModal;
