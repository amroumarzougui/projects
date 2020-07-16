import Axios from "axios";

export const SelectUser = () => {
  return (dispatch) => {
    Axios.get("http://192.168.1.100:81/api/BCDVCLIs?type=DV").then(
      (response) => {
        return dispatch({ type: "USER_SELECTED", payload: response.data });
      }
    );
  };
};
