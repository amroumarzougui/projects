import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import SideBarReducer from "./reducers/SideBarReducer";
import thunkMiddlewar from "redux-thunk";
import { DataTablesReducer } from "./reducers/DataTablesReducer";
import loaderReducer from "./reducers/LoaderReducer";
import SearchingReducer from "./reducers/SearchingReducer";
import DevisClientReducer from "./reducers/DevisClient";
import { reducer as reduxFormReducer } from "redux-form";
import GetClientsReducer from "./reducers/GetClients";
import GetArticlesReducer from "./reducers/GetArticles";
import GetNumFacDevisReducer from "./reducers/GetNumfacDevis";
import GetDevisLigReducer from "./reducers/GetDevisLig";
import GetTestReducer from "./reducers/TestReducer";
import GetBCReducer from "./reducers/GetBC";
import GetBCLigModal from "./reducers/GetBCLig";
import GetBLReducer from "./reducers/GetBL";
import GetBLLigReducer from "./reducers/GetBLLig";
import GetFactureReducer from "./reducers/GetFacture";
import GetFactureLigReducer from "./reducers/GetFactureLig";

// import GetNumFacDevisReducer from "./reducers/GetNumfacDevis";
// import GetDevisLigReducer from "./reducers/GetDevisLig";
import GetNomeReducer from "./reducers/GetNome";
import GetSousFamilleReducer from "./reducers/GetSousFamille";
import GetCodartReducer from "./reducers/GetCodart";
import GetCodCliReducer from "./reducers/GetCodcli";
import GetFournisseurReducer from "./reducers/GetFournisseur";
import GetCodFrsReducer from "./reducers/GetCodFrs";
import GetSumQLigDVReducer from "./reducers/GetSumQLigDV";
import GetDBReducer from "./reducers/GetDBFolders";
import GetCodBlReducer from "./reducers/GetBLcod.";
import GetNomenclatureReducer from "./reducers/GetNomenclature";
import GetCodBCReducer from "./reducers/Getcodbc";
import GettopclientReducer from "./reducers/Top5";
import GetTopFrsReducer from "./reducers/Top5Frs";
import GetSumChargeReducer from "./reducers/SumCharge";
import GetBEReducer from "./reducers/GetBE";
import GetBECodReducer from "./reducers/GetBECod";

const middleware = [thunkMiddlewar];
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
const enhancer = composeEnhancers(applyMiddleware(...middleware));
const myStore = createStore(
  combineReducers({
    SideBarTitles: SideBarReducer,
    DataTablesReducer,
    loaderReducer,
    SearchingReducer,
    devis: DevisClientReducer,
    form: reduxFormReducer,
    clients: GetClientsReducer,
    articles: GetArticlesReducer,
    numfac: GetNumFacDevisReducer,
    ligs: GetDevisLigReducer,
    tests: GetTestReducer,
    bcs: GetBCReducer,
    bcligs: GetBCLigModal,
    bls: GetBLReducer,
    blligs: GetBLLigReducer,
    factures: GetFactureReducer,
    fligs: GetFactureLigReducer,
    nomes: GetNomeReducer,
    sousfamilles: GetSousFamilleReducer,
    codarts: GetCodartReducer,
    codclis: GetCodCliReducer,
    fournisseurs: GetFournisseurReducer,
    codfrss: GetCodFrsReducer,
    sums: GetSumQLigDVReducer,
    dbs: GetDBReducer,
    codbls: GetCodBlReducer,
    nomenclatures: GetNomenclatureReducer,
    numfacbcs: GetCodBCReducer,
    tops: GettopclientReducer,
    topfrss: GetTopFrsReducer,
    charges: GetSumChargeReducer,
    bes: GetBEReducer,
    codbes: GetBECodReducer,
  }),
  enhancer
);
export default myStore;
