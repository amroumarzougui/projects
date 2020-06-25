const initialState = {
  topfrss: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "TOPFRS_SELECT":
      return {
        ...state,
        topfrss: action.payload,
      };
    default:
      return state;
  }
}
