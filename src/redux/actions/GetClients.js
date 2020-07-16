import Axios from "axios";

export const SelectClient = () => {
  //console.log("the client selected is");
  return (dispatch) => {
    // Axios.get('http://192.168.1.100:81/api/CLIENTs')
    Axios.get("http://192.168.1.100:81/api/Clients").then((response) => {
      return dispatch({ type: "CLIENT_SELECT", payload: response.data });
    });
  };
};
