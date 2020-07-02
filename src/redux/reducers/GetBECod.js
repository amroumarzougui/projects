const initialState = {
  codbes: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "BE_COD":
      return {
        ...state,
        codbes: action.payload,
      };
    default:
      return state;
  }
}
