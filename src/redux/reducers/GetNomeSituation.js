const initialState = {
  scs: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "NOMENCLATURESC_SELECT":
      return {
        ...state,
        scs: action.payload,
      };
    default:
      return state;
  }
}
