import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import "../styling/Styles.css";

class InfoDevisModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="container">
        <Modal
          {...this.props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header
            closeButton
            style={{ backgroundColor: "white", color: "#020F64" }}
          >
            <Modal.Title id="contained-modal-title-vcenter">
              <b>Infos Devis client</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Remise globale : c’est la remise globale pour client. Marge Ben :
              marge bénéficiaire réalisée sur le Devis. -le remplissage du
              tableau se fait par la saisie des articles soit manuellement ou
              générer la liste des articles par F1. N.B :l’enregistrement ne
              peut être effectué que lorsque tableau contient au moins un
              article. -la suppression du Devis se fait sur deux étapes : «
              Annuler » puis « supprimer ». -le bouton «Ventes» représente la
              liste des ventes d’un article sélectionné, cela permet à
              l’utilisateur de consulter l’historique des prix de vente selon le
              client sélectionné dans le devis. -le bouton «Achats» représente
              la liste des achats d’un article sélectionné, cela permet à
              l’utilisateur de consulter l’historique des prix d’achats. N.B :le
              bouton « Remise\TTC » permet à l’utilisateur de changer
              directement le montant TTC du devis.
            </p>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default InfoDevisModal;
