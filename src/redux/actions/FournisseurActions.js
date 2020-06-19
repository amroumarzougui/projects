import { fournisseursHeader } from "../../constants/dataTables";
import {
  START_LOADING,
  STOP_LOADING,
  GET_FOURNISSEURS_HEADER,
  GET_FOURNISSEURS_LIST,
  REMOVE_FOURNISSEUR,
  POST_FOURNISSEUR
} from "../../constants/actionTypes";
import { getApiFournisseurList } from "../../constants/config";
import Axios from "axios";

export const getFournisseurHeader = () => {
  return dispatch => {
    dispatch({ type: GET_FOURNISSEURS_HEADER, payload: fournisseursHeader });
  };
};
export const getFournisseursList = () => {
  return dispatch => {
    dispatch({ type: START_LOADING });
    Axios.get(getApiFournisseurList).then(res => {
      dispatch({
        type: GET_FOURNISSEURS_LIST,
        payload: res.data,
        etat: "fournisseur"
      });
      dispatch({ type: STOP_LOADING });
    });
  };
};
export const deleteFournisseur = fournisseurId => {
  return dispatch => {
    console.log(fournisseurId);

    Axios.delete(`http://192.168.1.100:81/api/FOURNISSEURs/` + fournisseurId).then(
      res => {
        dispatch({
          type: REMOVE_FOURNISSEUR,
          payload: res.data
        });
      }
    );
  };
};
export const postFournisseur = value => {
  return dispatch => {
    console.log(value);
    Axios.post("http://192.168.1.100:81/api/FOURNISSEURs/" + value.code, value).then(
      res => {
        dispatch({
          type: POST_FOURNISSEUR,
          payload: res.data
        });
      }
    );
  };
};
export const putFournisseur = value => {
  return dispatch => {
    console.log(value);
    Axios.put("http://192.168.1.100:81/api/FOURNISSEURs/" + value.code, value).then(
      res => {
        dispatch({
          type: POST_FOURNISSEUR,
          payload: res.data
        });
      }
    );
  };
};
