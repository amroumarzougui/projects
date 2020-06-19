import Axios from "axios";

export const SelectBL = () => {
  return (dispatch) => {
    Axios.get("http://192.168.1.100:81/api/BLBRs?type=bl").then((response) => {
      return dispatch({ type: "BL_SELECT", payload: response.data });
    });
  };
};
