import Axios from "axios";
import { articlesHeader } from "../../constants/dataTables";
import {
  GET_ARTICLES_LIST,
  GET_ARTICLES_HEADER,
  START_LOADING,
  STOP_LOADING,
  GET_ELEMENT_DETAILS
} from "../../constants/actionTypes";
import { getApiArticlesList } from "../../constants/config";
export const getArticleHeader = () => {
  return dispatch => {
    dispatch({ type: GET_ARTICLES_HEADER, payload: articlesHeader });
  };
};

export const getArticleList = () => {
  return dispatch => {
    dispatch({ type: START_LOADING });
    Axios.get(getApiArticlesList).then(res => {
      dispatch({ type: GET_ARTICLES_LIST, payload: res.data, etat: "article" });
      dispatch({ type: STOP_LOADING });
    });
  };
};

export const getElementDetails = element => {
  return dispatch => {
    dispatch({ type: GET_ELEMENT_DETAILS, payload: element });
  };
};
