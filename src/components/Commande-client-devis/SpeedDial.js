import React, { Component } from 'react';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import PrintIcon from '@material-ui/icons/Print';
import EditIcon from '@material-ui/icons/Edit';
import SettingsIcon from '@material-ui/icons/Settings';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EmailModal from "./EmailModal";
import ModifierDevisModal from './ModifierDevisModal';



const actions = [
  { icon: <PrintIcon />, name: 'Imprimer'},
  { icon: <MailOutlineIcon />, name: 'Mail' },
  { icon: <EditIcon  />, name: 'Modifier' },
  { icon: <CancelPresentationIcon />, name: 'Annuler' },
  { icon: <DeleteOutlineIcon  />, name: 'Supprimer' },
];

class OpenIconSpeedDial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      hidden: false,
      openMailModal: false,
      openModifierModal: false,
      totalqte: this.props.totalqte,
      }
  }


  handleOpen = () => {
   this.setState({ open : true  });
  };

  handleClose = () => {
    this.setState({ open : false  });
  };

  openMail = () => {
    this.setState({ openMailModal: true  });
  };

  openModifier = () => {
    this.setState({ openModifierModal: true  });
    this.props.submitHandlerQte( this.state.totalqte);
  };


  affiche = () => {
    window.alert(this.state.totalqte);
    //console.log("psssssssssssssss", this.state.totalqte);
  };


  submitHandler = (totalqte) => {

    this.setState({
      
      totalqte: totalqte,
    });
  };

  render() { 
    let emailModalClose = () => this.setState({ openMailModal: false });
    let modifierModalClose = () => this.setState({ openModifierModal: false });

    return ( <div >
      <SpeedDial style={{ position: "absolute", bottom: "0px" , right: "10px" }}
        ariaLabel="SpeedDial openIcon example"
        hidden={this.state.hidden}
        icon={<SettingsIcon style={{ width: "50px", height: "50px", color: "#eee" }} openIcon={<EditIcon />} />}
        onClose={this.handleClose}
        onOpen={this.handleOpen}
        open={this.state.open}
      >
        {actions.map(action => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => {this.handleClose();
            action.name == "Imprimer" && this.affiche();
            action.name == "Mail" && this.openMail();
            action.name == "Modifier" && this.openModifier();
            }}
          />
          
        ))}
      </SpeedDial>
      <EmailModal  show={this.state.openMailModal}
            onHide={emailModalClose}/>

       <ModifierDevisModal  show={this.state.openModifierModal}
            onHide={modifierModalClose}
            numDeviss={this.props.numDevis}
            dateDeviss={this.props.dateDevis}
            testt={this.props.test}
            tvaaa={this.props.tvaa}
            totalqtee={this.props.totalqte}
            submitHandler={this.submitHandler}
            />     
    </div>);
  }
}
 
export default OpenIconSpeedDial; 