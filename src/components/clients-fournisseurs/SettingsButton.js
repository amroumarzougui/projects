import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import EditIcon from "@material-ui/icons/Edit";
import { deleteClient } from "../../redux/actions/ClientActions";
import { deleteFournisseur } from "../../redux/actions/FournisseurActions";

import { apercuElement } from "../../redux/actions/SettingsActions";
import AddModal from "./add-modal/AddModal";
import { clientActions, fournisseurActions } from "../../constants/dataTables";
import { connect } from "react-redux";
const useStyles = makeStyles(theme => ({
  root: {
    height: 380,
    transform: "translateZ(0px)",
    flexGrow: 1
  },
  speedDial: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}));

function SettingsButton(props) {
  const elementDetails = props.DataTables.elementDetails;

  const actions =
    props.DataTables.etat === "client" ? clientActions : fournisseurActions;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const toggle = () => setModal(!modal);
  const [modal, setModal] = React.useState(false);
  return (
    <div>
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        className={classes.speedDial}
        icon={<EditIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map(action => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => {
              handleClose();
              action.name === "modifier" && toggle();
              elementDetails &&
              action.name === "Supprimer" &&
              props.DataTables.etat === "client"
                ? props.deleteClient(elementDetails.code)
                : props.deleteFournisseur(elementDetails.code);
              action.name === "Imprimer" &&
                elementDetails &&
                props.apercuElement(elementDetails);
            }}
          />
        ))}
      </SpeedDial>
      <AddModal
        type={"put " + props.DataTables.etat}
        toggle={toggle}
        modal={modal}
      />
    </div>
  );
}
const mapDispatchToProps = dispatch => ({
  deleteClient: clientId => {
    dispatch(deleteClient(clientId));
  },
  deleteFournisseur: fournisseurId => {
    dispatch(deleteFournisseur(fournisseurId));
  },
  apercuElement: elementDetails => {
    dispatch(apercuElement(elementDetails));
  }
});
const mapStateToProps = state => {
  return {
    SideBarTitles: state.SideBarTitles,
    DataTables: state.DataTablesReducer,
    SearchingResult: state.SearchingReducer.searching
  };
};
const ConnectedSettingsButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsButton);

export default ConnectedSettingsButton;
