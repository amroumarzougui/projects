const initialState = {
  codgacfrss: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "FF_COD":
      return {
        ...state,
        codfacfrss: action.payload,
      };
    default:
      return state;
  }
}
