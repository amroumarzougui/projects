import Axios from "axios";
import { START_LOADING, STOP_LOADING } from "../../constants/actionTypes";

export const SelectUser = () => {
  console.log("the user selectes is");
  return (dispatch) => {
    dispatch({ type: START_LOADING });
    Axios.get("http://192.168.1.100:81/api/BCDVCLIs?type=DV")
    .then((response) => {
      return dispatch({ type: "USER_SELECTED", payload: response.data });
    });
    dispatch({ type: STOP_LOADING });
  };
};
