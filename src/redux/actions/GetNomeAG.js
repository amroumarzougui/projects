import Axios from "axios";

export const SelectNomenclatureAG = () => {
  return (dispatch) => {
    Axios.get(`http://192.168.1.100:81/api/NOME?cat=AG`).then((response) => {
      return dispatch({
        type: "NOMENCLATUREAG_SELECT",
        payload: response.data,
      });
    });
  };
};
