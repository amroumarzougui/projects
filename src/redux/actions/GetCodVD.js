import Axios from "axios";

export const SelectCodVendeur = () => {
  return (dispatch) => {
    Axios.get(`http://192.168.1.100:81/api/Nome?catttt=VD`).then((response) => {
      return dispatch({
        type: "CODVD_SELECT",
        payload: response.data,
      });
    });
  };
};
