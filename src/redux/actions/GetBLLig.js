import Axios from "axios";

export const SelectBLLig = (num) => {
  return (dispatch) => {
    Axios.get(
      `http://192.168.1.100:81/Api/LigBLBRs?type=BL&numfac=${num}`
    ).then((response) => {
      return dispatch({ type: "BL_LIG_SELECT", payload: response.data });
    });
  };
};
