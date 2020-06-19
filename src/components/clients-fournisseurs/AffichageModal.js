import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { connect } from "react-redux";
import SettingsButton from "./SettingsButton";
import { Alert } from "reactstrap";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import "./ClientsFournisseurs.scss";
import ReactToPrint from "react-to-print";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    width: "100%"
  },
  control: {
    padding: theme.spacing(2)
  }
}));
const AffichageModal = props => {
  const classes = useStyles();

  const elementDetails = props.DataTables.elementDetails;
  return (
    <Modal isOpen={props.modal} toggle={props.toggle} className="affiche-modal">
      <ModalHeader toggle={props.toggle}>
        {props.etat === "client" ? "Client Modal" : "Fournisseur Modal"}
      </ModalHeader>
      <ModalBody>
        {elementDetails && (
          <main>
            <div style={{ display: "flex", alignItems: "center" }}>
              {elementDetails.clientType && (
                <Alert
                  color="success"
                  style={{
                    width: "fit-content",
                    marginRight: "15px",
                    height: "50px"
                  }}
                >
                  <p>Passager</p>
                </Alert>
              )}
            </div>
            <Grid item xs={12} style={{ margin: "10px" }}>
              <Grid container justify="center">
                <Grid item style={{ width: "100%" }}>
                  <Paper
                    className={classes.paper}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column"
                    }}
                  >
                    <center>
                      <h3>{elementDetails.name}</h3>
                    </center>
                    <p style={{ color: "gray", fontSize: "larger" }}>
                      {elementDetails.code}
                    </p>
                    {elementDetails.CIN && (
                      <p>
                        <i className="fas fa-id-card"></i>
                        {elementDetails.CIN}
                      </p>
                    )}
                    {(elementDetails.adresse ||
                      elementDetails.ville ||
                      elementDetails.codePostal) && (
                      <center>
                        <p>
                          <i className="fas fa-map-marked-alt"></i>
                          {elementDetails.adresse} {elementDetails.ville}
                          {elementDetails.codePostal &&
                            -elementDetails.codePostal}
                        </p>
                      </center>
                    )}
                    {(elementDetails.numTel1 || elementDetails.numTel2) && (
                      <center>
                        <p>
                          <i className="fas fa-phone-volume"></i>
                          {elementDetails.numTel1 +
                            (elementDetails.numTel1 &&
                              elementDetails.numTel2 &&
                              " - ") +
                            elementDetails.numTel2}
                        </p>
                      </center>
                    )}
                    {elementDetails.siteWeb && (
                      <center>
                        <p>
                          <i className="fas fa-globe"></i>
                          {elementDetails.siteWeb}
                        </p>
                      </center>
                    )}
                    {elementDetails.email && (
                      <p>
                        <i className="fas fa-envelope-open-text"></i>
                        {elementDetails.email}
                      </p>
                    )}
                    <p>{elementDetails.representant}</p>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
            <Alert
              color={elementDetails.timbre ? "success" : "danger"}
              style={{
                width: "fit-content",
                marginRight: "15px",
                height: "50px"
              }}
            >
              {elementDetails.timbre ? <p>Avec timbre</p> : <p>Sans timbre</p>}
            </Alert>
            <Grid item xs={12} style={{ margin: "10px" }}>
              <Grid container justify="center">
                <Grid item style={{ width: "100%" }}>
                  <Paper
                    className={classes.paper}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column"
                    }}
                  >
                    <span className="title-element">Code TVA</span>
                    <span>
                      {elementDetails.codeTVA ? elementDetails.codeTVA : "--"}
                    </span>
                    {props.etat === "client" ? (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center"
                        }}
                      >
                        <span className="title-element">Categorie Fiscale</span>
                        <span>{elementDetails.categorieFiscale}</span>
                        <span className="title-element">Remise </span>
                        <span>{elementDetails.remise + "%"}</span>
                      </div>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center"
                        }}
                      >
                        <span className="title-element">Taux Fodec</span>
                        <span>{elementDetails.tauxFodec}</span>
                      </div>
                    )}

                    <Alert
                      color="secondary"
                      style={{
                        width: "fit-content",
                        height: "50px"
                      }}
                    >
                      {elementDetails.regimeClient
                        ? "Régime forfaitaire"
                        : "Régime réel"}
                    </Alert>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>

            <div className="footer">
              <div className="element">
                <span> Solde Facture</span>
                <h3>{elementDetails.soldeFacture}</h3>
              </div>
              <div className="element">
                <span>Solde Global</span>
                <h3>{elementDetails.soldeGlobal}</h3>
              </div>
            </div>
          </main>
        )}
      </ModalBody>

      <SettingsButton />
    </Modal>
  );
};
const mapStateToProps = state => {
  return {
    SideBarTitles: state.SideBarTitles,
    DataTables: state.DataTablesReducer,
    SearchingResult: state.SearchingReducer.searching
  };
};
const ConnectedAffichageModal = connect(mapStateToProps)(AffichageModal);

export default ConnectedAffichageModal;
