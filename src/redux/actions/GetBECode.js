import Axios from "axios";

export const SelectBECod = () => {
  return (dispatch) => {
    Axios.get("http://192.168.1.100:81/api/bCDVCLIs?typpe=BE").then(
      (response) => {
        return dispatch({ type: "BE_COD", payload: response.data });
      }
    );
  };
};
