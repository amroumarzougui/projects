const initialState = {
  codbls: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "BL_COD":
      return {
        ...state,
        codbls: action.payload,
      };
    default:
      return state;
  }
}
