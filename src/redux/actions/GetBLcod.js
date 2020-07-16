import Axios from "axios";

export const SelectBLCod = () => {
  return (dispatch) => {
    Axios.get("http://192.168.1.100:81/api/bCDVCLIs?typpe=BL").then(
      (response) => {
        return dispatch({ type: "BL_COD", payload: response.data });
      }
    );
  };
};
