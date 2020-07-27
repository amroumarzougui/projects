import Axios from "axios";

export const SelectNome = () => {
  return (dispatch) => {
    Axios.get("http://192.168.1.100:81/api/Nome?cat=FA").then((response) => {
      return dispatch({ type: "NOME_SELECT", payload: response.data });
    });
  };
};
