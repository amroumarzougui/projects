import Axios from "axios";

export const SelectBC = () => {
  return (dispatch) => {
    Axios.get("http://192.168.1.100:81/api/BCDVCLIs?type=BC").then(
      (response) => {
        return dispatch({ type: "BC_SELECT", payload: response.data });
      }
    );
  };
};
