const initialState = {
  tops: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "TOP_SELECT":
      return {
        ...state,
        tops: action.payload,
      };
    default:
      return state;
  }
}
