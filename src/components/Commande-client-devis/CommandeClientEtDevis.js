import React, { Component } from "react";
import "../styling/Styles.css";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import image from "./devis.png";
import imagebc from "./bc.png";
import imagebl from "./bl.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { Toolbar } from "@material-ui/core";
import InfoDevisModal from "./InfoDevisModal";
import InfoBCModal from "./InfosBCModal";
import InfosCmdcfModal from "./InfosCmdcfModal";
import CmdClientFournisseurModal from "./CmdClientFournisseurModal";

class CommandeClientEtDevis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infodevisModal: false,
      infobcModal: false,
      infocmdcfModal: false,
      cmdCliFou: false
    };
  }
  render() {
    let infoModalClose1 = () => this.setState({ infodevisModal: false });
    let infobcModalClose = () => this.setState({ infobcModal: false });
    let infocmdcfModalClose = () => this.setState({ infocmdcfModal: false });
    let cmdcfModalClose = () => this.setState({ cmdCliFou: false });

    return (
      <div className="inline">
        <Card className="client-devis-card">
          <Link to="/devis">
            <CardActionArea>
              <img
                src={image}
                alt="Contact"
                style={{ width: "280px", height: "280px", marginLeft: "30px" }}
              />

              <CardContent>
                <Typography
                  style={{ fontWeight: "bold", color: "#020F64" }}
                  gutterBottom
                  variant="h5"
                  component="h2"
                >
                  Devis client
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Le devis désigne une proposition commerciale faite par un
                  fournisseur à son client, et qui restera valable jusqu’à ce
                  dernier décide de l'accepter ou non.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Link>
          <CardActions>
            <Toolbar title="Plus d'info">
              <Button
                size="medium"
                color="primary"
                style={{ position: "absolute", right: "5px", top: "3px" }}
                onClick={() => this.setState({ infodevisModal: true })}
              >
                <FontAwesomeIcon icon={faInfo} className="mr-2" />
              </Button>
            </Toolbar>
            <InfoDevisModal
              show={this.state.infodevisModal}
              onHide={infoModalClose1}
            ></InfoDevisModal>
          </CardActions>
        </Card>
        {/* /////////////////////////////////////////////////////////// */}
        <Card className="client-devis-card">
          <Link to="/bon-de-commande">
            <CardActionArea>
              <img
                src={imagebc}
                alt="Contact"
                style={{ width: "280px", height: "280px", marginLeft: "30px" }}
              />

              <CardContent>
                <Typography
                  style={{ fontWeight: "bold", color: "#020F64" }}
                  gutterBottom
                  variant="h5"
                  component="h2"
                >
                  Bon de commande
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Le bon de commande permet de définir et valider les modalités
                  de prestation entre vendeur et acheteur, afin d'éviter les cas
                  de contestations ultérieures tous comme le devis.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Link>

          <CardActions>
            <Toolbar title="Plus d'info">
              <Button
                size="medium"
                color="primary"
                onClick={() => this.setState({ infobcModal: true })}
                style={{ position: "absolute", right: "5px", top: "3px" }}
              >
                <FontAwesomeIcon icon={faInfo} className="mr-2" />
              </Button>
            </Toolbar>

            <InfoBCModal
              show={this.state.infobcModal}
              onHide={infobcModalClose}
            />
          </CardActions>
        </Card>
        {/* /////////////////////////////////////////////////////// */}
        <Card className="client-devis-card">
          <CardActionArea onClick={() => this.setState({ cmdCliFou: true })}>
            <img
              src={imagebl}
              alt="Contact"
              style={{ width: "280px", height: "280px", marginLeft: "30px" }}
            />

            <CardContent>
              <Typography
                style={{ fontWeight: "bold", color: "#020F64" }}
                gutterBottom
                variant="h5"
                component="h2"
              >
                Commandes des clients et fournisseurs
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Cela présente les commandes entre les clients et fournisseurs
              </Typography>
            </CardContent>
          </CardActionArea>
          <CmdClientFournisseurModal
            show={this.state.cmdCliFou}
            onHide={cmdcfModalClose}
          />
          <CardActions>
            <Toolbar title="Plus d'info">
              <Button
                size="medium"
                color="primary"
                onClick={() => this.setState({ infocmdcfModal: true })}
                style={{ position: "absolute", right: "5px" }}
              >
                <FontAwesomeIcon icon={faInfo} className="mr-2" />
              </Button>
            </Toolbar>

            <InfosCmdcfModal
              show={this.state.infocmdcfModal}
              onHide={infocmdcfModalClose}
            />
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default CommandeClientEtDevis;
