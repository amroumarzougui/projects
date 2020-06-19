import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import "../ClientsFournisseurs.scss";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import ConnectedClientPart from "./ClientPart";
import ConnectedFournisseurPart from "./FournisseurPart";
import { postClient, putClient } from "../../../redux/actions/ClientActions";
import {
  postFournisseur,
  putFournisseur
} from "../../../redux/actions/FournisseurActions";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function AddModal(props) {
  const elementDetails = props.DataTables.elementDetails;
  const [code, setCode] = useState(elementDetails.code);
  const [raisonSociale, setRaisonSociale] = useState(elementDetails.name);
  const [acontacter, setAcontacter] = useState(elementDetails.name);
  const [CIN, setCIN] = React.useState(elementDetails.CIN);
  const [siteWeb, setSiteWeb] = useState(elementDetails.siteWeb);
  const [adresse, setAdresse] = useState(elementDetails.adresse);
  const [timbreFiscale, setTimbreFiscale] = useState(elementDetails.timbre);
  const [clientType, setClientType] = useState(elementDetails.clientType);
  const [numTel1, setNumTel1] = useState(elementDetails.numTel1);
  const [numTel2, setNumTel2] = useState(elementDetails.numTel2);
  const [email, setEmail] = useState(elementDetails.email);
  const [tauxAvanceImpot, setTauxAvanceImpot] = useState(false);
  const [representant, setRepresentant] = useState(elementDetails.representant);
  const [newPerson, setNewPerson] = useState([]);
  const [categorieFiscale, setCategorieFiscale] = useState(
    elementDetails.categorieFiscale
  );
  const [identifiantUnique, setIdentifiantUnique] = useState(
    elementDetails.codeTVA
  );
  const [remise, setRemise] = useState(elementDetails.remise);
  const [RIB, setRIB] = useState(elementDetails.RIB);
  const [ville, setVille] = useState(elementDetails.ville);
  const [codePostal, setCodePostal] = useState(elementDetails.codePostal);
  const [venteSelonPrixSpeciaux, setVenteSelonPrixSpeciaux] = useState(false);
  const [venteSelonListPrix, setVenteSelonListPrix] = useState(false);
  const [venteSelonRemise, setVenteSelonRemise] = useState(false);

  const [listPrix, setListPrix] = useState(false);
  const [tauxFodec, setTauxFodec] = useState(elementDetails.tauxFodec);
  const [autresImpots, setAutresImpots] = useState("");
  const [compteComptable, setCompteComptable] = useState("");
  const [sousTraitant, setSousTraitant] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const addCode = event => setCode(event);
  const addRaisonSociale = event => setRaisonSociale(event);
  const addTimbreFiscale = event => setTimbreFiscale(!timbreFiscale);
  const addSiteWeb = event => setSiteWeb(event);
  const addAdresse = event => setAdresse(event);
  const addCIN = event => setCIN(event);
  const addClientType = event => setClientType(!clientType);
  const addNumTel1 = event => setNumTel1(event);
  const addNumTel2 = event => setNumTel2(event);
  const addEmail = event => setEmail(event);
  const addTauxAvanceImpot = event => setTauxAvanceImpot(!tauxAvanceImpot);
  const addRepresentant = event => setRepresentant(event);
  const addCategorieFiscale = event => setCategorieFiscale(event);
  const addIdentifiantUnique = event => {
    if (event.length < 7) {
      setIdentifiantUnique(event);
    }
  };
  const addRemise = event => setRemise(event);
  const addRIB = event => setRIB(event);
  const addVille = event => setVille(event);
  const addCodePostal = event => setCodePostal(event);
  const addAcontacter = event => setAcontacter(event);
  const addVenteSelonPrixSpeciaux = event => {
    setVenteSelonPrixSpeciaux(!venteSelonPrixSpeciaux);
  };
  const addVenteSelonListPrix = event => {
    setVenteSelonListPrix(!venteSelonListPrix);
  };
  const addVenteSelonRemise = event => {
    setVenteSelonRemise(!venteSelonRemise);
  };
  const addListPrix = event => {
    setListPrix(event);
  };
  const addTauxFodec = event => {
    setTauxFodec(event);
  };
  const addAutresImpots = event => {
    setAutresImpots(event);
  };
  const addCompteComptable = event => {
    setCompteComptable(event);
  };
  const addSousTraitant = event => {
    setSousTraitant(event);
  };
  const addNewPerson = () => {
    setNewPerson(values);
  };
  const values = {
    code,
    raisonSociale,
    CIN,
    siteWeb,
    adresse,
    timbreFiscale,
    clientType,
    numTel1,
    numTel2,
    email,
    tauxAvanceImpot,
    representant,
    categorieFiscale,
    identifiantUnique,
    RIB,
    ville,
    remise,
    acontacter,
    venteSelonPrixSpeciaux,
    venteSelonListPrix,
    venteSelonRemise,
    listPrix,
    tauxFodec,
    autresImpots,
    compteComptable,
    sousTraitant
  };
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      {console.log(newPerson)}
      <Snackbar
        open={open}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={handleClose}
      >
        <Alert severity="error">{alertMessage}!</Alert>
      </Snackbar>
      <Modal isOpen={props.modal} className="add-modal">
        <ModalHeader toggle={props.toggle}>{props.title}</ModalHeader>
        <ModalBody>
          <form noValidate autoComplete="off">
            <div className="personnel-information">
              <div>
                <TextField
                  className="card add-input"
                  required
                  type="number"
                  id="outlined-basic"
                  label="Code"
                  variant="outlined"
                  onChange={event => addCode(event.target.value)}
                  value={code}
                />
                <FormControlLabel
                  className="add-input"
                  control={
                    <Switch
                      checked={clientType}
                      onChange={addClientType}
                      value={clientType}
                      color="primary"
                    />
                  }
                  label="Passager"
                />
              </div>

              <div className="add-div">
                <TextField
                  className="card add-input"
                  required
                  id="outlined-basic"
                  label="Raison sociale"
                  variant="outlined"
                  onChange={event => addRaisonSociale(event.target.value)}
                  value={raisonSociale}
                />
                {props.DataTables.etat === "client" ? (
                  <TextField
                    className="card add-input"
                    id="outlined-basic"
                    label="Représentant"
                    variant="outlined"
                    onChange={event => addRepresentant(event.target.value)}
                    value={representant}
                    name="representant"
                  />
                ) : (
                  ""
                )}
                <TextField
                  className="card add-input"
                  id="outlined-basic"
                  label="à contacter"
                  variant="outlined"
                  onChange={event => addAcontacter(event.target.value)}
                  value={acontacter}
                  name="acontacter"
                />
                <TextField
                  className="card add-input "
                  id="outlined-basic"
                  variant="outlined"
                  label="CIN"
                  value={CIN}
                  name="CIN"
                  onChange={event => addCIN(event.target.value)}
                />
                <TextField
                  className="card add-input specific-input "
                  id="outlined-basic"
                  label="E-mail"
                  variant="outlined"
                  value={email}
                  name="email"
                  onChange={event => addEmail(event.target.value)}
                />

                <TextField
                  className="card add-input "
                  id="outlined-basic"
                  label="Site Web"
                  variant="outlined"
                  onChange={event => addSiteWeb(event.target.value)}
                  value={siteWeb}
                  name="siteWeb"
                />
                <TextField
                  className="card add-input "
                  id="outlined-basic"
                  label="Adresse"
                  variant="outlined"
                  value={adresse}
                  name="adresse"
                  onChange={event => addAdresse(event.target.value)}
                />

                <TextField
                  className="card add-input "
                  id="outlined-basic"
                  label="Ville"
                  variant="outlined"
                  onChange={event => addVille(event.target.value)}
                  value={ville}
                  name="ville"
                />
                <TextField
                  className="card add-input specific-input "
                  id="outlined-basic"
                  label="Code Postal"
                  variant="outlined"
                  onChange={event => addCodePostal(event.target.value)}
                  value={codePostal}
                  name="codePostal"
                />

                <TextField
                  className="card add-input "
                  id="outlined-basic"
                  label="Numéro téléphone 1"
                  variant="outlined"
                  onChange={event => addNumTel1(event.target.value)}
                  value={numTel1}
                  name="numTel1"
                />
                <TextField
                  className="card add-input "
                  id="outlined-basic"
                  variant="outlined"
                  label="Numéro téléphone 2"
                  onChange={event => addNumTel2(event.target.value)}
                  value={numTel2}
                  name="numTel2"
                />
              </div>
            </div>
            {props.DataTables.etat === "client" ? (
              <ConnectedClientPart
                addCategorieFiscale={addCategorieFiscale}
                addTimbreFiscale={addTimbreFiscale}
                addTauxAvanceImpot={addTauxAvanceImpot}
                addRIB={addRIB}
                addIdentifiantUnique={addIdentifiantUnique}
                addRemise={addRemise}
                addVenteSelonPrixSpeciaux={addVenteSelonPrixSpeciaux}
                addVenteSelonListPrix={addVenteSelonListPrix}
                addVenteSelonRemise={addVenteSelonRemise}
                addListPrix={addListPrix}
                values={values}
              />
            ) : (
              <ConnectedFournisseurPart
                addTauxFodec={addTauxFodec}
                addTimbreFiscale={addTimbreFiscale}
                addSousTraitant={addSousTraitant}
                addAutresImpots={addAutresImpots}
                addCompteComptable={addCompteComptable}
                addIdentifiantUnique={addIdentifiantUnique}
                values={values}
              />
            )}
          </form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              if (!code) {
                setAlertMessage("ajouter  code client");
                handleClick();
              } else {
                if (!raisonSociale) {
                  setAlertMessage("ajouter raison sociale");
                  handleClick();
                } else {
                  if (
                    (identifiantUnique && identifiantUnique.length !== 6) ||
                    !identifiantUnique
                  ) {
                    setAlertMessage("Identifiant unique incorrect");
                    handleClick();
                  } else {
                    addNewPerson();

                    if (props.type === "put client") {
                      props.putClient(values);
                      props.toggle();
                    }
                    if (props.type === "put fournisseur") {
                      props.putFournisseur(values);
                      props.toggle();
                    }
                    if (props.type === "post client") {
                      props.toggle();
                      props.postClient(values);
                    }
                    if (props.type === "post fournisseur") {
                      props.postFournisseur(values);
                      props.toggle();
                    }
                  }
                }
              }
            }}
          >
            Enregistrer
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
const mapDispatchToProps = dispatch => ({
  postClient: values => {
    dispatch(postClient(values));
  },
  putClient: values => {
    dispatch(putClient(values));
  },
  putFournisseur: values => {
    dispatch(putFournisseur(values));
  },
  postFournisseur: values => {
    dispatch(postFournisseur(values));
  }
});
const mapStateToProps = state => {
  return {
    SideBarTitles: state.SideBarTitles,
    DataTables: state.DataTablesReducer,
    SearchingResult: state.SearchingReducer.searching
  };
};
const ConnectedAddModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddModal);

export default ConnectedAddModal;
