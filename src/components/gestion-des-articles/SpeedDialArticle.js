import React, { Component } from "react";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import PrintIcon from "@material-ui/icons/Print";
import EditIcon from "@material-ui/icons/Edit";
import SettingsIcon from "@material-ui/icons/Settings";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import ModifierArticleModal from "./ModifierArticleModal";

const actions = [
  { icon: <PrintIcon />, name: "Imprimer" },
  { icon: <MailOutlineIcon />, name: "Mail" },
  { icon: <EditIcon />, name: "Modifier" },
  { icon: <DeleteOutlineIcon />, name: "Supprimer" }
];

class SpeedDialArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      hidden: false,
      openMailModal: false,
      openModifierModal: false
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  openMail = () => {
    this.setState({ openMailModal: true });
  };

  openModifier = () => {
    this.setState({ openModifierModal: true });
  };

  affiche = () => {
    window.alert(this.state.totalqte);
  };

  render() {
    let emailModalClose = () => this.setState({ openMailModal: false });
    let modifierModalClose = () => this.setState({ openModifierModal: false });

    return (
      <div>
        <SpeedDial
          style={{ position: "absolute", bottom: "0px", right: "10px" }}
          ariaLabel="SpeedDial openIcon example"
          hidden={this.state.hidden}
          icon={<EditIcon openIcon={<EditIcon />} />}
          onClose={this.handleClose}
          onOpen={this.handleOpen}
          open={this.state.open}
        >
          {actions.map(action => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => {
                this.handleClose();
                action.name == "Imprimer" && this.affiche();
                action.name == "Mail" && this.openMail();
                action.name == "Modifier" && this.openModifier();
              }}
            />
          ))}
        </SpeedDial>
        <ModifierArticleModal
          show={this.state.openModifierModal}
          onHide={modifierModalClose}
        />
        {/* <EmailModal show={this.state.openMailModal} onHide={emailModalClose} /> */}
      </div>
    );
  }
}

export default SpeedDialArticle;
