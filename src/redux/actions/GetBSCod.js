import Axios from "axios";

export const SelectBSCod = () => {
  return (dispatch) => {
    Axios.get("http://192.168.1.100:81/api/bCDVCLIs?typpe=BS").then(
      (response) => {
        return dispatch({ type: "BS_COD", payload: response.data });
      }
    );
  };
};
