const initialState = {
  codfacs: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "FAC_COD":
      return {
        ...state,
        codfacs: action.payload,
      };
    default:
      return state;
  }
}
