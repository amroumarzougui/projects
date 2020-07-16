const initialState = {
  ags: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "NOMENCLATUREAG_SELECT":
      return {
        ...state,
        ags: action.payload,
      };
    default:
      return state;
  }
}
