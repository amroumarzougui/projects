import Axios from "axios";

export const GetCodcli = () => {
  return (dispatch) => {
    Axios.get("http://192.168.1.100:81/api/Codcli").then((response) => {
      return dispatch({ type: "GET_CODCLI", payload: response.data });
    });
  };
};
