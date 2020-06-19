import Axios from "axios";

export const SelectNomenclature = (cat) => {
  return (dispatch) => {
    Axios.get(`http://192.168.1.100:81/api/NOME?cat=${cat}`).then(
      (response) => {
        return dispatch({
          type: "NOMENCLATURE_SELECT",
          payload: response.data,
        });
      }
    );
  };
};
