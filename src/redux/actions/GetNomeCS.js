import Axios from "axios";

export const SelectNomenclatureCS = () => {
  return (dispatch) => {
    Axios.get(`http://192.168.1.100:81/api/NOME?cat=CS`).then((response) => {
      return dispatch({
        type: "NOMENCLATURECS_SELECT",
        payload: response.data,
      });
    });
  };
};
