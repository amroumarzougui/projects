const initialState = {
  sums: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "SUMQDV_SELECT":
      return {
        ...state,
        sums: action.payload,
      };
    default:
      return state;
  }
}
