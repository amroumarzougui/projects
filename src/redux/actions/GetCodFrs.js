import Axios from "axios";

export const GetCodfrs = () => {
  return (dispatch) => {
    Axios.get("http://192.168.1.100:81/api/CodFrs").then((response) => {
      return dispatch({ type: "GET_CODFRS", payload: response.data });
    });
  };
};
