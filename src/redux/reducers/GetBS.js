const initialState = {
  bsss: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "BS_SELECT":
      return {
        ...state,
        bsss: action.payload,
      };
    default:
      return state;
  }
}
