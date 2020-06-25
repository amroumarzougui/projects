import Axios from "axios";

export const SelectTopclient = () => {
  return (dispatch) => {
    Axios.get("http://192.168.1.100:81/api/FACCLIs").then((response) => {
      return dispatch({ type: "TOP_SELECT", payload: response.data });
    });
  };
};
