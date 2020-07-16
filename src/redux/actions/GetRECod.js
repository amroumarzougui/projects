import Axios from "axios";

export const GetRECod = () => {
  return (dispatch) => {
    Axios.get("http://192.168.1.100:81/api/BCDVCLIs?REG=REGC").then(
      (response) => {
        return dispatch({ type: "RECCCCCOD", payload: response.data });
      }
    );
  };
};
