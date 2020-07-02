const initialState = {
  bes: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "BE_SELECT":
      return {
        ...state,
        bes: action.payload,
      };
    default:
      return state;
  }
}
