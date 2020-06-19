import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import FileCopyIcon from "@material-ui/icons/FileCopyOutlined";
import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";

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
const actions = [
  { icon: <FileCopyIcon />, name: "Aperçu" },
  { icon: <SaveIcon />, name: "Enregistrer" },
  {
    icon: <i className="fas fa-trash-alt" style={{ fontSize: "20px" }}></i>,
    name: "Supprimer"
  },
  {
    icon: <i class="fas fa-cubes" style={{ fontSize: "20px" }}></i>,
    name: "Vérifier stock"
  },
  {
    icon: <i class="fas fa-list"></i>,
    name: "Liste des prix"
  }
];

export default function ArticleButton(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
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
          onClick={handleClose}
        />
      ))}
    </SpeedDial>
  );
}
