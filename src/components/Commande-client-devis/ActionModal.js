import React, { Component } from "react";
import { Modal} from "react-bootstrap";
import "../styling/Styles.css";
import {  Col, Row } from "reactstrap";
import { Button } from "@material-ui/core";
import EmailModal from "./EmailModal";
import Tooltip from "@material-ui/core/Tooltip";


class ActionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openEmailModal: false, 
    
    };
  }
  render() {
    const {ccmail} = this.state;
    let emailModalClose = () => this.setState({ openEmailModal: false });
    return (
      <div className="container">
        <Modal style={{ background: "#eee"}}
          {...this.props}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
         <Modal.Header style={{backgroundColor: "#2980b9", height : "50px"}} closeButton>
                 <p><b>Devis client</b></p>
         </Modal.Header>
          <Modal.Body style={{ backgroundColor: "#2980b9"}} >
           <Row>
               <Col sm={12}>
               <Row>
                   <Col sm={6}>
                     {this.props.clientmail === '' ? 
                      <Tooltip title="Vous ne pouvez pas transférer ce devis par mail 
                      car ce client n'a pas de email">
                      <Button style={{ width : "100%"}}
                     disabled
                     variant="contained" >Transférer</Button></Tooltip>
                    :
                    <Tooltip title="Envoyer ce devis par mail ">
                    <Button style={{ width : "100%"}}
                    onClick={() => {this.setState({ openEmailModal: true, ccmail: this.props.clientmail })                   
                  }}
                   variant="contained" color="primary">Transférer</Button></Tooltip>
                    }
                
           <EmailModal
            show={this.state.openEmailModal}
            onHide={emailModalClose}
            ccmail={ccmail}
          />
                   </Col>
                   
                   <Col sm={6}>
                   <Button style={{ width : "100%"}} variant="contained" color="secondary">Imprimer</Button>
                   </Col>
               </Row>
               </Col>
           </Row>
          </Modal.Body>
          
        </Modal>
      </div>
    );
  }
}

export default ActionModal;
