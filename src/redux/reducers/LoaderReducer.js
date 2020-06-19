import { START_LOADING, STOP_LOADING } from "../../constants/actionTypes";
const loaderReducer = (state = false, action) => {
  switch (action.type) {
    case START_LOADING:
      return true;
    case STOP_LOADING:
      return false;
    default:
      return state;
  }
};
export default loaderReducer;
