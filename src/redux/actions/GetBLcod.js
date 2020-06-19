import Axios from "axios";

export const SelectBLCod = () => {
  return (dispatch) => {
    Axios.get("http://192.168.1.100:81/api/BCDVCLIs?typpe=bl").then(
      (response) => {
        return dispatch({ type: "BL_COD", payload: response.data });
      }
    );
  };
};
