import Axios from "axios";

export const SelectSumQDV = (num) => {
  return (dispatch) => {
    Axios.get(`http://192.168.1.100:81/api/LigBCDV?typpe=DV&numm=${num}`).then(
      (response) => {
        return dispatch({ type: "SUMQDV_SELECT", payload: response.data });
      }
    );
  };
};
