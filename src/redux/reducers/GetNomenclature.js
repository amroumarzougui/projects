const initialState = {
  nomenclatures: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "NOMENCLATURE_SELECT":
      return {
        ...state,
        nomenclatures: action.payload,
      };
    default:
      return state;
  }
}
