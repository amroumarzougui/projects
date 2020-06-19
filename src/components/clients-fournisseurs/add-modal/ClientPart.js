import React from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "../ClientsFournisseurs.scss";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { categorieFiscaleOptions } from "../../../constants/dataTables";
const ClientPart = props => {
  return (
    <div>
      <div className="add-div" style={{ justifyContent: "start" }}>
        <Autocomplete
          className="add-input half-input"
          id="combo-box-demo"
          options={categorieFiscaleOptions}
          getOptionLabel={option => option.name.toString()}
          style={{ width: 300 }}
          onChange={(event, getOptionLabel) => {
            getOptionLabel
              ? props.addCategorieFiscale(getOptionLabel)
              : props.addCategorieFiscale(event.target.value);
          }}
          renderInput={params => (
            <TextField
              className="add-input specific-input"
              {...params}
              label={
                props.values.categorieFiscale >= 0
                  ? props.values.categorieFiscale
                  : "Catégorie Fiscale"
              }
              variant="outlined"
              fullWidth
              onChange={event => {
                props.addCategorieFiscale(event.target.value);
              }}
              value={props.values.categorieFiscale}
            />
          )}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginLeft: "10px"
          }}
        >
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
                checked={props.values.tauxAvanceImpot}
                onChange={props.addTauxAvanceImpot}
                value=""
                color="primary"
              />
            }
            label="taux d'avance d'impôt"
          />
        </div>
      </div>
      <div className="add-div">
        <TextField
          className="card add-input specific-input "
          id="outlined-basic"
          variant="outlined"
          label="Identifiant Unique"
          onChange={event => {
            props.addIdentifiantUnique(event.target.value);
          }}
          value={props.values.identifiantUnique}
        />
        <TextField
          className="card add-input specific-input "
          id="outlined-basic"
          variant="outlined"
          label="RIB"
          onChange={event => {
            props.addRIB(event.target.value);
          }}
          value={props.values.RIB}
        />
        <TextField
          className="card add-input specific-input "
          id="outlined-basic"
          variant="outlined"
          label="Remise"
          onChange={event => {
            props.addRemise(event.target.value);
          }}
          value={props.values.remise}
        />
      </div>
      <div className="add-div">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginLeft: "10px",
          }}
        >
          <FormControlLabel
            className="add-input"
            style={{ margin: "0px" }}
            control={
              <Switch
                checked={props.values.venteSelonPrixSpeciaux}
                onChange={props.addVenteSelonPrixSpeciaux}
                value=""
                color="primary"
              />
            }
            label="Vente Selon Prix Speciaux"
          />
          <FormControlLabel
            className="add-input"
            style={{ margin: "0px" }}
            control={
              <Switch
                checked={props.values.venteSelonListPrix}
                onChange={props.addVenteSelonListPrix}
                value=""
                color="primary"
              />
            }
            label="Vente Selon Liste de prix"
          />
          <FormControlLabel
            className="add-input"
            style={{ margin: "0px" }}
            control={
              <Switch
                checked={props.values.venteSelonRemise}
                onChange={props.addVenteSelonRemise}
                value=""
                color="primary"
              />
            }
            label="Vente Selon remises spéciales"
          />
        </div>
      </div>
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
const ConnectedClientPart = connect(mapStateToProps)(ClientPart);

export default ConnectedClientPart;
