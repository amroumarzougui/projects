const initialState = {
  bscods: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "BS_COD":
      return {
        ...state,
        bscods: action.payload,
      };
    default:
      return state;
  }
}
