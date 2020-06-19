const initialState = {
  codfrss: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "GET_CODFRS":
      return {
        ...state,
        codfrss: action.payload,
      };
    default:
      return state;
  }
}
