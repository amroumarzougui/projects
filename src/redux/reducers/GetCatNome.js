const initialState = {
  catnomes: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "CATNOME_SELECT":
      return {
        ...state,
        catnomes: action.payload,
      };
    default:
      return state;
  }
}
