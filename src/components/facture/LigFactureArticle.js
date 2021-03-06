import React, { Component } from "react";
import { Modal, Card } from "react-bootstrap";
import "../styling/Styles.css";
import "./facture.scss";
import { Input, Label, FormGroup, Col, Row, Button } from "reactstrap";
import { connect } from "react-redux";
import { SelectArticle } from "../../redux/actions/GetArticles";
import { TextField, Fab } from "@material-ui/core";
import "../styling/Styling.scss";
import Center from "react-center";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
// import EditArticleModal from "./EditArticleModal"; 
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import Checkbox from "@material-ui/core/Checkbox";
import EditIcon from "@material-ui/icons/Edit";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

class LigBLArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            codearticle: "",
            qte: "",
            totalht: 0,
            des: "",
            unite: "",
            puht: "",
            remisea: 0,
            tva: 0,
            puttcnet: 0,
            faudec: "N",
            tab: [],
            totalqte: 0,
            sumremisearticle: 0,
            totalhtbrut: 0,
            totaltva: 0,
            totalhtnet: 0,
            remiseglobal: 0,
            netapayer: 0,
            snackbaropen: false,
            snackbarfail: false,
            editModalShow: false,
            qtte: 0,
            btnEnabled: false,
            gilad: true
        };
    }

    componentDidMount() {
        this.props.SelectArticle();
    }

    snackbarClose = event => {
        this.setState({ snackbaropen: false });
    };

    snackbarFailClose = event => {
        this.setState({ snackbarfail: false });
    };

    qteHandler = event => {
        console.log(typeof parseInt(event.target.value));
        console.log(typeof this.state.totalqte);

        this.setState({
            qte: event.target.value,
            puttcnet: this.state.puht + this.state.puht * (this.state.tva / 100),
            totalht: event.target.value * this.state.puht
        });
    };

    submitHandler = event => {
        event.preventDefault();

        const newtab = this.state.tab.concat({
            codearticle: this.state.codearticle,
            des: this.state.des,
            qte: this.state.qte,
            unite: this.state.unite,
            puht: this.state.puht,
            faudec: this.state.faudec,
            remisea: this.state.remisea,
            tva: this.state.tva,
            puttcnet: this.state.puttcnet,
            totalht: this.state.totalht
        });
        const SumQte = newtab && newtab.reduce((a, v) => a + parseInt(v.qte), 0);
        const SumRemiseArticle =
            newtab &&
            newtab.reduce(
                (a, v) => a + (parseInt(v.qte) * v.puht * v.remisea) / 100,
                0
            );
        const SumHtBrut =
            newtab && newtab.reduce((a, v) => a + parseInt(v.qte) * v.puht, 0);
        const SumTva =
            newtab &&
            newtab.reduce(
                (a, v) =>
                    a +
                    parseInt(v.qte) * v.puht * ((100 - v.remisea) / 100) * (v.tva / 100),
                0
            );
        const SumHtNet =
            newtab &&
            newtab.reduce(
                (a, v) => a + v.totalht * ((100 - this.props.rem) / 100),
                0
            );
        const SumRemiseGlobale =
            newtab &&
            newtab.reduce((a, v) => a + v.totalht * (this.props.rem / 100), 0);
        const SumNetAPayer =
            newtab &&
            newtab.reduce(
                (a, v) =>
                    a +
                    (v.totalht * ((100 - this.props.rem) / 100) +
                        v.qte * v.puht * ((100 - v.remisea) / 100) * (v.tva / 100)),
                0
            );

        this.setState({
            tab: newtab,

            totalqte: SumQte,
            sumremisearticle: SumRemiseArticle,
            totalhtbrut: SumHtBrut,
            totaltva: SumTva,
            totalhtnet: SumHtNet,
            remiseglobal: SumRemiseGlobale,
            netapayer: SumNetAPayer,
            snackbaropen: true,
            btnEnabled: true
        });

        this.setState({
            codearticle: "",
            qte: "",
            totalht: 0,
            des: "",
            unite: "",
            puht: "",
            remisea: 0,
            tva: 0,
            puttcnet: 0,
            faudec: "N"
        });
    };

    qteHandler = event => {
        console.log(typeof parseInt(event.target.value));
        console.log(typeof this.state.totalqte);

        this.setState({
            qte: event.target.value,
            puttcnet: this.state.puht + this.state.puht * (this.state.tva / 100),
            totalht: event.target.value * this.state.puht
        });
    };

    submitHandler = event => {
        event.preventDefault();

        const newtab = this.state.tab.concat({
            codearticle: this.state.codearticle,
            des: this.state.des,
            qte: this.state.qte,
            unite: this.state.unite,
            puht: this.state.puht,
            faudec: this.state.faudec,
            remisea: this.state.remisea,
            tva: this.state.tva,
            puttcnet: this.state.puttcnet,
            totalht: this.state.totalht
        });
        const SumQte = newtab && newtab.reduce((a, v) => a + parseInt(v.qte), 0);
        const SumRemiseArticle =
            newtab &&
            newtab.reduce(
                (a, v) => a + (parseInt(v.qte) * v.puht * v.remisea) / 100,
                0
            );
        const SumHtBrut =
            newtab && newtab.reduce((a, v) => a + parseInt(v.qte) * v.puht, 0);
        const SumTva =
            newtab &&
            newtab.reduce(
                (a, v) =>
                    a +
                    parseInt(v.qte) * v.puht * ((100 - v.remisea) / 100) * (v.tva / 100),
                0
            );
        const SumHtNet =
            newtab &&
            newtab.reduce(
                (a, v) => a + v.totalht * ((100 - this.props.rem) / 100),
                0
            );
        const SumRemiseGlobale =
            newtab &&
            newtab.reduce((a, v) => a + v.totalht * (this.props.rem / 100), 0);
        const SumNetAPayer =
            newtab &&
            newtab.reduce(
                (a, v) =>
                    a +
                    (v.totalht * ((100 - this.props.rem) / 100) +
                        v.qte * v.puht * ((100 - v.remisea) / 100) * (v.tva / 100)),
                0
            );

        this.setState({
            tab: newtab,

            totalqte: SumQte,
            sumremisearticle: SumRemiseArticle,
            totalhtbrut: SumHtBrut,
            totaltva: SumTva,
            totalhtnet: SumHtNet,
            remiseglobal: SumRemiseGlobale,
            netapayer: SumNetAPayer,
            snackbaropen: true,
            btnEnabled: true
        });

        this.setState({
            codearticle: "",
            qte: "",
            totalht: 0,
            des: "",
            unite: "",
            puht: "",
            remisea: 0,
            tva: 0,
            puttcnet: 0,
            faudec: "N"
        });
    };

    onCellChange = event => {
        this.setState({ codearticle: event.target.value });
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    deleteRow = index => {
        var tab = [...this.state.tab];
        tab.splice(index, 1);
        const SumQte = tab && tab.reduce((a, v) => a + parseInt(v.qte), 0);
        const SumRemiseArticle =
            tab &&
            tab.reduce((a, v) => a + (parseInt(v.qte) * v.puht * v.remisea) / 100, 0);
        const SumHtBrut =
            tab && tab.reduce((a, v) => a + parseInt(v.qte) * v.puht, 0);
        const SumTva =
            tab &&
            tab.reduce(
                (a, v) =>
                    a +
                    parseInt(v.qte) * v.puht * ((100 - v.remisea) / 100) * (v.tva / 100),
                0
            );
        const SumHtNet =
            tab &&
            tab.reduce((a, v) => a + v.totalht * ((100 - this.props.rem) / 100), 0);
        const SumRemiseGlobale =
            tab && tab.reduce((a, v) => a + v.totalht * (this.props.rem / 100), 0);
        const SumNetAPayer =
            tab &&
            tab.reduce(
                (a, v) =>
                    a +
                    (v.totalht * ((100 - this.props.rem) / 100) +
                        parseInt(v.qte) *
                        v.puht *
                        ((100 - v.remisea) / 100) *
                        (v.tva / 100)),
                0
            );

        this.setState({
            tab,
            totalqte: SumQte,
            sumremisearticle: SumRemiseArticle,
            totalhtbrut: SumHtBrut,
            totaltva: SumTva,
            totalhtnet: SumHtNet,
            remiseglobal: SumRemiseGlobale,
            netapayer: SumNetAPayer,
            snackbarfail: true
        });
    };

    qteHandler = event => {
        console.log(typeof (parseInt(event.target.value)));
        console.log(typeof (this.state.totalqte));

        this.setState({
            qte: event.target.value,
            puttcnet: this.state.puht + (this.state.puht * (this.state.tva / 100)),
            totalht: event.target.value * this.state.puht,

        })
    }

    submitHandler = event => {
        event.preventDefault();

        const newtab = this.state.tab.concat({
            codearticle: this.state.codearticle,
            des: this.state.des,
            qte: this.state.qte,
            unite: this.state.unite,
            puht: this.state.puht,
            faudec: this.state.faudec,
            remisea: this.state.remisea,
            tva: this.state.tva,
            puttcnet: this.state.puttcnet,
            totalht: this.state.totalht,
        });
        const SumQte = newtab && newtab.reduce((a, v) => a + parseInt(v.qte), 0);
        const SumRemiseArticle = newtab && newtab.reduce((a, v) => a + (parseInt(v.qte) * v.puht * v.remisea) / 100, 0);
        const SumHtBrut = newtab && newtab.reduce((a, v) => a + (parseInt(v.qte) * v.puht), 0);
        const SumTva = newtab && newtab.reduce((a, v) => a + ((parseInt(v.qte) * v.puht * ((100 - v.remisea) / 100) * (v.tva / 100))), 0);
        const SumHtNet = newtab && newtab.reduce((a, v) => a + (v.totalht * ((100 - this.props.rem) / 100)), 0);
        const SumRemiseGlobale = newtab && newtab.reduce((a, v) => a + (v.totalht * (this.props.rem / 100)), 0);
        const SumNetAPayer = newtab && newtab.reduce((a, v) => a + ((v.totalht * ((100 - this.props.rem) / 100)) + ((v.qte * v.puht * ((100 - v.remisea) / 100) * (v.tva / 100)))), 0);

        this.setState({
            tab: newtab,

            totalqte: SumQte,
            sumremisearticle: SumRemiseArticle,
            totalhtbrut: SumHtBrut,
            totaltva: SumTva,
            totalhtnet: SumHtNet,
            remiseglobal: SumRemiseGlobale,
            netapayer: SumNetAPayer,
            snackbaropen: true,
            btnEnabled: true,
        });

        this.setState({
            codearticle: '',
            qte: '',
            totalht: 0,
            des: '',
            unite: '',
            puht: '',
            remisea: 0,
            tva: 0,
            puttcnet: 0,
            faudec: "N",
        });
    }

    onCellChange = event => {
        this.setState({ codearticle: event.target.value });
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };


    deleteRow = index => {
        var tab = [...this.state.tab];
        tab.splice(index, 1);
        const SumQte = tab && tab.reduce((a, v) => a + parseInt(v.qte), 0);
        const SumRemiseArticle = tab && tab.reduce((a, v) => a + (parseInt(v.qte) * v.puht * v.remisea) / 100, 0);
        const SumHtBrut = tab && tab.reduce((a, v) => a + (parseInt(v.qte) * v.puht), 0);
        const SumTva = tab && tab.reduce((a, v) => a + ((parseInt(v.qte) * v.puht * ((100 - v.remisea) / 100) * (v.tva / 100))), 0);
        const SumHtNet = tab && tab.reduce((a, v) => a + (v.totalht * ((100 - this.props.rem) / 100)), 0);
        const SumRemiseGlobale = tab && tab.reduce((a, v) => a + (v.totalht * (this.props.rem / 100)), 0);
        const SumNetAPayer = tab && tab.reduce((a, v) => a + ((v.totalht * ((100 - this.props.rem) / 100)) + ((parseInt(v.qte) * v.puht * ((100 - v.remisea) / 100) * (v.tva / 100)))), 0);

        this.setState({
            tab,
            totalqte: SumQte,
            sumremisearticle: SumRemiseArticle,
            totalhtbrut: SumHtBrut,
            totaltva: SumTva,
            totalhtnet: SumHtNet,
            remiseglobal: SumRemiseGlobale,
            netapayer: SumNetAPayer,
            snackbarfail: true,
        });


    };


    render() {

        let editModalClose = () => this.setState({ editModalShow: false });

        console.log(this.state.totalqte, `remise article =${this.state.sumremisearticle}`);

        return (
            <div className="container">


                <Snackbar open={this.state.snackbaropen} autoHideDuration={2000}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    onClose={this.snackbarClose}

                >
                    <Alert style={{ height: "50px" }} onClose={this.snackbarClose}
                        severity="success">
                        Article ajouté
                    </Alert>
                </Snackbar>

                <Snackbar open={this.state.snackbarfail} autoHideDuration={2000}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    onClose={this.snackbarFailClose}

                >
                    <Alert style={{ height: "50px" }} onClose={this.snackbarFailClose}
                        severity="error">
                        Article supprimé
                    </Alert>
                </Snackbar>

                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton style={{ color: "#00087E" }}>
                        <Modal.Title id="contained-modal-title-vcenter">
                            <b>Articles</b>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ backgroundColor: "#fff" }}>

                        <Row  >
                            <Col>
                                <Card>
                                    <Card.Body>


                                        <form onSubmit={this.submitHandler}>
                                            <Row form>
                                                <Col sm={4}>
                                                    <FormGroup>
                                                        <Label>Chercher article par :</Label>
                                                        <Typography component="div">
                                                            <Grid component="label" container alignItems="center" spacing={1}>
                                                                <Grid item>Désignation</Grid>
                                                                <Grid item>
                                                                    <Switch color="primary" checked={this.state.gilad}
                                                                        onChange={this.handleChange('gilad')} value="gilad" />
                                                                </Grid>
                                                                <Grid item style={{ color: "#3f51b5" }}>Code</Grid>
                                                            </Grid>
                                                        </Typography>

                                                    </FormGroup>
                                                </Col>

                                                <Col sm={4}>

                                                    <FormGroup>
                                                        {this.state.gilad ?
                                                            // <Autocomplete
                                                            //     id="include-input-in-list"
                                                            //     includeInputInList
                                                            //     className="ajouter-client-input"

                                                            //     options={this.props.articles.articles}
                                                            //     getOptionLabel={option => option.codart}

                                                            //     onChange={(event, getOptionLabel) => {
                                                            //         getOptionLabel ?
                                                            //             this.setState({
                                                            //                 codearticle: getOptionLabel.codart,
                                                            //                 des: getOptionLabel.desart,
                                                            //                 unite: getOptionLabel.unite,
                                                            //                 puht: getOptionLabel.PUDHT,
                                                            //                 remisea: getOptionLabel.remise,
                                                            //                 tva: getOptionLabel.tautva,
                                                            //                 faudec: getOptionLabel.typfodec,
                                                            //             })
                                                            <Autocomplete
                                                                id="include-input-in-list"
                                                                includeInputInList
                                                                className="ajouter-client-input"

                                                                options={this.props.articles.articles}
                                                                getOptionLabel={option => option.title}

                                                                onChange={(event, getOptionLabel) => {
                                                                    getOptionLabel ?
                                                                        this.setState({
                                                                            codearticle: getOptionLabel.id,
                                                                            des: getOptionLabel.title,
                                                                            unite: getOptionLabel.userId,
                                                                            puht: getOptionLabel.id,
                                                                            remisea: getOptionLabel.userId,
                                                                            tva: getOptionLabel.id,
                                                                            faudec: getOptionLabel.userId,
                                                                        })

                                                                        :
                                                                        this.setState({
                                                                            codearticle: '',
                                                                            totalht: 0,
                                                                            des: '',
                                                                            unite: '',
                                                                            puht: '',
                                                                            remisea: 0,
                                                                            tva: 0,
                                                                            faudec: "N"
                                                                        })
                                                                }}

                                                                renderInput={params => (
                                                                    <TextField
                                                                        {...params}
                                                                        label="Code article"
                                                                        margin="normal"
                                                                        fullWidth
                                                                    />
                                                                )}
                                                            />
                                                            :
                                                            // <Autocomplete
                                                            //     id="include-input-in-list"
                                                            //     includeInputInList
                                                            //     className="ajouter-client-input"

                                                            //     options={this.props.articles.articles}
                                                            //     getOptionLabel={option => option.desart}

                                                            //     onChange={(event, getOptionLabel) => {
                                                            //         getOptionLabel ?
                                                            //             this.setState({
                                                            //                 codearticle: getOptionLabel.codart,
                                                            //                 des: getOptionLabel.desart,
                                                            //                 unite: getOptionLabel.unite,
                                                            //                 puht: getOptionLabel.PUDHT,
                                                            //                 remisea: getOptionLabel.remise,
                                                            //                 tva: getOptionLabel.tautva,
                                                            //                 faudec: getOptionLabel.typfodec,
                                                            //             })
                                                            <Autocomplete
                                                                id="include-input-in-list"
                                                                includeInputInList
                                                                className="ajouter-client-input"

                                                                options={this.props.articles.articles}
                                                                getOptionLabel={option => option.title}

                                                                onChange={(event, getOptionLabel) => {
                                                                    getOptionLabel ?
                                                                        this.setState({
                                                                            codearticle: getOptionLabel.id,
                                                                            des: getOptionLabel.title,
                                                                            unite: getOptionLabel.userId,
                                                                            puht: getOptionLabel.id,
                                                                            remisea: getOptionLabel.userId,
                                                                            tva: getOptionLabel.id,
                                                                            faudec: getOptionLabel.userId,
                                                                        })

                                                                        :
                                                                        this.setState({
                                                                            codearticle: '',
                                                                            totalht: 0,
                                                                            des: '',
                                                                            unite: '',
                                                                            puht: '',
                                                                            remisea: 0,
                                                                            tva: 0,
                                                                            faudec: "N"
                                                                        })
                                                                }}

                                                                renderInput={params => (
                                                                    <TextField
                                                                        {...params}
                                                                        label="Désignation article"
                                                                        margin="normal"
                                                                        fullWidth
                                                                    />
                                                                )}
                                                            />
                                                        }
                                                    </FormGroup>

                                                </Col>
                                                <FormGroup style={{ display: "none" }}>
                                                    <Label> code artcile</Label>
                                                    <Input
                                                        type="text"
                                                        value={this.state.codearticle}
                                                        disabled
                                                    />
                                                </FormGroup>

                                                <Col sm={4}>
                                                    {this.state.gilad ?
                                                        <FormGroup>

                                                            <TextField id="standard-basic" label="Désignation"
                                                                value={this.state.des}
                                                                disabled
                                                                margin="normal"
                                                                fullWidth
                                                            />
                                                        </FormGroup>
                                                        :
                                                        <FormGroup >
                                                            <TextField id="standard-basic" label="Code article"
                                                                value={this.state.codearticle}
                                                                disabled
                                                                margin="normal"
                                                                fullWidth
                                                            />
                                                        </FormGroup>
                                                    }

                                                </Col>


                                            </Row>
                                            <Row form>

                                                <Col sm={3}>
                                                    <FormGroup>

                                                        <TextField id="standard-basic" label="Quantité"
                                                            type="number"
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            style={{ marginTop: "0px" }}
                                                            value={this.state.qte}
                                                            onChange={this.qteHandler}
                                                            margin="normal"
                                                            fullWidth
                                                            required
                                                        />
                                                    </FormGroup>
                                                </Col>

                                                <Col sm={3}>
                                                    <FormGroup>

                                                        <TextField id="standard-basic" label="Unité"
                                                            value={this.state.unite}
                                                            fullWidth
                                                            disabled />
                                                    </FormGroup>
                                                </Col>

                                                <Col sm={3}>
                                                    <FormGroup>

                                                        <TextField id="standard-basic" label="PU HT"
                                                            value={this.state.puht}
                                                            fullWidth
                                                            disabled />
                                                    </FormGroup>
                                                </Col>

                                                <Col sm={3}>
                                                    <FormGroup>

                                                        <TextField id="standard-basic" label="Remise %"
                                                            value={this.state.remisea}
                                                            fullWidth
                                                            disabled />
                                                    </FormGroup>
                                                </Col>


                                            </Row>

                                            <Row form>
                                                <Col sm={3}>
                                                    <FormGroup>

                                                        <TextField id="standard-basic" label="TVA"
                                                            value={this.state.tva}
                                                            fullWidth
                                                            disabled />
                                                    </FormGroup>
                                                </Col>
                                                <Col sm={3}>
                                                    <FormGroup>

                                                        <TextField id="standard-basic" label="Total HT"
                                                            value={this.state.totalht}
                                                            fullWidth
                                                            disabled />
                                                    </FormGroup>
                                                </Col>

                                                <Col sm={3}>
                                                    <FormGroup>

                                                        <TextField id="standard-basic" label="PU TTC Net"
                                                            value={this.state.puttcnet}
                                                            fullWidth
                                                            disabled />
                                                    </FormGroup>
                                                </Col>

                                                <Col sm={3}>
                                                    <FormGroup style={{ marginTop: "10px", marginLeft: "10px" }}>
                                                        <Label> Fodec </Label>
                                                        {
                                                            this.state.faudec === "A" ?

                                                                <Checkbox
                                                                    defaultChecked
                                                                    value="secondary"
                                                                    color="primary"
                                                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                                />

                                                                :
                                                                <Label>
                                                                    <Checkbox disabled
                                                                        value="disabled"
                                                                        inputProps={{ 'aria-label': 'disabled checkbox' }} />
                                                                </Label>
                                                        }

                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            {
                                                this.state.des === '' ?
                                                    <Center>
                                                        <Button disabled
                                                            style={{ width: "250px" }}
                                                            color="primary" type="submit" >Ajouter</Button>
                                                    </Center>
                                                    :
                                                    <Center>
                                                        <Button
                                                            style={{ width: "250px" }}
                                                            color="primary" type="submit" >Ajouter</Button>
                                                    </Center>
                                            }

                                        </form>
                                    </Card.Body>
                                </Card>

                                <Card style={{ marginTop: "10px" }}>
                                    <Card.Body>


                                        <div className="tab28">

                                            <table style={{ marginTop: "10px" }} >

                                                <thead style={{ textAlign: "center", fontSize: "12px" }}>
                                                    <tr>
                                                        <th >Article</th>
                                                        <th >Désignation</th>
                                                        <th >Quantité</th>
                                                        <th >Unité</th>
                                                        <th >PU HT</th>
                                                        <th>Fodec</th>
                                                        <th>Remise</th>
                                                        <th >TVA</th>
                                                        <th >TotalHT</th>
                                                        <th >PUNet</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody style={{ textAlign: "center" }} >
                                                    {this.state.tab.map((t, i) =>

                                                        <tr key={i}
                                                        >
                                                            <td>{t.codearticle}</td>
                                                            <td style={{ fontSize: "12px" }}>{t.des}</td>
                                                            <td>{t.qte}</td>
                                                            <td>{t.unite}</td>
                                                            <td>{t.puht}</td>
                                                            <td>
                                                                {t.faudec === "A" ? (
                                                                    <span>✔</span>
                                                                ) : (
                                                                        <span>Ø</span>
                                                                    )}
                                                            </td>
                                                            <td>{t.remisea}</td>
                                                            <td >{t.tva}</td>
                                                            <td>{t.totalht}</td>
                                                            <td>{t.puttcnet}</td>



                                                            <td>

                                                                <Tooltip title="Supprimer cet article">
                                                                    <Fab size="small">
                                                                        <DeleteIcon
                                                                            style={{}}
                                                                            onClick={() => this.deleteRow(i)} />
                                                                    </Fab>

                                                                </Tooltip>

                                                            </td>
                                                        </tr>

                                                    )}
                                                </tbody>
                                            </table>



                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>

                        {
                            !this.state.btnEnabled ?

                                <Button disabled variant="contained"

                                >Enregistrer</Button>
                                :
                                <Button variant="contained" style={{ backgroundColor: "rgb(0, 8, 126)", color: "white" }}

                                    onClick={() => {
                                        this.props.submitHandler(this.state.tab,
                                            this.state.totalqte,
                                            this.state.sumremisearticle,
                                            this.state.totalhtbrut,
                                            this.state.totaltva,
                                            this.state.totalhtnet,
                                            this.state.remiseglobal,
                                            this.state.netapayer,
                                            this.state.btnEnabled,
                                        )
                                        this.props.onHide()
                                    }}>Enregistrer</Button>
                        }

                    </Modal.Footer>
                </Modal>
            </div >

        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        SelectArticle: () => dispatch(SelectArticle())
    };
}

function mapStateToProps(state) {
    return {
        articles: state.articles
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LigBLArticle);
