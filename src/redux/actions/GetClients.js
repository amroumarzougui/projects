import Axios from "axios";
import { START_LOADING, STOP_LOADING } from "../../constants/actionTypes";

export const SelectClient = () => {
  //console.log("the client selected is");
  return (dispatch) => {
    dispatch({ type: START_LOADING });
    // Axios.get('http://192.168.1.100:81/api/CLIENTs')
    Axios.get("http://192.168.1.100:81/api/Clients").then((response) => {
      return dispatch({ type: "CLIENT_SELECT", payload: response.data });
    });
    dispatch({ type: STOP_LOADING });
  };
};
