const initialState = {
  codres: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "RECCCCCOD":
      return {
        ...state,
        codres: action.payload,
      };
    default:
      return state;
  }
}
