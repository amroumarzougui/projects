import Axios from "axios";

export const SelectFacCod = () => {
  return (dispatch) => {
    Axios.get("http://192.168.1.100:81/api/bCDVCLIs?typpe=FC").then(
      (response) => {
        return dispatch({ type: "FAC_COD", payload: response.data });
      }
    );
  };
};
