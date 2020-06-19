import Axios from "axios";

export const SelectBCLig = () => {
  return (dispatch) => {
    Axios.get("http://192.168.1.100:81/api/LigBCDV?type=BC").then(
      (response) => {
        return dispatch({ type: "BC_LIG_SELECT", payload: response.data });
      }
    );
  };
};
