import Axios from "axios";

export const SelectBE = () => {
  return (dispatch) => {
    Axios.get("http://192.168.1.100:81/api/BEREs?type=BE").then((response) => {
      return dispatch({ type: "BE_SELECT", payload: response.data });
    });
  };
};
