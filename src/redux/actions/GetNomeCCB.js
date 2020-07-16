import Axios from "axios";

export const SelectNomenclatureCCB = () => {
  return (dispatch) => {
    Axios.get(`http://192.168.1.100:81/api/NOME?cat=CCB`).then((response) => {
      return dispatch({
        type: "NOMENCLATURECCB_SELECT",
        payload: response.data,
      });
    });
  };
};
