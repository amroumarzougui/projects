import { clientsHeader } from "../../constants/dataTables";
import {
  GET_CLIENTS_HEADER,
  START_LOADING,
  STOP_LOADING,
  GET_CLIENTS_LIST,
  GET_CLIENT_DETAILS,
  REMOVE_CLIENT,
  POST_CLIENT
} from "../../constants/actionTypes";
import { getApiClientList } from "../../constants/config";
import Axios from "axios";

export const getClientHeader = () => {
  return dispatch => {
    dispatch({ type: GET_CLIENTS_HEADER, payload: clientsHeader });
  };
};
export const getClientList = () => {
  return dispatch => {
    dispatch({ type: START_LOADING });
    Axios.get(getApiClientList).then(res => {
      dispatch({ type: GET_CLIENTS_LIST, payload: res.data, etat: "client" });
      dispatch({ type: STOP_LOADING });
    });
  };
};
export const getClientDetails = element => {
  return dispatch => {
    dispatch({ type: GET_CLIENT_DETAILS, payload: element });
  };
};
export const deleteClient = clientId => {
  return dispatch => {
    console.log(clientId);
    Axios.delete(`http://192.168.1.100:81/api/CLIENTs/` + clientId).then(
      res => {
        dispatch({
          type: REMOVE_CLIENT,
          payload: res.data
        });
      }
    );
  };
};
export const postClient = value => {
  return dispatch => {
    console.log(value);
    Axios.post("http://192.168.1.100:81/api/CLIENTs/" + value.code, value).then(
      res => {
        dispatch({
          type: POST_CLIENT,
          payload: res.data
        });
      }
    );
  };
};
export const putClient = value => {
  return dispatch => {
    console.log(value);
    Axios.put("http://192.168.1.100:81/api/CLIENTs/" + value.code, value).then(
      res => {
        dispatch({
          type: POST_CLIENT,
          payload: res.data
        });
      }
    );
  };
};
