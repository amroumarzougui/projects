const initialState = {
  codclis: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "GET_CODCLI":
      return {
        ...state,
        codclis: action.payload,
      };
    default:
      return state;
  }
}
