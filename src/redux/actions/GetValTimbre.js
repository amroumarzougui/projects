import Axios from "axios";

export const SelectValTimbre = () => {
  return (dispatch) => {
    Axios.get(
      `http://192.168.1.100:81/api/Vendeur?coddos=SOPIA&BDsql=PSSOPIA`
    ).then((response) => {
      return dispatch({
        type: "VALTIMBRE_SELECT",
        payload: response.data,
      });
    });
  };
};
