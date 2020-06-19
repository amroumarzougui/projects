import Axios from "axios";

export const SelectFacture = () => {
  return (dispatch) => {
    Axios.get("http://192.168.1.100:81/api/FACCLIs?type=FT").then(
      (response) => {
        return dispatch({ type: "FACTURE_SELECT", payload: response.data });
      }
    );
  };
};
