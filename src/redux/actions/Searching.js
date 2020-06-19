import { SEARCHING } from "../../constants/actionTypes";

export const searching = event => {
  return dispatch => {
    dispatch({
      type: SEARCHING,
      payload: event
    });
  };
};
