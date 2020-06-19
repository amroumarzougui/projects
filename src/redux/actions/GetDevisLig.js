import Axios from "axios";

export const SelectDevisLig = () => {
  return (dispatch) => {
    Axios.get("http://192.168.1.100:81/api/LigBCDV?type=DV").then(
      (response) => {
        return dispatch({ type: "DEVIS_LIG_SELECT", payload: response.data });
      }
    );
  };
};
