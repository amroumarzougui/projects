import React, { Component } from "react";
import { Modal, Card, Row, Col } from "react-bootstrap";
import "../styling/Styles.css";
import './ss.scss';
import Typography from '@material-ui/core/Typography';
import { Label, Table } from "reactstrap";
import ProgressBar from "./ProgressBar";
import { connect } from "react-redux";
import { SelectBCLig } from "../../redux/actions/GetBCLig";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import PrintIcon from "@material-ui/icons/Print";
import EditIcon from "@material-ui/icons/Edit";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import ModifierBCModal from "./ModifierBCModal";
import { Divider } from "@material-ui/core";

const roundTo = require('round-to');



const actions = [
    { icon: <PrintIcon />, name: "Imprimer" },
    { icon: <EditIcon />, name: "Modifier" },
    { icon: <CancelPresentationIcon />, name: "Annuler" },
    { icon: <DeleteOutlineIcon />, name: "Supprimer" }
];





class GetBCByIdModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            hidden: false,
            openModifierModal: false,
            ligid: "",
            bcid: "",
            tab: [],
            newtab: [],

            codearticle: 0,
            des: "",
            qte: 0,
            unite: 0,
            puht: 0,
            faudec: 0,
            remisea: 0,
            tva: 0,
            puttcnet: 0,
            totalht: 0,

            totalqte: 0,
            netapayer: 0,
        };
    }

    componentDidMount() {
        this.props.SelectBCLig();
    };


    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    openMail = () => {
        // this.setState({ openMailModal: true });
    };

    openModifier = () => {
        this.setState({ openModifierModal: true, bcid: this.props.bcid });
        this.props.bcligs.bcligs.map(t => {
            this.setState({ ligid: t.id });
        })
    };

    annuler = () => {
        window.alert("annuler");
    };

    imprimer = () => {
        window.alert("imprimer");
    };

    supprimer = () => {
        window.alert("supprimer");
    };

    render() {
        let ModifierModalClose = () => this.setState({ openModifierModal: false });

        const { ligidd, bcidd, tabb } = this.state;


        return (
            <div className="container">
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header
                        closeButton
                        style={{ backgroundColor: "white", color: "#08052B" }}
                    >
                        <Modal.Title id="contained-modal-title-vcenter">
                            <b>Détails Bon de commande</b>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Card>
                            <Card.Body>
                                <Row>
                                    <Col style={{ textAlign: "center" }} sm={3}>
                                        <Typography variant="h6" component="h2">
                                            <Label>№ BC</Label>
                                        </Typography>
                                        <Typography style={{ color: "grey" }}>
                                            {this.props.bcid}
                                        </Typography>
                                    </Col>

                                    <Col style={{ textAlign: "center" }} sm={3}>
                                        <Typography variant="h6" component="h2">
                                            <Label>Date BC</Label>
                                        </Typography>
                                        <Typography style={{ color: "grey" }}>
                                            {this.props.datebc}
                                        </Typography>
                                    </Col>

                                    <Col style={{ textAlign: "center" }} sm={3}>
                                        <Typography variant="h6" component="h2">
                                            <Label>Client</Label>
                                        </Typography>
                                        <Typography style={{ color: "grey" }}>
                                            {this.props.client}
                                        </Typography>
                                    </Col>

                                    <Col style={{ textAlign: "center" }} sm={3}>
                                        <Typography variant="h6" component="h2">
                                            <Label>Raison Sociale</Label>
                                        </Typography>
                                        <Typography style={{ color: "grey" }}>
                                            {this.props.raisonsociale}
                                        </Typography>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>

                        <Card style={{ marginTop: "10px" }}>
                            <Card.Body>
                                {/* <div className="ligbc-table"> */}
                                <div className="tab28">

                                    <table stripped >
                                        <thead style={{ textAlign: "center", fontSize: "12px" }}>
                                            <tr >
                                                <th >Article</th>
                                                <th >Désignation</th>
                                                <th >Quantité</th>
                                                <th >Unité</th>
                                                <th >PUHT</th>
                                                <th>Fodec</th>
                                                <th>Remise</th>
                                                <th >TVA</th>
                                                <th >TotalHT</th>
                                                <th >PUNet</th>
                                            </tr>
                                        </thead>
                                        <tbody style={{ overflowY: "auto", display: "block", maxHeight: "10em" }}>
                                            {this.props.bcligs.bcligs.map(t => (
                                                t.userId === this.props.bcid ? (
                                                    this.state.newtab = this.state.newtab.concat({
                                                        codearticle: t.id,
                                                        des: t.title,
                                                        qte: t.id,
                                                        unite: t.id,
                                                        puht: t.id,
                                                        faudec: t.id,
                                                        remisea: t.id,
                                                        tva: t.id,
                                                        puttcnet: t.id,
                                                        totalht: t.id,

                                                    }),
                                                    this.state.totalqte = this.state.newtab && this.state.newtab.reduce((a, v) => a + parseInt(v.qte), 0),
                                                    this.state.netapayer = this.state.newtab && this.state.newtab.reduce((a, v) => a + ((v.totalht * ((100 - this.props.rem) / 100)) + ((v.qte * v.puht * ((100 - v.remisea) / 100) * (v.tva / 100)))), 0),

                                                    <tr style={{ textAlign: "center" }}>
                                                        <td>{t.id}</td>
                                                        <td style={{ fontSize: "12px" }}>{t.title}</td>
                                                        <td>{t.userId}</td>
                                                        <td>{t.id}</td>
                                                        <td>{t.id}</td>
                                                        <td>
                                                            {t.faudec === "A" ? (
                                                                <span>✔</span>
                                                            ) : (
                                                                    <span>Ø</span>
                                                                )}
                                                        </td>
                                                        <td>{t.userId}</td>
                                                        <td >{t.userId}</td>
                                                        <td>{t.id}</td>
                                                        <td>{t.id}</td>
                                                    </tr>)
                                                    :
                                                    <tr>

                                                    </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Card.Body>
                        </Card>





                        <Card style={{ marginTop: "10px" }}>
                            <Card.Body>
                                <Row style={{ marginBottom: "-10px" }}>
                                    <Col sm={3}
                                        style={{
                                            width: "100%",
                                            display: "flex",
                                            alignItems: "center",
                                            flexDirection: "column",
                                            textAlign: "center"
                                        }}>
                                        <p style={{ color: "grey", marginBottom: "-5px" }}>
                                            Total HT Brut</p>
                                        <p style={{ color: "black", }}>
                                            {this.props.totalhtbrut}</p>
                                    </Col>

                                    <Col sm={3}
                                        style={{
                                            width: "100%",
                                            display: "flex",
                                            alignItems: "center",
                                            flexDirection: "column",
                                            textAlign: "center"
                                        }}>
                                        <p style={{ color: "grey", marginBottom: "-5px" }}>
                                            Remise Article</p>
                                        <p style={{ color: "black", }}>
                                            {this.props.remiselignes}</p>
                                    </Col>

                                    <Col sm={3}
                                        style={{
                                            width: "100%",
                                            display: "flex",
                                            alignItems: "center",
                                            flexDirection: "column",
                                            textAlign: "center"
                                        }}>
                                        <p style={{ color: "grey", marginBottom: "-5px" }}>
                                            Total TVA</p>
                                        <p style={{ color: "black", }}>
                                            {this.props.totaltva}</p>
                                    </Col>

                                    <Col sm={3}
                                        style={{
                                            width: "100%",
                                            display: "flex",
                                            alignItems: "center",
                                            flexDirection: "column",
                                            textAlign: "center"
                                        }}>
                                        <p style={{ color: "grey", marginBottom: "-5px" }}>
                                            Total Quantité</p>
                                        <p style={{ color: "black", }}>
                                            {/* {this.props.totalqte} */}
                                            {this.state.totalqte}
                                        </p>
                                    </Col>
                                </Row>

                                <Row style={{ marginBottom: "10px" }}>
                                    <Col sm={3}>
                                        <Divider style={{ backgroundColor: "grey" }} />
                                    </Col>
                                    <Col sm={3}>

                                        <Divider style={{ backgroundColor: "grey" }} />
                                    </Col>
                                    <Col sm={3}>
                                        <Divider style={{ backgroundColor: "grey" }} />
                                    </Col>
                                    <Col sm={3}>
                                        <Divider style={{ backgroundColor: "grey" }} />
                                    </Col>
                                </Row>

                                {/* <Row style={{ marginTop: "-20px" }}>
                                    <Col sm={3}>
                                        <ProgressBar />
                                    </Col>
                                    <Col sm={3}>
                                        <ProgressBar />
                                    </Col>
                                    <Col sm={3}>
                                        <ProgressBar />
                                    </Col>
                                    <Col sm={3}>
                                        <ProgressBar />
                                    </Col>
                                </Row> */}


                                <Row style={{ marginBottom: "-10px" }}>
                                    <Col sm={3}
                                        style={{
                                            width: "100%",
                                            display: "flex",
                                            alignItems: "center",
                                            flexDirection: "column",
                                            textAlign: "center"
                                        }}>
                                        <p style={{ color: "grey", marginBottom: "-5px" }}>
                                            Droit de timbre</p>
                                        <p style={{ color: "black", }}>
                                            {this.props.droitdetimbre}</p>
                                    </Col>

                                    <Col sm={3}
                                        style={{
                                            width: "100%",
                                            display: "flex",
                                            alignItems: "center",
                                            flexDirection: "column",
                                            textAlign: "center"
                                        }}>
                                        <p style={{ color: "grey", marginBottom: "-5px" }}>
                                            Total DC</p>
                                        <p style={{ color: "black", }}>
                                            {this.props.totaldc}</p>
                                    </Col>

                                    <Col sm={3}
                                        style={{
                                            width: "100%",
                                            display: "flex",
                                            alignItems: "center",
                                            flexDirection: "column",
                                            textAlign: "center"
                                        }}>
                                        <p style={{ color: "grey", marginBottom: "-5px" }}>
                                            Total COS</p>
                                        <p style={{ color: "black", }}>
                                            {this.props.totalcos}</p>
                                    </Col>

                                    <Col sm={3}
                                        style={{
                                            width: "100%",
                                            display: "flex",
                                            alignItems: "center",
                                            flexDirection: "column",
                                            textAlign: "center"
                                        }}>
                                        <p style={{ color: "grey", marginBottom: "-5px" }}>
                                            Avance Impot</p>
                                        <p style={{ color: "black", }}>
                                            {this.props.avanceimpot}
                                        </p>
                                    </Col>
                                </Row>


                                {/* ///////////////////3eme/////////////////////////////////// */}

                                <Row style={{ marginBottom: "10px" }}>
                                    <Col sm={3}>
                                        <Divider style={{ backgroundColor: "grey" }} />
                                    </Col>
                                    <Col sm={3}>

                                        <Divider style={{ backgroundColor: "grey" }} />
                                    </Col>
                                    <Col sm={3}>
                                        <Divider style={{ backgroundColor: "grey" }} />
                                    </Col>
                                    <Col sm={3}>
                                        <Divider style={{ backgroundColor: "grey" }} />
                                    </Col>
                                </Row>


                                <Row style={{ marginBottom: "-25px" }}>
                                    <Col sm={3}
                                        style={{
                                            width: "100%",
                                            display: "flex",
                                            alignItems: "center",
                                            flexDirection: "column",
                                            textAlign: "center"
                                        }}>
                                        <p style={{ color: "grey", marginBottom: "-5px" }}>
                                            Total HT Net</p>
                                        <p style={{ color: "black", }}>
                                            {this.props.totalhtnet}</p>
                                    </Col>

                                    <Col sm={3}
                                        style={{
                                            width: "100%",
                                            display: "flex",
                                            alignItems: "center",
                                            flexDirection: "column",
                                            textAlign: "center"
                                        }}>
                                        <p style={{ color: "grey", marginBottom: "-5px" }}>
                                            Remise Globale</p>
                                        <p style={{ color: "black", }}>
                                            {this.props.remiseglobale}</p>
                                    </Col>

                                    <Col sm={3}
                                        style={{
                                            width: "100%",
                                            display: "flex",
                                            alignItems: "center",
                                            flexDirection: "column",
                                            textAlign: "center"
                                        }}>
                                        <p style={{ color: "grey", marginBottom: "-5px" }}>
                                            Total TTC</p>
                                        <p style={{ color: "black", }}>
                                            {this.props.totalttc}</p>
                                    </Col>

                                    <Col sm={3}
                                        style={{
                                            width: "100%",
                                            display: "flex",
                                            alignItems: "center",
                                            flexDirection: "column",
                                            textAlign: "center"
                                        }}>
                                        <p style={{ color: "grey", marginBottom: "-5px" }}>
                                            Net à Payer</p>
                                        <p style={{ color: "black", }}>
                                            {this.state.netapayer}
                                        </p>
                                    </Col>
                                </Row>

                            </Card.Body>
                        </Card>

                        {/* ///////////////////SpeedDial//////////////////////////////// */}
                        <Row>
                            <Col sm={10}>
                            </Col>
                            <Col sm={2}>
                                <SpeedDial
                                    style={{ position: "absolute", bottom: "-20px", right: "10px" }}
                                    ariaLabel="SpeedDial openIcon example"
                                    hidden={this.state.hidden}
                                    icon={
                                        <EditIcon

                                            openIcon={<EditIcon />}
                                        />
                                    }
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
                                                action.name == "Imprimer" && this.imprimer();
                                                action.name == "Modifier" && this.openModifier();
                                                action.name == "Supprimer" && this.supprimer();
                                                action.name == "Annuler" && this.annuler();
                                            }}
                                        />
                                    ))}
                                </SpeedDial>
                            </Col>
                        </Row>


                        <ModifierBCModal
                            show={this.state.openModifierModal}
                            onHide={ModifierModalClose}
                            ligidd={this.state.ligid}
                            bcidd={this.state.bcid}

                            tabb={this.state.newtab}
                        />


                    </Modal.Body>
                    <Modal.Footer></Modal.Footer>
                </Modal>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        SelectBCLig: () => dispatch(SelectBCLig()),

    };
}

function mapStateToProps(state) {
    return {
        bcligs: state.bcligs,

    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GetBCByIdModal);
