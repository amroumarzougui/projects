import Axios from "axios";

export const SelectFournisseur = () => {
  return (dispatch) => {
    Axios.get("http://192.168.1.100:81/api/fournisseurs").then((response) => {
      return dispatch({ type: "FOURNISSEUR_SELECT", payload: response.data });
    });
  };
};
