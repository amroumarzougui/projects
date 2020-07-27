import Axios from "axios";

export const SelectCatNome = () => {
  return (dispatch) => {
    Axios.get("http://192.168.1.100:81/api/CatNome").then((response) => {
      return dispatch({ type: "CATNOME_SELECT", payload: response.data });
    });
  };
};
