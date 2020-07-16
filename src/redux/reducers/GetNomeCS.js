const initialState = {
  css: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "NOMENCLATURECS_SELECT":
      return {
        ...state,
        css: action.payload,
      };
    default:
      return state;
  }
}
