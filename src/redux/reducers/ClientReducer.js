import { REMOVE_CLIENT } from "../../constants/actionTypes";
const intialSatate = {
 
};
export const ClientReducer = (state = intialSatate, action) => {
  switch (action.type) {
    case REMOVE_CLIENT:
      return action.payload;
    default:
      return state;
  }
};
