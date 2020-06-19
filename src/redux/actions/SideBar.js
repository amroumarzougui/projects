import { CHANGE_SUBMENU_LIST } from "../constants/actionTypes";

export const changeSubmenuList = index => {
  return dispatch => {
    dispatch({
      type: CHANGE_SUBMENU_LIST,
      payload: index
    });
  };
};
