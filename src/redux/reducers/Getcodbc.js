const initialState = {
  numfacbcs: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "NUMFAC_BC":
      return {
        ...state,
        numfacbcs: action.payload,
      };
    default:
      return state;
  }
}
