const initialState = {
  ccbs: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "NOMENCLATURECCB_SELECT":
      return {
        ...state,
        ccbs: action.payload,
      };
    default:
      return state;
  }
}
