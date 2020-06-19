import Axios from "axios";

export const SelectSousFamille = () => {
  return dispatch => {
    Axios.get("http://192.168.1.100:81/api/NOME?cat=SF").then(response => {
      return dispatch({ type: "SOUS_FAMILLE_SELECT", payload: response.data });
    });
  };
};
