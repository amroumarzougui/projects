import Axios from "axios";

export const GetNumFacBC = (num) => {
  return (dispatch) => {
    Axios.get("http://192.168.1.100:81/api/BCDVCLIs?typpe=BC").then(
      (response) => {
        return dispatch({ type: "NUMFAC_BC", payload: response.data });
      }
    );
  };
};
