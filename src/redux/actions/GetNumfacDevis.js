import Axios from "axios";

export const GetNumFacDevis = (num) => {
  return (dispatch) => {
    Axios.get("http://192.168.1.100:81/api/BCDVCLIs?typpe=DV").then(
      (response) => {
        return dispatch({ type: "NUMFAC_DEVIS", payload: response.data });
      }
    );
  };
};
