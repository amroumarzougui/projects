import Axios from "axios";

export const GetDBFolder = () => {
  return (dispatch) => {
    Axios.get("http://192.168.1.100:81/api/Auth").then((response) => {
      return dispatch({ type: "GET_DB", payload: response.data });
    });
  };
};
