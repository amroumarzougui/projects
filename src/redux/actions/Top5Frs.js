import Axios from "axios";

export const SelectTopFrs = () => {
  return (dispatch) => {
    Axios.get("http://192.168.1.100:81/api/FacFrs").then((response) => {
      return dispatch({ type: "TOPFRS_SELECT", payload: response.data });
    });
  };
};
