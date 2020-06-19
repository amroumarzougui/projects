import React from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import "../ClientsFournisseurs.scss";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const FournisseurPart = props => {
  return (
    <div>
      <div className="add-div">
        <TextField
          className="card add-input half-input"
          id="outlined-basic"
          variant="outlined"
          label="Identifiant Unique"
          onChange={event => {
            props.addIdentifiantUnique(event.target.value);
          }}
          value={props.values.identifiantUnique}
        />
        <TextField
          className="card add-input half-input"
          id="outlined-basic"
          variant="outlined"
          label="Autres Impots"
          onChange={event => {
            props.addAutresImpots(event.target.value);
          }}
          value={props.values.autresImpots}
        />
      </div>
      <div className="add-div">
        <TextField
          className="card add-input half-input"
          id="outlined-basic"
          variant="outlined"
          label="Taux Fodec"
          onChange={event => {
            props.addTauxFodec(event.target.value);
          }}
          value={props.values.tauxFodec}
        />

        <TextField
          className="card add-input half-input"
          id="outlined-basic"
          variant="outlined"
          label="Compte Comptable"
          onChange={event => {
            props.addCompteComptable(event.target.value);
          }}
          value={props.values.compteComptable}
        />
      </div>

      <FormControlLabel
        className="add-input"
        style={{ margin: "0px" }}
        control={
          <Switch
            checked={props.values.timbreFiscale}
            onChange={props.addTimbreFiscale}
            value=""
            color="primary"
          />
        }
        label="Timbre Fiscale"
      />
      <FormControlLabel
        className="add-input"
        style={{ margin: "0px" }}
        control={
          <Switch
            checked={props.values.sousTraitant}
            onChange={props.addSousTraitant}
            value=""
            color="primary"
          />
        }
        label="Sous traitant"
      />
    </div>
  );
};
const mapStateToProps = state => {
  return {
    SideBarTitles: state.SideBarTitles,
    DataTables: state.DataTablesReducer,
    SearchingResult: state.SearchingReducer.searching
  };
};
const ConnectedFournisseurPart = connect(mapStateToProps)(FournisseurPart);

export default ConnectedFournisseurPart;
