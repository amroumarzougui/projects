const initialState = {
  allnomes: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "ALLNOME_SELECT":
      return {
        ...state,
        allnomes: action.payload,
      };
    default:
      return state;
  }
}
