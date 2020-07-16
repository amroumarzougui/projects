const initialState = {
  bqs: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "NOMENCLATUREBQ_SELECT":
      return {
        ...state,
        bqs: action.payload,
      };
    default:
      return state;
  }
}
