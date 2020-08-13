import Axios from "axios";

export const SelectVendeur = () => {
  return (dispatch) => {
    Axios.get(`http://192.168.1.100:81/api/NOME?cat=VD`).then((response) => {
      return dispatch({
        type: "VD_SELECT",
        payload: response.data,
      });
    });
  };
};
