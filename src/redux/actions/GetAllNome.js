import Axios from "axios";

export const SelectAllNome = () => {
  return (dispatch) => {
    Axios.get("http://192.168.1.100:81/api/Nome").then((response) => {
      return dispatch({ type: "ALLNOME_SELECT", payload: response.data });
    });
  };
};
