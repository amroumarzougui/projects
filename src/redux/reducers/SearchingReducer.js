import { SEARCHING } from "../../constants/actionTypes";

const intialState = {
  searching: ""
};
const SearchingReducer = (state = intialState, action) => {
  switch (action.type) {
    case SEARCHING:
      return {
        searching: action.payload
      };
    default:
      return state;
  }
};
export default SearchingReducer;
