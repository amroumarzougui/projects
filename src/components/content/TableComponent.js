import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import { connect } from "react-redux";
import {
  getArticleList,
  getElementDetails
} from "../../redux/actions/ArticleActions";
import ArticleModal from "../gestion-des-articles/ArticleModal";
import ClientModal from "../clients-fournisseurs/AffichageModal";
import "./CommonComponents.scss";
import ComposedLoader from "./Loader";
const TableComponent = props => {
  useEffect(() => {
    props.remplirDataTable();
  }, []);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  return (
    <div className="articles-table">
      <Table striped>
        <thead>
          <tr>
            {props.DataTables.tableHeader.map((el, index) => (
              <th key={index} className={el.className}>
                <center>{el.title}</center>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.DataTables.dataTable
            .filter(
              el =>
                el.name
                  .toLowerCase()
                  .includes(props.SearchingResult.searching) ||
                el.code.toString().includes(props.SearchingResult.searching)
            )
            .map((el, index) => (
              <tr
                key={index}
                onClick={() => {
                  toggle();
                  props.getElementDetails(el);
                }}
              >
                <td className="value">
                  <span>{el.code}</span>
                </td>
                <td style={{ width: "20%" }}>
                  <center>
                    <span>{el.name}</span>
                  </center>
                </td>

                <td className="big-part" style={{ width: "35%" }}>
                  <center>
                    <span>{el.adresse}</span>
                  </center>
                </td>

                <td className="value">
                  <span>{el.soldeFacture}</span>
                </td>
                <td className="value">
                  <span>{el.soldeGlobal}</span>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {props.DataTables.etat === "article" ? (
        <ArticleModal modal={modal} toggle={toggle} />
      ) : (
        <ClientModal
          modal={modal}
          toggle={toggle}
          etat={props.DataTables.etat}
        />
      )}
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  getArticleList: () => {
    dispatch(getArticleList());
  },
  getElementDetails: element => {
    dispatch(getElementDetails(element));
  },
  remplirDataTable: () => {
    dispatch({ type: "REMPLIR_DATA_TABLE" });
  }
});
const mapStateToProps = state => {
  return {
    SideBarTitles: state.SideBarTitles,
    DataTables: state.DataTablesReducer,
    SearchingResult: state.SearchingReducer
  };
};
const ConnectedTableComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(TableComponent);

export default ComposedLoader(ConnectedTableComponent);
