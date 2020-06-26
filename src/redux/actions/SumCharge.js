import Axios from "axios";

export const SelectSumCharge = () => {
  return (dispatch) => {
    Axios.get("http://192.168.1.100:81/api/ChargeSum").then((response) => {
      return dispatch({ type: "SUMCHARGE_SELECT", payload: response.data });
    });
  };
};
