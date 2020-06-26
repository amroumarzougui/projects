const initialState = {
  charges: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "SUMCHARGE_SELECT":
      return {
        ...state,
        charges: action.payload,
      };
    default:
      return state;
  }
}
