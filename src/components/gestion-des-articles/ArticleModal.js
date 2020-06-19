import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";

const ArticleModal = props => {
  return (
    <div>
      <Modal isOpen={props.modal} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle}>Article Modal</ModalHeader>
        <ModalBody>
          {props.DataTables.elementDetails &&
            props.DataTables.elementDetails.title}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={props.toggle}>
            Enregistrer
          </Button>{" "}
          <Button color="secondary" onClick={props.toggle}>
            Supprimer
          </Button>
          <Button color="secondary" onClick={props.toggle}>
            List des Prix
          </Button>
          <Button color="secondary" onClick={props.toggle}>
            Vérifier stock
          </Button>
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
const ConnectedArticlesModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleModal);

export default ConnectedArticlesModal;
