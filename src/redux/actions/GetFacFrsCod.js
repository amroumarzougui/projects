import Axios from "axios";

export const SelectFacFrsCod = () => {
  return (dispatch) => {
    Axios.get("http://192.168.1.100:81/api/bCDVCLIs?typpe=FF").then(
      (response) => {
        return dispatch({ type: "FF_COD", payload: response.data });
      }
    );
  };
};
