import Axios from "axios";

export const SelectBS = () => {
  return (dispatch) => {
    Axios.get("http://192.168.1.100:81/api/BSRS?type=BS").then((response) => {
      return dispatch({ type: "BS_SELECT", payload: response.data });
    });
  };
};
