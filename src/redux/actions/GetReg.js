import Axios from "axios";

export const SelectReglement = () => {
  return (dispatch) => {
    Axios.get("http://192.168.1.100:81/api/REGCLIs").then((response) => {
      return dispatch({ type: "REG_SELECT", payload: response.data });
    });
  };
};
