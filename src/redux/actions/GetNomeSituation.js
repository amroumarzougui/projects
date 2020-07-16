import Axios from "axios";

export const SelectNomenclatureSC = () => {
  return (dispatch) => {
    Axios.get(`http://192.168.1.100:81/api/NOME?cat=SC`).then((response) => {
      return dispatch({
        type: "NOMENCLATURESC_SELECT",
        payload: response.data,
      });
    });
  };
};
