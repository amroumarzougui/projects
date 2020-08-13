const initialState = {
  codvds: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "CODVD_SELECT":
      return {
        ...state,
        codvds: action.payload,
      };
    default:
      return state;
  }
}
