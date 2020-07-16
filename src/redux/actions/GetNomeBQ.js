import Axios from "axios";

export const SelectNomenclatureBQ = () => {
  return (dispatch) => {
    Axios.get(`http://192.168.1.100:81/api/NOME?cat=BQ`).then((response) => {
      return dispatch({
        type: "NOMENCLATUREBQ_SELECT",
        payload: response.data,
      });
    });
  };
};
