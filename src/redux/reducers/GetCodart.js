const initialState = {
  codarts: []
};
export default function(state = initialState, action) {
  switch (action.type) {
    case "GET_CODART":
      return {
        ...state,
        codarts: action.payload
      };
    default:
      return state;
  }
}
